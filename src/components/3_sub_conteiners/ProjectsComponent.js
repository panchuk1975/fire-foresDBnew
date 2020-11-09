import React, { memo } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
//import { NewListLiquidsCount } from "../mathfunctions/listFunctions";
import { CreateProject } from "../5_create_components/CreateProject";
import { SizeNameArray, ProjectDataArray } from "../../helpComponents/dataFunctions";
import { PaymentComponent } from "../4_render_components/PaymentComponent";
import fire from "../../config/Fire";
var moment = require("moment");

export const ProjectsComponent = memo(
  ({
    payments,
    client,
    dates,
    userInfo,
    newProjects,

    openProject,
    clouseProject,
    openCurrentProject,
    clouseCurrentProject,

    windowWidth,
    setAlertClass,
    setAlertText,
    setFunct,
    setModalText,
    setModalClass,
    setId,
    modalClass,
    openClientTableClass,

    carRoutes,
    //routes,
    openNewList,
    clouseNewList,
    addPayment,
    closeNewRoute,
    openList,
    closeList,
    openPayment,
    clousePayment,
    openNewPayment,
    clouseNewPayment,
    closeRoute,

    changeListRouteTime,
    //listCarLiquids,
  }) => {
    let dataListWarningText =
      "Видалення проекту! Для видалення клієнту необхідно видалити всі проекти!!!";
    let owner = fire.auth.currentUser.uid;
    let ownerDates = dates.find((date) => date.owner === owner);
    if (!ownerDates) {
      ownerDates = {
        dateStart: "1970-01-01T00:00",
        dateFinish: "2070-01-01T00:00",
      };
    }
    //let listCarLiquids = [];
    // newProjects = newProjects.filter((project) => project.progectDate >= ownerDates.dateStart);
    // newProjects = newProjects.filter(
    //   (project) => project.listDate <= ownerDates.dateFinish
    // );
    let currentClientPayments = payments.filter((pay) => pay.projectOwner === client.id);

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
    //-----------------------RENDER----------------->
    return (
      <form>
        <details>
          <summary id="summary">
            <div
              id="summaryConteiner"
              className="d-flex justify-content-between"
            >
              <small id="small">Проекти</small>
              {userInfo.company === userInfo.jointCompany && (
                <small id="small" className="smallEnd">
                  {/* {car.objectPassword} */}
                </small>
              )}
            </div>
          </summary>
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
                    <td width={sizeArray[3].size}
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
                    <td width={sizeArray[4].size}
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
                      }}
                    >
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
          <TransitionGroup component="ul" className="project-group">
            {newProjects.map((project) => {
              let currentProjectPayments = currentClientPayments.filter(
                (pay) => pay.paymentOwner === project.id
              );
              currentProjectPayments.sort((a, b) => a.payData - b.payData);
              //let listLiquids = NewListLiquidsCount(newRoutes);

              //--PROJECTS DATA ARRAY-------------------------->
              const projectDataArray = ProjectDataArray(project);
              //--DYNAMIC CLASSES ----------------------------->
              let projectReadinessDateClass = (moment(new Date(project.projectReadinessDate))
                .format("YYYY-MM-DD") >= moment(new Date())
                  .format("YYYY-MM-DD")) ? "goodTime" : "badTime";
              let signaturуOfActClass = (project.signaturуOfAct === "Так") ? "good" : "bad";
              let poketExistenceClass = (project.poketExistence === "Так") ? "good" : "bad";
              let contractExistenceClass = (project.contractExistence === "Так") ? "good" : "bad";
              //--DELETE BUTTON -->
              let openDeleteProjectButtonClass = null;
              if (project.openProject) {
                openDeleteProjectButtonClass = "deleteButtonItemAreClouse";
              }
              if (currentProjectPayments.length) {
                openDeleteProjectButtonClass = "deleteButtonItemAreClouse";
              }
              if (userInfo.company !== userInfo.jointCompany) {
                openDeleteProjectButtonClass = "deleteButtonItemAreClouse";
              }
              //--DISABLE BUTTON--->
              let disableDeleteProjectButtonClass = "deleteButtonItemAreClouse";
              if (currentProjectPayments.length) {
                disableDeleteProjectButtonClass = "";
              }
              if (userInfo.company !== userInfo.jointCompany) {
                disableDeleteProjectButtonClass = "";
              }
              if (project.openProject) {
                disableDeleteProjectButtonClass = "deleteButtonItemAreClouse";
              }
              return (
                <CSSTransition
                  key={project.id}
                  classNames={"note"}
                  timeout={800}
                >
                  <li
                    key={project.id}
                    className="project-group-item projectInnerLi"
                  >
                    {!project.openProject && (
                      <div key={project.id} className="projectBasis">
                        <div className="d-flex justify-content-between">
                          <table
                            className="projectTable"
                            onClick={() => openCurrentProject(project)}
                          >
                            <tbody>
                              <tr align="center">
                                {windowWidth > 75 + summArray(1, sizeArray) && (
                                  <td width={sizeArray[0].size} className="head">
                                    <small className="projectName"
                                    >{projectDataArray[0]}</small>
                                  </td>
                                )}
                                {windowWidth > 75 + summArray(2, sizeArray) && (
                                  <td width={sizeArray[1].size}
                                    className={`head ${projectReadinessDateClass}`}>
                                    <small className="smallProjectDateBold"
                                    >{`${moment(
                                      projectDataArray[1]
                                    ).format("DD.MM.YY")}`}</small>
                                  </td>
                                )}
                                {windowWidth > 75 + summArray(3, sizeArray) && (
                                  <td width={sizeArray[2].size}>
                                    <small
                                      className={contractExistenceClass}
                                    >{projectDataArray[2]}</small>
                                  </td>
                                )}
                                {windowWidth > 75 + summArray(4, sizeArray) && (
                                  <td width={sizeArray[3].size}>
                                    <small
                                      className={signaturуOfActClass
                                      }>{projectDataArray[3]}</small>
                                  </td>
                                )}
                                {windowWidth > 75 + summArray(5, sizeArray) && (
                                  <td width={sizeArray[4].size}>
                                    <small
                                      className={poketExistenceClass}
                                    >{projectDataArray[4]}</small>
                                  </td>
                                )}
                                {windowWidth > 75 + summArray(6, sizeArray) && (
                                  <td width={sizeArray[5].size}>
                                    <small>{projectDataArray[5]}</small>
                                  </td>
                                )}
                                {windowWidth > 75 + summArray(7, sizeArray) && (
                                  <td width={sizeArray[6].size}>
                                    <small>{projectDataArray[6]}</small>
                                  </td>
                                )}
                                {windowWidth > 75 + summArray(8, sizeArray) && (
                                  <td width={sizeArray[7].size}>
                                    <small>{projectDataArray[7]}</small>
                                  </td>
                                )}
                                {windowWidth > 75 + summArray(9, sizeArray) && (
                                  <td width={sizeArray[8].size} className="head">
                                    <small>{`${moment(
                                      projectDataArray[8]
                                    ).format("DD.MM.YY")}`}</small>
                                  </td>
                                )}
                                {windowWidth > 75 + summArray(10, sizeArray) && (
                                  <td width={sizeArray[9].size}>
                                    <small>{projectDataArray[9]}</small>
                                  </td>
                                )}
                                {windowWidth >
                                  75 + summArray(11, sizeArray) && (
                                    <td width={sizeArray[10].size}>
                                      <small>{projectDataArray[10]}</small>
                                    </td>
                                  )}
                                {windowWidth >
                                  75 + summArray(12, sizeArray) && (
                                    <td width={sizeArray[11].size}>
                                      <small>
                                        {projectDataArray[11]}
                                      </small>
                                    </td>
                                  )}
                                {windowWidth >
                                  75 + summArray(13, sizeArray) && (
                                    <td width={sizeArray[12].size}>
                                      <small>{projectDataArray[12]}</small>
                                    </td>
                                  )}
                                {windowWidth >
                                  75 + summArray(14, sizeArray) && (
                                    <td width={sizeArray[13].size}>
                                      <small>{projectDataArray[13]}</small>
                                    </td>
                                  )}
                              </tr>
                            </tbody>
                          </table>  
                          <button
                             type="button"
                            className={`btn btn-outline-danger btn-sm deleteProjectBtn ${openDeleteProjectButtonClass}`}
                            onClick={() => {
                              setId(project.id);
                              setFunct("removeList");
                              setModalText(dataListWarningText);
                              setModalClass();
                            }}
                          >
                            &times;
                          </button>
                          <button
                            type="button"
                            className={`bbtn btn-outline-secondary btn-sm deleteProjectBtn ${disableDeleteProjectButtonClass}`}
                            disabled
                          >
                            &times;
                          </button>
                          {/* {!project.openProject &
                            !currentProjectPayments.length &
                            (userInfo.company === userInfo.jointCompany) &
                            (userInfo.owner === client.owner) && (
                              <button
                                id="deleteProjectBtn"
                                type="button"
                                className="btn btn-outline-danger btn-sm deleteProjectBtn"
                                onClick={() => {
                                  setId(project.id);
                                  setFunct("removeList");
                                  setModalText(dataListWarningText);
                                  setModalClass();
                                }}
                              >
                                Х
                              </button>
                            )} */}
                        </div>
                      </div>
                    )}
                    <div>
                      <div
                        className="clouseProjectBasis"
                        onClick={() => clouseCurrentProject(project)}
                      >
                        {project.openProject && (
                          <table className="clouseProjectForm">
                            <tbody>
                              <tr className="clouseProjectTableButton">
                                <td>Закрити форму проекта</td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </div>
                      {project.openProject && (
                        <CreateProject
                          className={openClientTableClass}
                          client={client}
                          project={project}
                          setAlertText={setAlertText}
                          setAlertClass={setAlertClass}
                          newProjects={newProjects}
                          userInfo={userInfo}
                        />
                      )}
                    </div>
                    <PaymentComponent
                      client={client}
                      payments={payments}
                      project={project}
                      setId={setId}
                      currentProjectPayments={currentProjectPayments}
                      //newCarRoutes={newCarRoutes}
                      openPayment={openPayment}
                      clousePayment={clousePayment}
                      openNewPayment={openNewPayment}
                      clouseNewPayment={clouseNewPayment}
                      addPayment={addPayment}
                      //closeNewRoute={closeNewRoute}
                      setFunct={setFunct}
                      setModalClass={setModalClass}
                      setModalText={setModalText}
                      windowWidth={windowWidth}
                      setAlertText={setAlertText}
                      setAlertClass={setAlertClass}
                      //listLiquids={listLiquids}
                      //changeListRouteTime={changeListRouteTime}
                      modalClass={modalClass}
                      //carRoutes={carRoutes}
                      //clouseNewList={clouseNewList}
                      userInfo={userInfo}
                    />
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
          {/* <div id="countRoutesGroup" className="d-flex justify-content-between">
            {windowWidth > 995 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquids">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headStart"> {liquid.balanceStart}</small>
                  </pre>
                );
              })}
            {windowWidth > 512 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquids">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headAdd"> {liquid.received}</small>
                  </pre>
                );
              })}
            {windowWidth > 770 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquids">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headExpended"> {liquid.expended}</small>
                  </pre>
                );
              })}
            {windowWidth > 335 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquids">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headEnd"> {liquid.balanceFinish}</small>
                  </pre>
                );
              })}
          </div> */}
          <div className="d-flex justify-content-between projectButtonsGrup">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm addProjectBtn"
              onClick={() => openProject(client)}
              style={{ marginRight: 4 }}
            >
              + Проект
            </button>
            <button
              type="button"
              className="btn btn-outline-info btn-sm closeProjectBtn"
              onClick={() => clouseProject(client)}
              style={{ marginRight: 4 }}
            >
              Закрити
            </button>
          </div>
          {client.openProject && (
            <CreateProject
              client={client}
              setAlertText={setAlertText}
              setAlertClass={setAlertClass}
              newProjects={newProjects}
              userInfo={userInfo}
            />
          )}
        </details>
      </form>
    );
  }
);
