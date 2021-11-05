import axios from "axios"
import Axios,{AxiosResponse} from "axios"
const API_URL="/houjin/fuzzy/";

export type ConditionProps = {
    pageNumber: number; item_4?: string; item_15?: string; item_6?: string; peoples?: string
}
export type SearchConditionProps = {
    item_4?: string;
    item_15?: string;
    item_6?: string;
    peoples?: string;
};
export type ItemDetailInfoDTO={
    id:string;
    companyNo:string;
    companyName:string;
    updateDate:string;
    foundingDate:string;
    street:string;
    province:string;
    provinceNo:string;
    city:string;
    post:string;
    peoples:string;
    romaji:string;
    cityCode:string;
}
export type DataInfoDTO={
    success:number;
    total:number;
    data:ItemDetailInfoDTO[]
}
export const fetchAllInfo = async (conditions:ConditionProps):Promise<AxiosResponse<DataInfoDTO>>=>{
    const res= await axios.get(API_URL,{
        params:{
            ...conditions
        }
    })
    return res
}