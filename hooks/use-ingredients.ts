import React from "react";
import {Api} from "@/services/api-client";
import {Ingredient} from "@prisma/client";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
}

export const useIngredients = () : ReturnProps  => {

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
  const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      async function fetchIngredients() {
        try {
          setLoading(true);
          const ingredients = await Api.ingredients.getAll();
          setIngredients(ingredients);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }

      }

    // alternnative Code:
      // Api.ingredients.getAll().then(items => setItems(items)).catch(error => console.log(error));

      fetchIngredients();
    }
    , [])

    return {
      ingredients
      , loading
    };

}