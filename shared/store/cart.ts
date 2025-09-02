import {create} from 'zustand';
import {Api} from "@/shared/services/api-client";
import {CartStateItem, getCartDetails} from "@/shared/lib/get-cart-details";


export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;

  // /* Запрос на обновление количества товаров */
  // updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  //
  // /* Запрос на добавление товара в корзину */
  // // !!!! TODO: Типизировать values
  // addCartItem: (values: any) => Promise<void>;
  //
  // /* Запрос на удаление товара из корзины */
  // removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({loading: true, error: false});
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({error: true});
    } finally {
      set({loading: false});
    }
  },

  // removeCartItem: async (id: number) => {
  //   try {
  //     set({ loading: true, error: false });
  //     const data = await Api.cart.removeCartItem(id);
  //     set(getCartDetails(data));
  //   } catch (error) {
  //     set({ error: true });
  //     console.error(error);
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
  //
  // updateItemQuantity: async (id: number, quantity: number) => {
  //   try {
  //     set({ loading: true, error: false });
  //     const data = await Api.cart.updateItemQuantity(id, quantity);
  //     set(getCartDetails(data));
  //   } catch (error) {
  //     console.error(error);
  //     set({ error: true });
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
  //
  // addCartItem: async (values: CreateCartItemValues) => {
  //   try {
  //     set({ loading: true, error: false });
  //     const data = await Api.cart.addCartItem(values);
  //     set(getCartDetails(data));
  //   } catch (error) {
  //     console.error(error);
  //     set({ error: true });
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
}));