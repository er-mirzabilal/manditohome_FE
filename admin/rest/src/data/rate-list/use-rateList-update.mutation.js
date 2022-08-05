import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import RateList from "@repositories/rate-list";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const useUpdateRateListMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ variables: {  input } }) =>
            RateList.update(`${API_ENDPOINTS.RATE_LIST}/1`, input),
        {
            onSuccess: () => {
                toast.success("Successfully updated!");
            },
            // Always refetch after error or success:

        }
    );
};
