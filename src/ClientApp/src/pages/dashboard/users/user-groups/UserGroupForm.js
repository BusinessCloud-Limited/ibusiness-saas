import { ImUndo2 } from "react-icons/im";
import { TextBox } from "devextreme-react/text-box";
import { useState } from "react";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { Button } from "devextreme-react";
import { FcAddDatabase } from "react-icons/fc";


const UserGroupForm = ({ handleClose }) => {
  const [username, setUsername] = useState("");
  const [userGroup, setUserGroup] = useState("");
  const [narration, setNarration] = useState("Desc.");

  return (
    <main className="h-full">
      <form className="flex flex-col h-full justify-between">
        <article className="flex px-5  flex-wrap  w-full">
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="userName"
            >
              <sup className="text-red-600">*</sup>Choose a User
            </label>
            <TextBox
              type="text"
              id="userName"
              placeholder="Select a user"
              onValueChanged={(e) => setUsername(e.value)}
              value={username}
              height={26}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Your cannot proceed without selecting a user" />
              </Validator>
            </TextBox>
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="userGroup"
            >
              <sup className="text-red-600">*</sup>Group Name
            </label>
            <TextBox
              type="text"
              id="userGroup"
              placeholder="User's security group..."
              onValueChanged={(e) => setUserGroup(e.value)}
              value={userGroup}
              height={26}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="User's security group must be given" />
              </Validator>
            </TextBox>
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="narration"
            >
              <sup className="text-red-600">*</sup>Narration
            </label>
            <TextBox
              type="text"
              id="narration"
              placeholder={narration}
              onValueChanged={(e) => setNarration(e.value)}
              value={narration}
              height={26}
              style={{ fontSize: "12px" }}
              className="border pl-1 text-center w-full  outline-none"
            >
              {" "}
              <Validator>
                <RequiredRule message="Kindly provide description" />
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

export default UserGroupForm;