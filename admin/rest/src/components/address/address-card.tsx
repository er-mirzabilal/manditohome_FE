import { CloseIcon } from "@components/icons/close-icon";
import { PencilIcon } from "@components/icons/pencil-icon";
import { useModalAction } from "@components/ui/modal/modal.context";
import { formatAddress } from "@utils/format-address";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

interface AddressProps {
  address: any;
  checked: boolean;
  userId: string;
}
const AddressCard: React.FC<AddressProps> = ({ checked, address, userId }) => {
  const { t } = useTranslation();
  const { openModal } = useModalAction();
  
  function onEdit() {
    openModal("ADD_OR_UPDATE_ADDRESS", { customerId: userId, address });
  }
  return (
    <div
      className={classNames(
        "relative p-4 h-full rounded border cursor-pointer group hover:border-accent overflow-hidden",
        {
          "border-accent shadow-sm": checked,
          "bg-gray-100 border-transparent": !checked,
        }
      )}
    >
      <p className="mb-3 text-sm font-semibold capitalize text-heading">
        {address.address.town}
      </p>
      <p className="text-sm text-sub-heading">
        {formatAddress(address.address)}
      </p>
      <div className="absolute flex opacity-0 top-4 end-4 space-s-2 group-hover:opacity-100">
        {onEdit && (
          <button
            className="flex items-center justify-center w-5 h-5 rounded-full bg-accent text-light"
            onClick={onEdit}
          >
            <span className="sr-only">{t("text-edit")}</span>
            <PencilIcon className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
