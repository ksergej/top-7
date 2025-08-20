import React from "react";
import qs from "qs";
import {Filters} from "@/hooks/use-filters";
import {useRouter} from "next/navigation";

export const useQueryFilters = (filters: Filters) => {

    const router = useRouter();

    React.useEffect (() => {
    // Filters go to Backend ... Video: 6.38.30
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };
    // Video 6.41.19 -> arrayFormat: 'comma'
    // console.log(qs.stringify(filters, {arrayFormat: 'comma'}));

    const query = qs.stringify(params, {
      arrayFormat: 'comma'
    });

    router.push(`?${query}`, {
      scroll: false,
    });


  }, [filters, router]);

}