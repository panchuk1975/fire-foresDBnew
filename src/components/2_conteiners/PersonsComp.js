import React, { memo, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import // ExportReactCSV,
//carExelInfo,
//carLiquidsExelInfo,
//carListLiquidsExelInfo,
"../../mathfunctions/liquidsFunctions";
import { CreateComponent } from "../5_create_components/CreateComponent";
import { ModalBox } from "../6_common_help_comp/ModalBox";
import { AlertBox } from "../6_common_help_comp/AlertBox";
import { ShowBox } from "../6_common_help_comp/ShowBox";
import fire from "../../config/Fire";
import { ProjectsComponent } from "../3_sub_conteiners/ProjectsComponent";
var moment = require("moment");

export const PersonsComp = memo(
  ({
    //---COMMON DATES ----------------------->
    windowWidth,
    clientType,
    //---COMMON STATE ----------------------->
    dates,
    userInfos,
    clients,
    projects,
    //---CLIENT FUNCTIONS ------------------->
    removeClient,
    openClient,
    clouseClient,
    //---PROJECTS FUNCTIONS ----------------->
    addProject,
    openProject,
    clouseProject,
    removeProject,
    openCurrentProject,
    clouseCurrentProject,
    //---PAYMENTS FUNCTIONS ------------------>
    payments,
    addPayment,
    openPayment,
    clousePayment,
    openNewPayment,
    clouseNewPayment,


    //routes,
    // openNewList,
    // clouseNewList,
    // openNewRoute,
    // closeNewRoute,
    // openList,
    // closeList,
    // openRoute,
    // closeRoute,
  }) => {
    //---Alert functions block---------------->
    const dataWarningText =
      "Ви намагаєтеся видалити дані! Після видалення відновлення даних буде не можливим!";
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
    //---------------------------------Cars JSX block----------------------------------//
    return (
      <div>
        <div>
          <TransitionGroup component="ul" className="list-group">
            {clientsExists &&
              clients.map((client) => {
                //--------------------Create client projects and routes-----------------------//
                let newProjects = projects.filter(
                  (project) => project.projectOwner === client.id
                );
                newProjects.sort((a, b) => a.projectNumber - b.projectNumber);
                // let carRoutes = routes.filter(
                //   (route) => route.listOwner === client.id
                // );
                // //---------------------------Car liquids array---------------------------//
                // let listCarLiquids = NewListLiquidsCount(carRoutes);

                //--CLIENT TYPE DYNAMIC CLASSIS ----------->
                let clientType = null;
                if (client.clientType === "Юрідичний") {
                  clientType = "legalClients";
                } else {
                  clientType = "unlegalClients";
                }
                //--DYNAMIC CLASSIS---------------------->
                //--TABLE----->
                let openClientTableClass = null;
                if (client.openClient) {
                  openClientTableClass = "tableItemsAreClouse";
                }
                //--DELETE BUTTON -->
                let openDeleteButtonClass = null;
                if (client.openClient) {
                  openDeleteButtonClass = "deleteButtonItemAreClouse";
                }
                if (newProjects.length) {
                  openDeleteButtonClass = "deleteButtonItemAreClouse";
                }
                if (userInfo.company !== userInfo.jointCompany) {
                  openDeleteButtonClass = "deleteButtonItemAreClouse";
                }
                //--DISABLE BUTTON--->
                let disableDeleteButtonClass = "deleteButtonItemAreClouse";
                if (newProjects.length) {
                  disableDeleteButtonClass = "";
                }
                if (userInfo.company !== userInfo.jointCompany) {
                  disableDeleteButtonClass = "";
                }
                if (client.openClient) {
                  disableDeleteButtonClass = "deleteButtonItemAreClouse";
                }
                //----TABLE SIZE FUNCTION---------------->
                const sizeArray = [
                  180,
                  105,
                  80,
                  120,
                  90,
                  80,
                  40,
                  80,
                  300,
                  70,
                  90,
                  90
                ];
                const summArray = (numb, sizeArray) => {
                  let i = 0;
                  let summ = 0;
                  while (i < numb) {
                    summ = summ + sizeArray[i];
                    i++;
                  }
                  return summ;
                };
                //---------------------------CLIENTS RENDER----------------------------//
                return (
                  <CSSTransition
                    key={client.id}
                    classNames={"note"}
                    timeout={800}
                  >
                    <li
                      key={client.id}
                      className="list-group-item clientInnerLi"
                    >
                      <form className="d-flex justify-content-between clientInnerForm">
                        <table
                          className={`clientTable ${openClientTableClass}`}
                          onClick={() => {
                            openClient(client);
                          }}
                        >
                          <tbody>
                            <tr align="center">
                            {windowWidth > 70 + summArray(1, sizeArray) && (
                              <td width={sizeArray[0]}>
                                <small className={clientType}>
                                  {client.companyName}
                                </small>
                              </td>
                            )}
                               {windowWidth > 70 + summArray(2, sizeArray) && (
                                <td width={sizeArray[1]}>
                                  <small>{client.secName}</small>
                                </td>
                              )}
                              {windowWidth > 70 + summArray(3, sizeArray) && (
                                <td width={sizeArray[2]}>
                                  <small>{client.firstName}</small>
                                </td>
                              )}
                              {windowWidth > 70 + summArray(4, sizeArray) && (
                                <td width={sizeArray[3]}>
                                  <small>{client.thirdName}</small>
                                </td>
                              )}
                              {windowWidth > 70 + summArray(5, sizeArray) && (
                                <td width={sizeArray[4]}>
                                  <small>{client.phonNumber}</small>
                                </td>
                              )}
                              {windowWidth > 70 + summArray(6, sizeArray) && (
                                <td width={sizeArray[5]}>
                                  <small>{client.contractNumber}</small>
                                </td>
                              )}
                              {windowWidth > 70 + summArray(7, sizeArray) && (
                                <td width={sizeArray[6]}>
                                  <small>{client.contractPeriod}</small>
                                </td>
                              )}
                              {windowWidth > 70 + summArray(8, sizeArray) && (
                                <td width={sizeArray[7]}>
                                  <small>
                                    {`${moment(client.registrationDate).format(
                                      "DD.MM HH:mm"
                                    )}`}
                                  </small>
                                </td>
                              )}
                              {windowWidth > 70 + summArray(9, sizeArray) && (
                                <td width={sizeArray[8]}>
                                  <small>{client.adress}</small>
                                </td>
                              )}
                              {windowWidth > 70 + summArray(10, sizeArray) && (
                                <td width={sizeArray[9]}>
                                  <small>{client.incomingSourse}</small>
                                </td>
                              )}
                              {windowWidth > 70 + summArray(11, sizeArray) && (
                                <td width={sizeArray[10]}>
                                  <small>{client.dateOfSignContract}</small>
                                </td>
                              )}
                              {windowWidth > 70 + summArray(12, sizeArray) && (
                                <td width={sizeArray[11]}>
                                  <small className="negotiationsResult">
                                    {client.negotiationsResult}
                                  </small>
                                </td>
                              )}
                              {/* {windowWidth > 1201 && (
                                    <td width="90">
                                      <small className={clientType}>ТО1: </small>
                                      <small className={typeRouteTO1}>
                                        {TO1}
                                      </small>
                                    </td>
                                  )}
                                */}
                            </tr>
                          </tbody>
                        </table>
                        <div>
                          <button
                            type="button"
                            className={`btn btn-outline-danger btn-sm deleteCarBtn ${openDeleteButtonClass}`}
                            onClick={() => {
                              setId(client.id);
                              setFunct("removeCar");
                              setModalText(dataWarningText);
                              setModalClass();
                            }}
                          >
                            &times;
                          </button>
                          <button
                            type="button"
                            className={`btn btn-outline-secondary btn-sm deleteCarBtn ${disableDeleteButtonClass}`}
                            disabled
                          >
                            &times;
                          </button>
                          {client.openClient && (
                            <table
                              className="clientTable"
                              onClick={() => {
                                clouseClient(client);
                              }}
                            >
                              <tbody>
                                <tr align="center">
                                  <td width="200">
                                    <small className={clientType}>
                                      For close
                                    </small>
                                    {/* <small className={typeRouteКР}>{КР}</small> */}
                                  </td>
                                  {windowWidth > 247 && (
                                    <td width="100" className={clientType}>
                                      <small>Info</small>
                                    </td>
                                  )}
                                  {windowWidth > 247 && (
                                    <td width="100" className={clientType}>
                                      <small>Info</small>
                                    </td>
                                  )}
                                  {windowWidth > 247 && (
                                    <td width="100" className={clientType}>
                                      <small>Info</small>
                                    </td>
                                  )}
                                  {windowWidth > 247 && (
                                    <td width="100" className={clientType}>
                                      <small>Info</small>
                                    </td>
                                  )}
                                  {windowWidth > 247 && (
                                    <td width="100" className={clientType}>
                                      <small>Info</small>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          )}
                          {client.openClient && (
                            <CreateComponent
                              client={client}
                              clients={clients}
                              userInfo={userInfo}
                            />
                          )}
                        </div>
                      </form>
                      <form className="addingObjTable"></form>
                      {!client.openClient && (
                        <ProjectsComponent
                          client={client}
                          dates={dates}
                          payments={payments}
                          newProjects={newProjects}
                          addPayment={addPayment}
                          //closeNewRoute={closeNewRoute}
                          addProject={addProject}
                          openProject={openProject}
                          clouseProject={clouseProject}
                          removeProject={removeProject}
                          openCurrentProject={openCurrentProject}
                          clouseCurrentProject={clouseCurrentProject}
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
                          //carRoutes={carRoutes}
                          //listCarLiquids={listCarLiquids}
                          userInfo={userInfo}
                        />
                      )}
                    </li>
                  </CSSTransition>
                );
              })}
            {fun === "removeCar" && (
              <ModalBox
                modalClass={modalClass}
                modalText={textModal}
                modalFunction={setClass}
                Id={Id}
                innerFunction={removeClient}
              />
            )}
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
          </TransitionGroup>
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
      </div>
    );
  }
);
