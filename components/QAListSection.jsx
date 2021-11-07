import { useState, useCallback } from "react";
import Link from "next/link";
import { Card, CalloutCard, DataTable, Button } from "@shopify/polaris";

const QAListSection = (props) => {
  const [QAListLoaded, setQAListLoaded] = useState(true);

  return <>{QAListLoaded ? <QAList /> : <EmptyList />}</>;
};

const EmptyList = () => {
  return (
    <CalloutCard
      title="Customize the style of your checkout"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{
        content: "Customize checkout",
        url: "https://www.shopify.com",
      }}
    >
      <p>Upload your store’s logo, change colors and fonts, and more.</p>
    </CalloutCard>
  );
};

const QAList = () => {
  const [sortedRows, setSortedRows] = useState(null);

  const initiallySortedRows = [
    [
      <Link href="/qa/edit/1">
        <a>How long does it take to learn JavaScript?</a>
      </Link>,
      100,
      "12-04-2021",
      "12-04-2021",
    ],
    [
      <Link href="/qa/edit/2">
        <a>How long does it take to learn JavaScript?</a>
      </Link>,
      100,
      "12-04-2021",
      "12-04-2021",
    ],
    [
      <Link href="/qa/edit/3">
        <a>How long does it take to learn JavaScript?</a>
      </Link>,
      100,
      "12-04-2021",
      "12-04-2021",
    ],
    [
      <Link href="/qa/edit/4">
        <a>How long does it take to learn JavaScript?</a>
      </Link>,
      100,
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
    <Card title="Questions and Answers">
      <DataTable
        columnContentTypes={["text", "text", "text", "text"]}
        headings={["Question", "Clicks", "Created", "Updated"]}
        rows={rows}
        sortable={[false, true, false, false, true]}
        defaultSortDirection="descending"
        initialSortColumnIndex={4}
        onSort={handleSort}
        footerContent={<Button primary>Add Another QA</Button>}
      />
    </Card>
  );
};

export default QAListSection;
