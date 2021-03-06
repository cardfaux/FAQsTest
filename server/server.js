import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import bodyParser from "koa-bodyparser";
// const bodyParser = require("koa-bodyparser");
import slugify from "slugify";

const { user, faq } = new PrismaClient();

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
// const ACTIVE_SHOPIFY_SHOPS = {};

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.use(bodyParser());
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        // ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        const newUser = await user.upsert({
          where: { store: shop },
          update: {
            store: shop,
            scope: scope,
            updated_at: new Date().toISOString(),
          },
          create: {
            store: shop,
            scope: scope,
            created_at: new Date().toISOString(),
          },
        });

        // const response = await Shopify.Webhooks.Registry.register({
        //   shop,
        //   accessToken,
        //   path: "/webhooks",
        //   topic: "APP_UNINSTALLED",
        //   webhookHandler: async (topic, shop, body) =>
        //     delete ACTIVE_SHOPIFY_SHOPS[shop],
        // });
        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) =>
            await user.delete({
              where: { shop: shop },
            }),
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  // FAQ ROUTES
  router.post(
    "/faq",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      const { title, description } = ctx.request.body;
      const user_id = await user.findFirst({
        where: { store: ctx.query.shop },
      });

      user_id = user_id.id;

      const newFaq = await faq.create({
        data: {
          title: title,
          slug: slugify(title, "_"),
          description: description,
          user_id: user_id,
          dynamic: false,
          updated_at: new Date().toISOString(),
        },
      });

      console.log(newFaq);

      return (ctx.body = {
        status: "success",
        data: newFaq,
      });
    }
  );
  router.put(
    "/faq/:id",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );
  router.del(
    "/faq/:id",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(.*)", async (ctx) => {
    const shop = ctx.query.shop;

    // console.log('ACTIVE_SHOPIFY_SHOPS');
    // console.log(ACTIVE_SHOPIFY_SHOPS);

    const checkShop = await user.findFirst({
      where: { store: shop },
    });

    // This shop hasn't been seen yet, go through OAuth to create a session
    // if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
    //   ctx.redirect(`/auth?shop=${shop}`);
    // } else {
    //   await handleRequest(ctx);
    // }
    if (checkShop === null) {
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
