import { ImUndo2 } from "react-icons/im";
import { TextBox } from "devextreme-react/text-box";
import { useEffect, useState } from "react";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { Button, SelectBox } from "devextreme-react";
import { FcAddDatabase } from "react-icons/fc";


const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6InZlRGFUVnBWVlZTenZOeHBWalViajZuT0NUMEt5NVFTY3pMb0QwTEROZ0kiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRXpla2llbCBNYWNrZW56aWUiLCJ0ZWxlcGhvbmUiOiIrMjU0NzE4NzM0MzkzMiIsInN1YiI6IjA4MTQ2YjUxLTAwM2YtNGYwNS1hODliLTY5YzMyMGFjNWU1ZiIsImVtYWlsIjoiam9lb3Jzb245MDBAZ21haWwuY29tIiwicGVybWlzc2lvbnMiOlsiVXNlci4wODE0NmI1MS0wMDNmLTRmMDUtYTg5Yi02OWMzMjBhYzVlNWYuU2VsZiIsIlRlbmFudC4wMzVhYTNlOS0wNjg2LTQ0M2QtOTNlYy0wOGRiNzk0Nzc4OTguQWRtaW4iXSwicm9sZXMiOltdLCJ0aWQiOiI3OGVmYmE1Yy0yMDM2LTRmOGQtYTU5ZC1lMjUzMWRhOWExODciLCJub25jZSI6IjYzODI0MTM1MTg4MTIzOTk0NS5OV00yWVRBelpHTXRNREF6TnkwMFpUWTRMV0ZqT0dFdE1XUTRZemRoTjJOa016YzBOMlkxWldJeU9XVXRaRGszTXkwME1UTTJMVGt3WW1VdE5XSTJZek5rTm1JMVl6Rm0iLCJzY3AiOiJ0ZW5hbnQucmVhZCB0ZW5hbnQuZ2xvYmFsLnJlYWQgdGVuYW50LndyaXRlIHRlbmFudC5nbG9iYWwud3JpdGUgdGVuYW50LmRlbGV0ZSB0ZW5hbnQuZ2xvYmFsLmRlbGV0ZSIsImF6cCI6IjU5YWQ4NThkLWZmYzktNDkyYS05YjZjLTJiNjNhMzM1Yzk0YyIsInZlciI6IjEuMCIsImlhdCI6MTY4ODUzODM5OCwiYXVkIjoiZjVhMDY0MGUtNDMyOC00NzcwLTk3ZGQtN2Q3ZTQ0YmNjNTIzIiwiZXhwIjoxNjg4NTQxOTk4LCJpc3MiOiJodHRwczovL2FzZGtkZXZsc2c1LmIyY2xvZ2luLmNvbS83OGVmYmE1Yy0yMDM2LTRmOGQtYTU5ZC1lMjUzMWRhOWExODcvdjIuMC8iLCJuYmYiOjE2ODg1MzgzOTh9.HVMzNDpmUojOGqs6tICMAoPnL0I_7fCO3IQtWNfcWdAApDLrkrXenUWjic3X1y2sBCtG9ZGBNBarrnxhWFlIBpizG1Ed0Xe2Di0GUTvAsDoYJ02VrkHrQzBeM5yXdGGKNB14CthC8JysVQLOt7qbZeRq6-ZXUpj56Q0C3eCp6XrP0OZKvcYpj9h_UAZMlzlTVyBaoXY95rbgDIWGyzV_eyq-AdNjR9VgKfUL2JMA3YveGiY-MWlEJhWPuG8AvdBvG_OyuwpLrZFR3bnO5BC2lTAlNc2RlW_dalzwvxnJ60zWT5p10fI9UmLjp65G-VGyjDfrf-AF0ZWtYnIfEjP_Ow"
const url = "https://localhost:5000"
const UserGroupForm = ({ handleClose }) => {
  const [username, setUsername] = useState("");
  const [userGroup, setUserGroup] = useState("");
  const [narration, setNarration] = useState("Desc.");
  const [userNames, setUserNames] = useState([]);
  const [groupCodes, setGroupCode] =  useState([]);

  const handleSubmit = async () =>{
    
  }

  useEffect(() => {
      getUserNamesGroups();
  }, []);

  const getUserNamesGroups = async () => { 
    try {
      const res = await fetch(url + "/api/userGroups",
      {
        headers:{
          Authorization: "Bearer " + token
        }
      });
  
      const data = await res.json();
      setUserNames(data.userNames)
      setGroupCode(data.groupCodes)
      
    } catch (error) {
      console.log(error)
    }        
   
    };


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
            <SelectBox
                    dataSource={userNames}
                    searchEnabled={true}
                    onValueChanged={(e) =>  setUsername(e.value)}
                    value={username}
                    placeholder="Select a user"
                    height={30}
                    style={{ fontSize: "12px" }}
                    className="border pl-1 text-center w-full outline-none"
              />
          </div>
          <div className="box-border w-full flex flex-col justify-between gap-1 mb-2">
            <label
              className="text-[11px] text-label font-semibold"
              htmlFor="userGroup"
            >
              <sup className="text-red-600">*</sup>Group Name
            </label>
            <SelectBox
                    dataSource={groupCodes}
                    searchEnabled={true}
                    onValueChanged={(e) => setUserGroup(e.value)}
                    value={userGroup}
                    placeholder="User's security group..."
                    height={30}
                    style={{ fontSize: "12px" }}
                    className="border pl-1 text-center w-full outline-none"
              />
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
          <Button id="devBlueButton" useSubmitBehavior={handleSubmit}>
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