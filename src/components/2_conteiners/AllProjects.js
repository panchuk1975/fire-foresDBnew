import React, { memo, useState } from "react";
import { ModalBox } from "../6_common_help_comp/ModalBox";
import { AlertBox } from "../6_common_help_comp/AlertBox";
import { ShowBox } from "../6_common_help_comp/ShowBox";
import fire from "../../config/Fire";
import { AllProjectsComponent } from "../3_sub_conteiners/AllProjectsComponent";
import {SizeNameArray} from "../../helpComponents/dataFunctions";

export const AllProjects = memo(
  ({
    //---COMMON DATES ----------------------->
    windowWidth,
    clientType,
    //---COMMON STATE ----------------------->
    dates,
    client,
    userInfos,
    clients,
    projects,
    payments,
    //---PROJECTS FUNCTIONS ----------------->
    removeProject,
    openCurrentProject,
    clouseCurrentProject,

    addPayment,
    openPayment,
    openNewPayment,
    clouseNewPayment,
    clousePayment,
  }) => {
    //---Alert functions block---------------->
    let [alertClass, setAlertClass] = useState("modal");
    let [alertText, setAlertText] = useState("");
    let [modalClass, setClass] = useState("modal");
    let [fun, setFunct] = useState("");
    let [textModal, setModalText] = useState();
    let [Id, setId] = useState();
    let setModalClass = () => {
      if ((modalClass = "modal")) {
        setClass("open");
      } else {
        setClass("modal");
      }
    };
    //--Create user data----------------------->
    var owner = fire.auth.currentUser.uid;
    let userInfo = userInfos.find((info) => info.owner === owner);
    if (!userInfo) {
      return null;
    }
    let userInUse = userInfos.find(
      (infoUse) => infoUse.company === userInfo.jointCompany
    );
    if (!userInUse) {
      return null;
    }
    //--Create clients data array--------------->
    clients = clients.filter((client) => client.owner === userInUse.owner);
    clients = clients.filter((client) => client.clientType === clientType);
    clients.sort(
      (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
    );
    let clientsExists = clients.length;
    if (clientsExists === 0) {
      return null;
    }
    //--TABLE FUNCTION-------------------------->
    let sizeArray = SizeNameArray(windowWidth);
    const summArray = (numb, sizeArray) => {
      let i = 0;
      let summ = 0;
      while (i < numb) {
        summ = summ + sizeArray[i].size;
        i++;
      }
      return summ;
    };
    //--------------------Create projects----------------------->
    projects.sort(
      (a, b) => new Date(a.projectReadinessDate) - new Date(b.projectReadinessDate)
    );
    //-------------------Progects render block------------------>
    return (
      <div>
        <li className="list-group-item clientInnerLi">
          <div>
            <div className="d-flex justify-content-between">
              <table className="headTable">
                <tbody>
                  <tr align="center">
                    {windowWidth > 75 + summArray(1, sizeArray) && (
                      <td width={sizeArray[0].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[0].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[0].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(2, sizeArray) && (
                      <td width={sizeArray[1].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[1].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[1].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(3, sizeArray) && (
                      <td width={sizeArray[2].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[2].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[2].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(4, sizeArray) && (
                      <td
                        width={sizeArray[3].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[3].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[3].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(5, sizeArray) && (
                      <td
                        width={sizeArray[4].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[4].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[4].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(6, sizeArray) && (
                      <td width={sizeArray[5].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[5].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[5].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(7, sizeArray) && (
                      <td width={sizeArray[6].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[6].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[6].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(8, sizeArray) && (
                      <td width={sizeArray[7].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[7].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[7].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(9, sizeArray) && (
                      <td width={sizeArray[8].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[8].fullName);
                          setModalClass();
                        }}>
                        <small>{sizeArray[8].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(10, sizeArray) && (
                      <td width={sizeArray[9].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[9].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[9].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(11, sizeArray) && (
                      <td width={sizeArray[10].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[10].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[10].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(12, sizeArray) && (
                      <td width={sizeArray[11].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[11].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[11].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(13, sizeArray) && (
                      <td width={sizeArray[12].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[12].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[12].name}</small>
                      </td>
                    )}
                    {windowWidth > 75 + summArray(14, sizeArray) && (
                      <td width={sizeArray[13].size}
                        onClick={() => {
                          setFunct("showFunction");
                          setModalText(sizeArray[13].fullName);
                          setModalClass();
                        }}
                      >
                        <small>{sizeArray[13].name}</small>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            <AllProjectsComponent
              dates={dates}
              payments={payments}
              client={client}
              newProjects={projects}
              removeProject={removeProject}
              openCurrentProject={openCurrentProject}
              clouseCurrentProject={clouseCurrentProject}
              addPayment={addPayment}
              openPayment={openPayment}
              clousePayment={clousePayment}
              openNewPayment={openNewPayment}
              clouseNewPayment={clouseNewPayment} 
              windowWidth={windowWidth}
              setAlertClass={setAlertClass}
              setAlertText={setAlertText}
              setFunct={setFunct}
              setModalText={setModalText}
              setModalClass={setModalClass}
              setId={setId}
              modalClass={modalClass}
              sizeArray={sizeArray}
              userInfo={userInfo}
            />
            {fun === "removeList" && (
              <ModalBox
                modalClass={modalClass}
                modalText={textModal}
                modalFunction={setClass}
                Id={Id}
                innerFunction={removeProject}
              />
            )}
            {fun === "showFunction" && (
              <ShowBox
                modalClass={modalClass}
                modalText={textModal}
                modalFunction={setClass}
              />
            )}
            <AlertBox
              modalClass={alertClass}
              modalText={alertText}
              modalFunction={setAlertClass}
            />
          </div>
          <div className="d-flex justify-content-between">
            {/* <ExportReactCSV
            csvData={carExelInfo(clients)}
            fileName={"авто"}
            textCSV="авто.xlx"
          /> */}
            {/* <ExportReactCSV
            csvData={carLiquidsExelInfo(clients, lists, routes)}
            fileName={"пммАвто"}
            textCSV="пмм.xlx"
          /> */}
            {/* <ExportReactCSV
            csvData={carListLiquidsExelInfo(clients, lists, routes)}
            fileName={"пммЛист"}
            textCSV="листи.xlx"
          />    */}
          </div>
        </li>
      </div>
    );
  }
);
