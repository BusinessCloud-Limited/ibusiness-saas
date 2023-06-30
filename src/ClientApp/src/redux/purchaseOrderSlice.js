import { createSlice } from "@reduxjs/toolkit";

const purchaseOrderSlice = createSlice({
  name: "purchase",
  initialState: {
    orders: [],
  },
  reducers: {
    getPurchaseOrderSuccess: (state, action) => {
      state.orders = action.payload;
    },
    refreshPurchaseOrder: (state, action) => {
      state.bookings = [...state.orders, action.payload];
    },
  },
});

export const { getPurchaseOrderSuccess, refreshPurchaseOrder } =
  purchaseOrderSlice.actions;

export default purchaseOrderSlice.reducer;
