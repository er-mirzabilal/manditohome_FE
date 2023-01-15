import { Table } from "@components/ui/table";
import { useTranslation } from "next-i18next";

const OrderedProductsCount = ({ data }: any) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t("table:table-item-product-name"),
      dataIndex: "product_name",
      key: "product_name",
      align: "center",
      width: 150,
    },
    {
      title: t("table:table-item-quantity"),
      dataIndex: "product_quantity",
      key: "product_quantity",
      align: "center",
      width: 50,
    },
  ];

  return (
    <div className="rounded overflow-hidden shadow mb-6">
      <Table
        //@ts-ignore
        columns={columns}
        emptyText={t("table:empty-table-data")}
        data={data}
        rowKey="id"
        scroll={{ x: 1000 }}
        //   expandable={{
        //     expandedRowRender: () => "",
        //     rowExpandable: rowExpandable,
        //   }}
      />
    </div>
  );
};

export default OrderedProductsCount;
