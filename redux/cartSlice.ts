import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { act } from "react";

interface CartSate {
  cart: any;
}

const initialState: CartSate = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // multiple action
    addTocart: (state, action) => {
      const isPresent = state.cart.find((item: any) => {
        return item.id === action.payload.id;
      });
      if (isPresent) {
        //quantity update
        state.cart = state.cart.map((item: any) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromTheCart: (state, action) => {
      state.cart = state.cart.filter((item: any) => {
        return item.id !== action.payload;
      });
    },
    incrementQuantity: (state, action) => {
      state.cart = state.cart.map((item: any) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
    },
    decrementQuantity: (state, action) => {
      state.cart = state.cart.map((item: any) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      });
    },
    clearAllCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addTocart,
  removeFromTheCart,
  decrementQuantity,
  incrementQuantity,
  clearAllCart,
} = cartSlice.actions;
export const getCart = (state: RootState) => state.cart.cart;
export default cartSlice.reducer;
