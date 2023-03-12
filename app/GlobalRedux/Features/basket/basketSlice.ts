"use client";

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  items: [] as Product[],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);

      const newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload}) as it is not in the basket`
        );
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: RootState) => state.basket.items;
export const selectTotal = (state: RootState) =>
  state.basket.items.reduce((acc, curr) => acc + curr.price, 0);

export default basketSlice.reducer;
