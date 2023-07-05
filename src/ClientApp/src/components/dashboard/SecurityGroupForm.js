import { ImUndo2 } from "react-icons/im";
import { TextBox } from "devextreme-react/text-box";
import { useState } from "react";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { Button } from "devextreme-react";
import { FcAddDatabase } from "react-icons/fc";

const SecurityGroupForm = ({ handleClose }) => {
  const [groupCode, setGroupCode] = useState("ACC");
  const [groupName, setGroupName] = useState("Accounts");
  const [narration, setNarration] = useState("Accounts");
  return (
    <main className="h-full">
      <form className="flex flex-col h-full justify-between">
        <article className="flex px-5  flex-wrap  w-full">
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="fullName"
            >
              <sup className="text-red-600">*</sup>Group Code
            </label>
            <TextBox
              type="text"
              id="schemePosition"
              placeholder="Type scheme position here"
              onValueChanged={(e) => setGroupCode(e.value)}
              value={groupCode}
              height={26}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Scheme Position is required" />
              </Validator>
            </TextBox>
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="fullName"
            >
              <sup className="text-red-600">*</sup>Group Name
            </label>
            <TextBox
              type="text"
              id="schemePosition"
              placeholder="Type scheme position here"
              onValueChanged={(e) => setGroupName(e.value)}
              value={groupName}
              height={26}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Scheme Position is required" />
              </Validator>
            </TextBox>
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="fullName"
            >
              <sup className="text-red-600">*</sup>Narration
            </label>
            <TextBox
              type="text"
              id="schemePosition"
              placeholder="Type scheme position here"
              onValueChanged={(e) => setNarration(e.value)}
              value={narration}
              height={26}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Scheme Position is required" />
              </Validator>
            </TextBox>
          </div>
        </article>
        <article className="w-full border-t border-gray-300 py-1.5 bg-white sticky inset-x-0 bottom-0 flex justify-center items-center gap-4">
          <Button id="devBlueButton" useSubmitBehavior={true}>
            {" "}
            <FcAddDatabase fontSize={20} /> Save
          </Button>
          <button
            type="button"
            onClick={handleClose}
            className="flex gap-1 text-xs  items-center font-semibold bg-menuButton hover:bg-buttonBg border-none py-1 px-3 rounded-sm w-fit text-white cursor-pointer"
          >
            <ImUndo2 fontSize={18} />
            Cancel
          </button>
        </article>
      </form>
    </main>
  );
};

export default SecurityGroupForm;
