import OnboardingService from "../../axios/onboardingRequest";
import {
  refreshPurchaseOrder,
  getPurchaseOrderSuccess,
} from "../purchaseOrderSlice";

export const getPurchaseOrders = async (dispatch) => {
  try {
    const response = await OnboardingService.get("test2");
    dispatch(getPurchaseOrderSuccess(response));
  } catch (error) {}
};

export const getFreshPurchaseOrders = async (dispatch) => {
  try {
    const response = await OnboardingService.get("test2");
    dispatch(refreshPurchaseOrder(response));
  } catch (error) {}
};
