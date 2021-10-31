import { useState, useCallback } from "react";
import { Page, Card, Layout, DataTable, Link } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

const FAQList = (props) => {
  const [sortedRows, setSortedRows] = useState(null);

  const initiallySortedRows = [
    [
      <Link removeUnderline url="/faq/1" key="emerald-silk-gown">
        About Page FAQ
      </Link>,
      "Dynamic",
      "12-04-2021",
      "12-04-2021",
    ],
  ];

  const rows = sortedRows ? sortedRows : initiallySortedRows;
  const handleSort = useCallback(
    (index, direction) => setSortedRows(sortCurrency(rows, index, direction)),
    [rows]
  );

  return (
    <Page
      fullWidth
      title="All FAQs"
      primaryAction={{ content: "Create" }}
      // secondaryActions={[{ content: "Export" }]}
      pagination={{
        hasNext: true,
      }}
    >
      <TitleBar title="Homepage" />
      {/* <Heading>Shopify app with Node and React 🎉</Heading> */}
      <Layout>
        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={["text", "text", "text", "text"]}
              headings={["Title", "Type", "Created", "Updated"]}
              rows={rows}
              sortable={[false, true, false, false, true]}
              defaultSortDirection="descending"
              initialSortColumnIndex={4}
              onSort={handleSort}
              footerContent={`Showing ${rows.length} of ${rows.length} results`}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default FAQList;
