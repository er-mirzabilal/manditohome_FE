import { QueryKey } from "react-query";
import { SortOrder } from "./generated";

export type AuthorsQueryOptionsType = {
  text?: string;
  is_approved?: boolean;
  page?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type ManufacturersQueryOptionsType = {
  text?: string;
  is_approved?: boolean;
  type?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type CategoriesQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type TagsQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type ShopsQueryOptionsType = {
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type WithdrawsQueryOptionsType = {
  text?: string;
  shop_id?: number;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type ProductsQueryOptionsType = {
  page?: number;
  shop_id?: number;
  text?: string;
  type?: string;
  category?: string;
  status?: string;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type TypesQueryOptionsType = {
  page?: number;
  text?: string;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type StaffsQueryOptionsType = {
  page?: number;
  shop_id?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type QueryOptionsType = {
  page?: number;
  text?: string;
  shop_id?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
  fromDate?: Date;
  toDate?: Date;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};

export type QuestionsQueryOptionsType = {
  limit?: number;
  page?: number;
  orderBy?: string;
  text?: string;
  type?: string;
  sortedBy?: string;
  shop_id?: number;
  product_id?: number;
  answer?: string;
};

export type ReviewsQueryOptionsType = {
  limit?: number;
  page?: number;
  orderBy?: string;
  sortedBy?: string;
  text?: string;
  type?: string;
  shop_id?: number;
  product_id?: number;
};
