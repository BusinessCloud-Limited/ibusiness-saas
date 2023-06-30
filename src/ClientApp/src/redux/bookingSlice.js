import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getBookingStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getBookingSuccess: (state, action) => {
      state.isFetching = false;
      state.bookings = action.payload;
    },
    getBookingFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    refreshBooking: (state, action) => {
      state.bookings = [...state.bookings, action.payload];
    },
  },
});

export const {
  getBookingStart,
  getBookingSuccess,
  getBookingFailure,
  refreshBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
