import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ImUndo2 } from "react-icons/im";
import { FcAddDatabase } from "react-icons/fc";
import { TbBrandBooking } from "react-icons/tb";
import { TextBox } from "devextreme-react/text-box";
import TextArea from "devextreme-react/text-area";
import SelectBox from "devextreme-react/select-box";
import DateBox from "devextreme-react/date-box";
import NumberBox from "devextreme-react/number-box";
import Validator, {
  RequiredRule,
  PatternRule,
  EmailRule,
} from "devextreme-react/validator";
import { Button } from "devextreme-react";

import services from "../../helpers/formDataSource";
import OnboardingService from "../../axios/onboardingRequest";
import { toast } from "react-toastify";

const New = ({
  handleClose,
  bookings,
  singleBooking,
  setSingleBooking,
  setBookings,
  title,
  heading,
  statusBarText,
  statusMode,
}) => {
  const [fullName, setFullName] = useState(
    statusMode === "EditMode" ? singleBooking?.fullName : ""
  );
  const [idNumber, setIdNumber] = useState(
    statusMode === "EditMode" ? singleBooking?.idNumber : ""
  );
  const [email, setEmail] = useState(
    statusMode === "EditMode" ? singleBooking?.email : ""
  );
  const [telephone, setTelephone] = useState(
    statusMode === "EditMode" ? singleBooking?.telephone : ""
  );
  const [physicalAddress, setPhysicalAddress] = useState(
    statusMode === "EditMode" ? singleBooking?.physicalAddress : ""
  );
  const [employerName, setEmployerName] = useState(
    statusMode === "EditMode" ? singleBooking?.employerName : ""
  );
  const [position, setPosition] = useState(
    statusMode === "EditMode" ? singleBooking?.position : ""
  );
  const [schemePosition, setSchemePosition] = useState(
    statusMode === "EditMode" ? singleBooking?.schemePosition : ""
  );
  const [additionalRequirements, setAdditionalRequirements] = useState(
    statusMode === "EditMode" ? singleBooking?.additionalRequirements : ""
  );
  const [externalSchemeAdmin, setExternalSchemeAdmin] = useState(
    statusMode === "EditMode" ? singleBooking?.externalSchemeAdmin : ""
  );

  const [experience, setExperience] = useState(
    statusMode === "EditMode" ? singleBooking?.experience : 0
  );
  const [selectedCountry, setSelectedCountry] = useState(
    statusMode === "EditMode" ? singleBooking?.originCountry : "Kenya"
  );
  const [selectedStatus, setSelectedStatus] = useState(
    statusMode === "EditMode" ? singleBooking?.disabilityStatus : "Not Disabled"
  );
  const [schemeOptions, setSchemeOptions] = useState(
    statusMode === "EditMode"
      ? singleBooking?.retirementSchemeName
      : "A I C KIJABE PRINTING"
  );
  const [bookingType, setBookingType] = useState(
    statusMode === "EditMode" ? singleBooking?.bookingType : "First Time"
  );
  const [trainingVenue, setTrainingVenue] = useState(
    statusMode === "EditMode" ? singleBooking?.trainingVenue : "INHOUSE"
  );
  const [courseDate, setCourseDate] = useState(
    statusMode === "EditMode" ? singleBooking?.courseDate : today
  );
  const [paymentMode, setPaymentMode] = useState(
    statusMode === "EditMode" ? singleBooking?.paymentMode : "Cheque"
  );

  const newFormData = {
    userID: 2,
    fullName,
    idNumber,
    email,
    telephone,
    physicalAddress,
    originCountry: selectedCountry,
    employerName,
    experience,
    position,
    disabilityStatus: selectedStatus,
    bookingId: 1,
    bookingType,
    retirementSchemeName: schemeOptions,
    schemePosition,
    trainingVenue,
    courseDate,
    paymentMode,
    additionalRequirements,
    externalSchemeAdmin,
  };

  const editFormData = {
    userID: singleBooking?.userID,
    fullName,
    idNumber,
    email,
    telephone,
    physicalAddress,
    employerName,
    experience,
    position,
    disabilityStatus: selectedStatus,
    bookingId: singleBooking?.bookingId,
    bookingType,
    retirementSchemeName: schemeOptions,
    schemePosition,
    originCountry: selectedCountry,
    trainingVenue,
    courseDate,
    paymentMode,
    additionalRequirements,
    externalSchemeAdmin,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "/test";

    if (statusMode === "CreateMode") {
      try {
        const response = await OnboardingService.post(url, newFormData);
        setBookings([response, ...bookings]);
        handleClose();
        toast.success("Booking created successfully.");
      } catch (error) {
        console.log(error);
      }
    }
    if (statusMode === "EditMode") {
      try {
        const response = await OnboardingService.put(url, editFormData);
        if (bookings) {
          const newBooking = bookings.map((booking) => {
            if (booking.bookingId === response?.bookingId) {
              console.log(response);
              return response;
            }
            return booking;
          });
          setBookings(newBooking);
        }
        setSingleBooking(response);
        handleClose();
        toast.success("Booking updated successfully.");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="bg-white w-full md:w-[80%] xl:w-[70%] xxl:w-[60%] xxxl-[50%]  mx-auto h-screen md:h-fit items-stretch overflow-y-scroll md:overflow-visible">
      <section className="sticky inset-x-0 top-0 z-50">
        <article className="bg-formHeading flex items-center justify-between">
          <div className="flex items-center py-1 px:2 md:px-5 w-full gap-1 text-formHeadingColor">
            <TbBrandBooking />
            <p className="text-xs opacity-90">{title}</p>
          </div>
          <div className="px:2 md:px-5">
            <MdOutlineClose
              onClick={handleClose}
              className="text-lg hover:text-xl text-formHeadingColor opacity-60 cursor-pointer"
            />
          </div>
        </article>
      </section>
      <section className="md:p-3">
        <article className="text-formHeadingColor md:rounded-t-sm p-1 md:py-2 md:px-10 linear-bg">
          <h2 className="text-xl flex justify-center md:justify-start font-medium opacity-90">
            {heading}
          </h2>
          <p className="text-xs text-center md:text-left">
            Enter all the booking information in the fields below then tap on
            save.
          </p>
        </article>
        <article className="h-full px-2 md:border md:overflow-y-auto">
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full mt-1 py-1 items-stretch rounded-sm flex-wrap justify-between gap-2"
            >
              <section className="flex flex-col md:flex-row w-full gap-2">
                <article className="w-full flex flex-wrap box-border justify-between  gap-2">
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-7/12">
                    <label className="text-xs text-gray-600" htmlFor="fullName">
                      Full Name:<sup className=" text-red-600">*</sup>
                    </label>

                    <TextBox
                      type="text"
                      id="fullName"
                      placeholder="Type full name here"
                      onValueChanged={(e) => setFullName(e.value)}
                      value={fullName}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 text-center w-full md:w-[70%] lg:w-[80%] outline-none"
                    >
                      <Validator>
                        <RequiredRule message="Name is required" />
                        <PatternRule
                          message="Do not use digits in the Name"
                          pattern={/^[^0-9]+$/}
                        />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-4/12">
                    <label className="text-xs text-gray-600" htmlFor="idNumber">
                      ID Number:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="idNumber"
                      placeholder="Type id number here"
                      onValueChanged={(e) => setIdNumber(e.value)}
                      value={idNumber}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                    >
                      <Validator>
                        <RequiredRule message="ID is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-7/12">
                    <label className="text-xs text-gray-600" htmlFor="email">
                      Email:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="email"
                      placeholder="Type email here"
                      onValueChanged={(e) => setEmail(e.value)}
                      value={email}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Email is required" />
                        <EmailRule message="Email is invalid" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3  md:flex-row w-full md:w-4/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="telephone"
                    >
                      Telephone:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="telephone"
                      placeholder="Type phone number here"
                      onValueChanged={(e) => setTelephone(e.value)}
                      value={telephone}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Telephone is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-7/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="employerName"
                    >
                      Empl Name:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="employerName"
                      placeholder="Type employer name here"
                      onValueChanged={(e) => setEmployerName(e.value)}
                      value={employerName}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Employer Name is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-4/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="experience"
                    >
                      Experience:<sup className=" text-red-600">*</sup>
                    </label>
                    <NumberBox
                      id="experience"
                      onValueChanged={(e) => setExperience(e.value)}
                      value={experience}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Experience is required" />
                      </Validator>
                    </NumberBox>
                  </div>
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-7/12">
                    <label
                      className="text-xs   text-gray-600"
                      htmlFor="originCountry"
                    >
                      Org Country:<sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={countriesOptions}
                      searchEnabled={true}
                      onValueChanged={(e) => setSelectedCountry(e.value)}
                      value={selectedCountry}
                      placeholder="Select a Country"
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-4/12">
                    <label className="text-xs text-gray-600" htmlFor="position">
                      Position:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="position"
                      placeholder="Type position here"
                      onValueChanged={(e) => setPosition(e.value)}
                      value={position}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border h-7  pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%] outline-none "
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Position is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-7/12">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="physicalAddress"
                    >
                      Address:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="physicalAddress"
                      placeholder="Type physical address here"
                      onValueChanged={(e) => setPhysicalAddress(e.value)}
                      value={physicalAddress}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border h-7 pl-1 w-full md:w-[70%] lg:w-[80%]  outline-none "
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Address is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-4/12">
                    <label
                      className="text-xs   text-gray-600"
                      htmlFor="disabilityStatus"
                    >
                      Status:<sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={diabilityStatusOptions}
                      searchEnabled={true}
                      placeholder="Select Status"
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setSelectedStatus(e.value)}
                      value={selectedStatus}
                      className=" text-center border pl-1 w-full md:w-1/2 lg:w-[60%] xl:w-[65%]"
                    />
                  </div>
                  <div className="flex flex-col gap-3  md:flex-row justify-between w-full md:w-7/12">
                    <label
                      className="text-xs  text-gray-600"
                      htmlFor="retirementSchemeName"
                    >
                      Sch Name:
                      <sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={retirementSchemeOptions}
                      searchEnabled={true}
                      placeholder="Select an option"
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setSchemeOptions(e.value)}
                      value={schemeOptions}
                      className=" border pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                    />
                  </div>
                </article>
              </section>
              <section className="w-full flex flex-col gap-2">
                <article className="w-full flex flex-wrap lg:w-[80%] box-border justify-between  gap-2">
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[48%]">
                    <label
                      className="text-xs  text-gray-600"
                      htmlFor="bookingType"
                    >
                      Booking Type:<sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={bookingTypeOptions}
                      searchEnabled={true}
                      placeholder="Select a Scheme Name"
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setBookingType(e.value)}
                      value={bookingType}
                      className=" border pl-1 w-full md:w-[70%]  outline-none"
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[48%]">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="schemePosition"
                    >
                      Sch Position:<sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="schemePosition"
                      placeholder="Type scheme position here"
                      onValueChanged={(e) => setSchemePosition(e.value)}
                      value={schemePosition}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" h-7 border pl-1 w-full md:w-[70%]  outline-none"
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Scheme Position is required" />
                      </Validator>
                    </TextBox>
                  </div>
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[48%]">
                    <label
                      className="text-xs   text-gray-600"
                      htmlFor="trainingVenue"
                    >
                      Training Venue:<sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={trainingVenuesOptions}
                      searchEnabled={true}
                      placeholder="Select a Training Venue"
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setTrainingVenue(e.value)}
                      value={trainingVenue}
                      className=" border pl-1 w-full md:w-[70%]  outline-none"
                    />
                  </div>

                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[48%]">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="courseDate"
                    >
                      Course Date:<sup className=" text-red-600">*</sup>
                    </label>

                    <DateBox
                      id="courseDate"
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setCourseDate(e.value)}
                      value={courseDate}
                      className=" border pl-1 w-full md:w-[70%]  outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between w-full md:w-[48%]">
                    <label
                      className="text-xs   text-gray-600"
                      htmlFor="paymentMode"
                    >
                      Payment Mode:<sup className=" text-red-600">*</sup>
                    </label>
                    <SelectBox
                      dataSource={paymentModeOptions}
                      searchEnabled={true}
                      placeholder="Select a Payment Mode"
                      height={26}
                      style={{ fontSize: "12px" }}
                      onValueChanged={(e) => setPaymentMode(e.value)}
                      value={paymentMode}
                      className=" border  pl-1 w-full md:w-[70%]  outline-none"
                    />
                  </div>
                  <div className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[48%]">
                    <label
                      className="text-xs text-gray-600"
                      htmlFor="externalSchemeAdmin"
                    >
                      Scheme Admin:
                      <sup className=" text-red-600">*</sup>
                    </label>
                    <TextBox
                      type="text"
                      id="externalSchemeAdmin"
                      placeholder="Type external scheme admin here"
                      onValueChanged={(e) => setExternalSchemeAdmin(e.value)}
                      value={externalSchemeAdmin}
                      height={26}
                      style={{ fontSize: "12px" }}
                      className=" border h-7 pl-1 w-full md:w-[70%]  outline-none"
                    >
                      {" "}
                      <Validator>
                        <RequiredRule message="Scheme admin is required" />
                      </Validator>
                    </TextBox>
                  </div>
                </article>
                <div className="flex justify-between box-border flex-col gap-3 md:flex-row w-full md:w-7/12">
                  <label
                    className="text-xs text-gray-600"
                    htmlFor="additionalRequirements"
                  >
                    Requirements:
                    <sup className=" text-red-600">*</sup>
                  </label>
                  <TextArea
                    type="text"
                    height="5vh"
                    placeholder="Type additional requirements here"
                    id="additionalRequirements"
                    onValueChanged={(e) => setAdditionalRequirements(e.value)}
                    value={additionalRequirements}
                    style={{ fontSize: "12px" }}
                    className=" border resize-none text-xs pl-1 w-full md:w-[70%] lg:w-[80%] outline-none"
                  />
                </div>
              </section>

              <article className="w-full sticky inset-x-0 bottom-0 flex px-2 pt-1 justify-center items-center gap-4">
                <Button id="submitButton" useSubmitBehavior={true}>
                  {" "}
                  <FcAddDatabase fontSize={20} />
                  {statusMode === "CreateMode" ? "Save" : "Update"}
                </Button>
                <button
                  onClick={handleClose}
                  className="flex gap-1 border-none  hover:bg-gray-200 py-1 px-4 w-fit text-menuText items-center font-medium  cursor-pointer text-xs"
                >
                  <ImUndo2 fontSize={18} />
                  Cancel
                </button>
              </article>
            </form>
          </div>
        </article>
      </section>
      <section className="sticky  inset-x-0 bottom-0 ">
        <article className="flex bg-formTitle text-formHeadingColor py-1 px:2 md:px-5 w-full">
          <p className="text-xs opacity-90">{statusBarText}</p>
        </article>
      </section>
    </main>
  );
};

// Controls Options

const countriesOptions = services.getCountries();

const trainingVenuesOptions = services.getCities();

const bookingTypeOptions = services.getBookinType();

const retirementSchemeOptions = services.getRetirementScheme();

const paymentModeOptions = services.getPaymentMode();

const diabilityStatusOptions = services.getDisabilityStatus();

const today = new Date().toISOString().slice(0, 10);

export default New;
