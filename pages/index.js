import { Heading, Page, Card, Layout } from "@shopify/polaris";
import { PlusMinor } from "@shopify/polaris-icons";

const Index = () => (
  <Page
    fullWidth
    title="Orders"
    primaryAction={{ content: "Create order", icon: PlusMinor }}
    secondaryActions={[{ content: "Export" }]}
    pagination={{
      hasNext: true,
    }}
  >
    <Heading>Shopify app with Node and React 🎉</Heading>
    <Layout>
      <Layout.Section>
        <Card title="Order details" sectioned>
          <p>View a summary of your order.</p>
        </Card>
      </Layout.Section>
      <Layout.Section secondary>
        <Card title="Tags" sectioned>
          <p>Add tags to your order.</p>
        </Card>
      </Layout.Section>
    </Layout>
  </Page>
);

export default Index;
