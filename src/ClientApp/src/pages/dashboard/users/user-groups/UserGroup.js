import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { homeMenuSource } from "../../../../data/menu";
import { bookingColumns } from "../../../../data/PurchaseOrderData";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import CategoryComponent from "../../../../components/dashboard/CategoryComponent";
import Constant from "../../../../utils/constant";
import DataTable from "../../../../components/dashboard/DataTable";
import Statusbar from "../../../../components/dashboard/Statusbar";
import MenusGroupComponent from "../../../../components/dashboard/Menus/MenusGroupComponent";
import CustomActionModal from "../../../../components/modals/CustomActionModal";

import { getBookings, getFreshBookings } from "../../../../redux/api/bookingCall";
import UserGroupForm from "./UserGroupForm";

const UserGroup = () => {
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
            heading={"User Groups"}
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
            heading={"User Groups"}
            company={"iBusiness Customer Portal"}
          />
        </CategoryComponent>
      </section>
      <CustomActionModal
        title={"User Groups"}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <UserGroupForm handleClose={handleClose} />
      </CustomActionModal>
    </main>
  );
};

export default UserGroup;
