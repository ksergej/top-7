import {Ingredient} from "@prisma/client";
import {Api} from "@/services/api-client";
import React from "react";
import {useSet} from "react-use";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
  setSelectedIngredients: any;
}

// Video 7.01.00 ...
export const useFilterIngredients = (values: string[] = []): ReturnProps => {

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Video: 6.15.21, 7.01.00 ... set values ...
  const [selectedIds, {toggle}] = useSet(new Set<string>(values));

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

  // Video: 6.56.27
  const setSelectedIngredients = (ids: string[]) => {
    ids.forEach(selectedIds.add);
  }

  return {ingredients, loading, onAddId: toggle, selectedIngredients: selectedIds, setSelectedIngredients};
};