import User from "@repositories/user";
import { useQuery } from "react-query";
import { User as TUser } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchCustomer = async (id: string) => {
  const { data } = await User.find(`${API_ENDPOINTS.CUSTOMERS}/${id}`);
  return data;
};

export const useCustomerQuery = (id: string) => {
  return useQuery<TUser, Error>(
    [API_ENDPOINTS.CUSTOMERS, id],
    () => fetchCustomer(id),
    { enabled: Boolean(id) }
  );
};
