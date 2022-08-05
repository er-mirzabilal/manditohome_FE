import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { Table, AlignType } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";

import TitleWithSort from "@components/ui/title-with-sort";
import {
  Attachment,
  AuthorPaginator,
  QueryAuthorsOrderByColumn,
  SortOrder,
} from "__generated__/__types__";
import { useUpdateAuthorMutation } from "@graphql/authors.graphql";
import { Switch } from "@headlessui/react";

type IProps = {
  authors: AuthorPaginator | null | undefined;
  onPagination: (current: number) => void;
  refetch: Function;
  is_admin: boolean;
};

const AuthorList = ({ authors, onPagination, refetch }: IProps) => {
  const { data, paginatorInfo } = authors!;
  const { t } = useTranslation();
  const router = useRouter();

  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [column, setColumn] = useState<string>();

  const debouncedHeaderClick = useMemo(
    () =>
      debounce((value) => {
        setColumn(value);
        setOrder(order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
        refetch({
          orderBy: [
            {
              column: value,
              order: order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
            },
          ],
        });
      }, 500),
    [order]
  );

  const onHeaderClick = (value: string | undefined) => ({
    onClick: () => {
      debouncedHeaderClick(value);
    },
  });

  let columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "center" as AlignType,
      width: 64,
    },
    {
      title: t("table:table-item-image"),
      dataIndex: "image",
      key: "image",
      width: 74,
      render: (image: Attachment) => (
        <Image
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt="coupon banner"
          layout="fixed"
          width={42}
          height={42}
          className="rounded overflow-hidden"
        />
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t("table:table-item-title")}
          ascending={
            order === SortOrder.Asc && column === QueryAuthorsOrderByColumn.Name
          }
          isActive={column === QueryAuthorsOrderByColumn.Name}
        />
      ),
      dataIndex: "name",
      key: "name",
      align: "center" as AlignType,
      onHeaderCell: () => onHeaderClick(QueryAuthorsOrderByColumn.Name),
    },
    {
      title: t("table:table-item-products"),
      dataIndex: "products_count",
      key: "products_count",
      align: "center" as AlignType,
    },
    {
      title: t("table:table-item-approval-action"),
      dataIndex: "is_approved",
      key: "approve",
      align: "center" as AlignType,
      render: (is_approved: boolean, record: any) => {
        const [updateAuthor, { loading: updating }] = useUpdateAuthorMutation();
        function handleOnClick() {
          updateAuthor({
            variables: {
              input: {
                id: record?.id,
                name: record?.name,
                is_approved: !is_approved,
              },
            },
          });
        }
        return (
          <>
            <Switch
              checked={is_approved}
              onChange={handleOnClick}
              className={`${
                is_approved ? "bg-accent" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none`}
              dir="ltr"
            >
              <span className="sr-only">Enable</span>
              <span
                className={`${
                  is_approved ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transition-transform transform bg-light rounded-full`}
              />
            </Switch>
          </>
        );
      },
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center" as AlignType,
      render: (id: string, record: any) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.AUTHORS}/${record.slug}/edit`}
          deleteModalView="DELETE_AUTHOR"
        />
      ),
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter(
      (col) => col?.key !== "approve" && col?.key !== "actions"
    );
  }

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default AuthorList;
