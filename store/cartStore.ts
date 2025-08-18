import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the cart state type
export interface CartState {
  cart: any[];
  loading: boolean;
  addToCart: (item: any) => void;
  clearCart: () => void;
  removeFromTheCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  setLoading: (state: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      loading: false,
      setLoading: (state: boolean) => set({ loading: state }),

      addToCart: (item: any) => {
        set((state) => {
          const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: (cartItem.quantity ?? 0) + 1 }
                  : cartItem
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            };
          }
        });
      },

      clearCart: () => set({ cart: [] }),

      removeFromTheCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      incrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item
          ),
        }));
      },

      decrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && (item.quantity ?? 0) > 1
              ? { ...item, quantity: (item.quantity ?? 0) - 1 }
              : item
          ),
        }));
      },
    }),
    {
      name: "cart-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
