import React, {useState} from "react";
import qs from "qs";
import {Filters} from "@/shared/hooks/use-filters";
import {useRouter} from "next/navigation";

export const useQueryFilters = (filters: Filters) => {

    const isMounted = React.useRef(false);
    const router = useRouter();
    //const [saveQuery, setValue] = useState("");

    React.useEffect (() => {
      if (isMounted.current) {
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

        //if (query === saveQuery) return;

        router.push(`?${query}`, {
          scroll: false,
        });
        //setValue(query);

      }
    isMounted.current = true;
//  }, [filters, saveQuery]);
}, [filters]);

}