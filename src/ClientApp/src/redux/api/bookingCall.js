import OnboardingService from "../../axios/onboardingRequest";
import {
  getBookingFailure,
  getBookingStart,
  getBookingSuccess,
  refreshBooking,
} from "../bookingSlice";

export const getBookings = async (dispatch) => {
  dispatch(getBookingStart());
  try {
    const response = await OnboardingService.get("/test");
    dispatch(getBookingSuccess(response));
  } catch (error) {
    dispatch(getBookingFailure());
  }
};

export const getFreshBookings = async (dispatch) => {
  dispatch(getBookingStart());
  try {
    const response = await OnboardingService.get("/test");
    dispatch(refreshBooking(response));
  } catch (error) {
    dispatch(getBookingFailure());
  }
};
