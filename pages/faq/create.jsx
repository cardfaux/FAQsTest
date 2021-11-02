import { useState, useCallback } from "react";
import {
  Page,
  Card,
  Layout,
  Form,
  TextField,
  FormLayout,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

const FAQCreate = (props) => {
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback((_event) => {
    setEmail("");
    setNewsletter(false);
  }, []);

  const handleNewsLetterChange = useCallback(
    (value) => setNewsletter(value),
    []
  );

  const handleEmailChange = useCallback((value) => setEmail(value), []);

  const [value, setValue] = useState("");

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <Page
      breadcrumbs={[{ content: "Back", url: "/" }]}
      title="Create FAQ"
      primaryAction={{ content: "Next", disabled: true }}
    >
      <TitleBar title="Create FAQ" />
      {/* <Heading>Shopify app with Node and React 🎉</Heading> */}
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={email}
                  onChange={handleEmailChange}
                  label="Title"
                  type="email"
                  autoComplete="email"
                  helpText={<span>Put your question here</span>}
                />

                <TextField
                  label="Description"
                  value={value}
                  onChange={handleChange}
                  multiline={4}
                  autoComplete="off"
                />

                <Button submit>Submit</Button>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default FAQCreate;
