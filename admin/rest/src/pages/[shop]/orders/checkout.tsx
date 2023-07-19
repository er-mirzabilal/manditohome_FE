import { useTranslation } from "next-i18next";
import {
  billingAddressAtom,
  customerAtom,
  shippingAddressAtom,
} from "@contexts/checkout";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps } from "next";
import ShopLayout from "@components/layouts/shop";
import { ownerAndStaffOnly } from "@utils/auth-utils";
import CustomerGrid from "@components/checkout/customer/customer-grid";
import { useEffect } from "react";
import { useAtom } from "jotai";
import Loader from "@components/ui/loader/loader";
import { useCustomerQuery } from "@data/user/use-customer-query";
import { AddressType } from "@ts-types/generated";
import { useMeQuery } from "@data/user/use-me.query";

const ScheduleGrid = dynamic(
  () => import("@components/checkout/schedule/schedule-grid")
);
const AddressGrid = dynamic(() => import("@components/checkout/address-grid"));
const ContactGrid = dynamic(
  () => import("@components/checkout/contact/contact-grid")
);
const RightSideView = dynamic(
  () => import("@components/checkout/right-side-view")
);

export default function CheckoutPage() {
  const [customer] = useAtom(customerAtom);
  const { t } = useTranslation();
  const { data } = useMeQuery();
  console.log(data,'me data');
  const {
    data: user,
    isLoading: loading,
    refetch,
  } = useCustomerQuery(customer?.value);
  useEffect(() => {
    if (customer?.value) {
      refetch(customer?.value);
    }
  }, [customer?.value]);

  if (loading) return <Loader text={t("common:text-loading")} />;

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-5xl m-auto lg:flex-row lg:items-start lg:space-s-8">
        <div className="w-full space-y-6 lg:max-w-2xl">
          <CustomerGrid
            className="p-5 shadow-700 bg-light md:p-8"
            //@ts-ignore
            // contact={user?.profile?.contact}
            label={t("text-customer")}
            count={1}
          />
          <ContactGrid
            className="p-5 shadow-700 bg-light md:p-8"
            //@ts-ignore
            contact={user?.profile?.contact}
            label={t("text-contact-number")}
            count={2}
          />

          {/* <AddressGrid
            userId={user?.id!}
            className="p-5 shadow-700 bg-light md:p-8"
            label={t("text-billing-address")}
            count={2}
            //@ts-ignore
            addresses={user?.address?.filter(
              (address) => address?.type === AddressType.Billing
            )}
            atom={billingAddressAtom}
            type={AddressType.Billing}
          /> */}
          <AddressGrid
            userId={user?.id!}
            className="p-5 shadow-700 bg-light md:p-8"
            label={t("text-shipping-address")}
            count={3}
            //@ts-ignore
            addresses={user?.address?.filter(
              (address) => address?.type === AddressType.Shipping
            )}
            atom={shippingAddressAtom}
            type={AddressType.Shipping}
          />
          <ScheduleGrid
            className="p-5 shadow-700 bg-light md:p-8"
            label={t("text-delivery-schedule")}
            count={4}
          />
        </div>
        <div className="w-full mt-10 mb-10 lg:w-96 sm:mb-12 lg:mb-0">
          <RightSideView />
        </div>
      </div>
    </div>
  );
}
CheckoutPage.authenticate = {
  permissions: ownerAndStaffOnly,
};
CheckoutPage.Layout = ShopLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["table", "common", "form"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};