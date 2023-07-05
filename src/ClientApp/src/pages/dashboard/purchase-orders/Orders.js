import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { orderColumns } from "../../../data/PurchaseOrderData";
import { homeMenuSource } from "../../../data/menu";
import { orderFilterValues } from "../../../helpers/datatableSource";
import CategoryComponent from "../../../components/dashboard/CategoryComponent";
import { toast } from "react-toastify";
import Constant from "../../../utils/constant";
import FromToDateComponent from "../../../components/dashboard/FromToDateComponent";
import DataTable from "../../../components/dashboard/DataTable";
import Statusbar from "../../../components/dashboard/Statusbar";
import MenusGroupComponent from "../../../components/dashboard/Menus/MenusGroupComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getFreshPurchaseOrders,
  getPurchaseOrders,
} from "../../../redux/api/purchaseOrderCall";

const Orders = () => {
  // eslint-disable-next-line
  const loadingRef = useRef(false);
  // eslint-disable-next-line
  const [onRowClickItem, setRowClickItem] = useState(null);
  const [onRowDblClickBookingId, setRowDblClickBookingId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.purchase.orders);
  const route = Constant.ROUTE.ORDER;

  useEffect(() => {
    if (!orders || orders.length < 1) {
      getPurchaseOrders(dispatch);
    } else {
      getFreshPurchaseOrders(dispatch);
    }
    // eslint-disable-next-line
  }, [dispatch]);

  const startEdit = ({ data }) => {
    if (data) {
      setRowDblClickBookingId(data.orderNumber);
    } else {
      setRowDblClickBookingId(null);
    }
  };

  useEffect(() => {
    if (onRowDblClickBookingId) {
      navigate(`/dashboard/orders/${onRowDblClickBookingId}/view`);
    }
  }, [onRowDblClickBookingId, navigate]);

  const openConfirmationPopup = async (rowItem) => {
    if (rowItem === null) {
      toast.warning("Please select a booking to delete");
    }
  };

  const handleClick = (menu) => {
    switch (menu) {
      case "Find":
        break;
      case "New":
        navigate("/dashboard/orders/new");
        break;
      case "Delete":
        console.log("Delete was clicked");
        break;
      case "Close":
        navigate("/dashboard");
        break;
      case "Help":
        console.log("Help was clicked");
        break;

      default:
        break;
    }
  };

  return (
    <main className="w-full min-h-full relative px-3 md:px-5 py-1.5">
      <section>
        <CategoryComponent>
          <MenusGroupComponent
            menus={homeMenuSource}
            heading={"Purchase Orders"}
            onMenuClick={handleClick}
          />
          <FromToDateComponent />
          <DataTable
            data={orders}
            route={route}
            keyExpr={"orderNumber"}
            columns={orderColumns}
            startEdit={(e) => startEdit(e)}
            setRowClickItem={setRowClickItem}
            openConfirmationPopup={openConfirmationPopup}
            filterValues={orderFilterValues}
          />
          <Statusbar
            heading={"Purchase Orders"}
            company={"ARBS Customer Portal"}
          />
        </CategoryComponent>
      </section>
    </main>
  );
};

export default Orders;
