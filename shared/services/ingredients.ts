import {Ingredient, Product} from "@prisma/client";
import {axiosInstance} from "@/shared/services/instance";
import {ApiRoutes} from "@/shared/services/constants";

export const getAll = async () : Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
}