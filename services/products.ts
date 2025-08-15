import {Product} from "@prisma/client";
import {axiosInstance} from "@/services/instance";
import {ApiRoutes} from "@/services/constants";

export const search = async (query: string) : Promise<Product[]> => {
  return (await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCS,  {params: {query }})).data;
}