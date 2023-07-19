import { useModalAction } from "@components/ui/modal/modal.context";
import { customerAtom } from "@contexts/checkout";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import AsyncSelect from "react-select/async";
import { selectStyles } from "@components/ui/select/select.styles";
import { fetchUsers } from "@data/user/use-users.query";
import { QueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { json } from "stream/consumers";
import { fetchCustomers } from "@data/user/use-customers.query";
import {
  adminOnly,
  getAuthCredentials,
  hasAccess,
  ownerOnly,
  staffOnly,
} from "@utils/auth-utils";
const AddOrUpdateCheckoutCustomer = () => {
  const { permissions } = getAuthCredentials();

  const { closeModal } = useModalAction();
  const { t } = useTranslation("common");
  const [selectedCustomer, setCustomer] = useAtom(customerAtom);
  function onCustomerUpdate(customer: any) {
    setCustomer(customer);
    closeModal();
  }

  async function fetchAsyncOptions(inputValue: string) {
    const queryClient = new QueryClient();
    let data;
    if (hasAccess(adminOnly, permissions)) {
      data = await queryClient.fetchQuery(
        [API_ENDPOINTS.USERS, { text: inputValue, page: 1 }],
        fetchUsers
      );
    } else if (
      hasAccess(ownerOnly, permissions) ||
      hasAccess(staffOnly, permissions)
    ) {
      data = await queryClient.fetchQuery(
        [API_ENDPOINTS.CUSTOMERS, { text: inputValue, page: 1 }],
        fetchCustomers
      );
    }

    return data?.users?.data?.map((user: any) => ({
      value: user.id,
      label: user.name,
    }));
  }
  return (
    <div className="flex flex-col justify-center w-screen max-w-sm min-h-screen p-5 sm:p-8 bg-light md:rounded-xl md:min-h-0">
      <h1 className="mb-5 text-sm font-semibold text-center text-heading sm:mb-6">
        {selectedCustomer ? t("text-update") : t("text-select")}{" "}
        {t("text-customer")}
      </h1>
      <div>
        <AsyncSelect
          styles={selectStyles}
          cacheOptions
          loadOptions={fetchAsyncOptions}
          defaultOptions
          onChange={onCustomerUpdate}
        />
      </div>
    </div>
  );
};

export default AddOrUpdateCheckoutCustomer;
