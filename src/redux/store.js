import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardSlice";
import inputReducer from "./inputSlice"
export const store = configureStore({
  reducer: {
    cart: cardReducer,
    input:inputReducer,
  },
});
