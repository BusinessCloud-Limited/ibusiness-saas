import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { homeMenuSource } from "../../../data/menu";
import { bookingColumns } from "../../../data/PurchaseOrderData";
import { bookingFilterValues } from "../../../helpers/datatableSource";
import CategoryComponent from "../../../components/dashboard/CategoryComponent";
import Constant from "../../../utils/constant";
import DataTable from "../../../components/dashboard/DataTable";
import Statusbar from "../../../components/dashboard/Statusbar";
import MenusGroupComponent from "../../../components/dashboard/Menus/MenusGroupComponent";
import SecurityGroupForm from "../../../components/dashboard/SecurityGroupForm";
import CustomActionModal from "../../../components/modals/CustomActionModal";

import { getBookings, getFreshBookings } from "../../../redux/api/bookingCall";

const SecurityGroup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.booking.bookings);

  const route = Constant.ROUTE.BOOKING;

  useEffect(() => {
    if (!bookings || bookings.length < 1) {
      getBookings(dispatch);
    } else {
      getFreshBookings(dispatch);
    }
    // eslint-disable-next-line
  }, [dispatch]);

  const handleClick = (action) => {
    switch (action) {
      case "New":
        setIsOpen(true);
        break;

      default:
        break;
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <main className="w-full min-h-full relative px-3 md:px-5">
      <section>
        <CategoryComponent>
          <MenusGroupComponent
            menus={homeMenuSource}
            heading={"Security Groups"}
            onMenuClick={handleClick}
          />
          <DataTable
            data={bookings}
            route={route}
            keyExpr={"bookingId"}
            columns={bookingColumns}
            filterValues={bookingFilterValues}
          />

          <Statusbar
            heading={"Security Groups"}
            company={"ARBS Customer Portal"}
          />
        </CategoryComponent>
      </section>
      <CustomActionModal
        title={"Security Group"}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <SecurityGroupForm handleClose={handleClose} />
      </CustomActionModal>
    </main>
  );
};

export default SecurityGroup;
