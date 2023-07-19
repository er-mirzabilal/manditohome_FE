import RateList from "@repositories/rate-list";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import {useQuery} from "react-query";

const fetchRateList = async () => {
    const url = API_ENDPOINTS.RATE_LIST;
    const {
        data
    } = await RateList.all(url);
    return data
};
const useRateListQuery = () => {
    return useQuery([API_ENDPOINTS.RATE_LIST],fetchRateList);
}
export {  useRateListQuery,fetchRateList };
