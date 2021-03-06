import { useState, useCallback } from "react";
import {
  Page,
  Card,
  Layout,
  Form,
  TextField,
  FormLayout,
  Button,
  Select,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import QAListSection from "../../../components/QAListSection";

const FAQEdit = (props) => {
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

  const [selected, setSelected] = useState("draft");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "Active", value: "active" },
    { label: "Draft", value: "draft" },
  ];

  return (
    <Page
      breadcrumbs={[{ content: "Back", url: "/" }]}
      title="Edit FAQ"
      primaryAction={{ content: "Next", disabled: false }}
    >
      <TitleBar title="Edit FAQ" />
      {/* <Heading>Shopify app with Node and React 🎉</Heading> */}
      <Layout>
        <Layout.Section></Layout.Section>
      </Layout>

      <Layout>
        <Layout.Section>
          <Card title="FAQ INFO" sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={email}
                  onChange={handleEmailChange}
                  label="Title"
                  type="email"
                  autoComplete="email"
                  helpText={<span>Put your FAQ Title Here</span>}
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
          <QAListSection />
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Status" sectioned>
            <Select
              options={options}
              onChange={handleSelectChange}
              value={selected}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default FAQEdit;
