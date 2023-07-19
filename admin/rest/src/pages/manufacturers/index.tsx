import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import ManufacturerList from "@components/manufacturer/manufacturer-list";
import LinkButton from "@components/ui/link-button";
import { useState } from "react";

import { LIMIT } from "@utils/constants";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { adminOnly } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";

import { GetStaticProps } from "next";
import { useManufacturersQuery } from "@data/manufacturer/use-manufacturers.query";
import { SortOrder } from "@ts-types/generated";

export default function Manufacturers() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    data,
    isLoading: loading,
    error,
  } = useManufacturersQuery({
    limit: LIMIT,
    text: searchTerm,
    page,
    orderBy,
    sortedBy,
  });
  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  function handlePagination(current: number) {
    setPage(current);
  }
  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/3 mb-4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t("common:text-manufacturers-publications")}
          </h1>
        </div>

        <div className="w-full xl:w-2/3 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <Search onSearch={handleSearch} />

          <LinkButton
            href={`${ROUTES.MANUFACTURERS}/create`}
            className="h-12 md:ms-6 w-full md:w-auto"
          >
            <span>+ {t("form:button-label-add-manufacturer-publication")}</span>
          </LinkButton>
        </div>
      </Card>

      <ManufacturerList
        manufacturers={data?.manufacturers}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}
Manufacturers.authenticate = {
  permissions: adminOnly,
};
Manufacturers.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["form", "common", "table"])),
  },
});
