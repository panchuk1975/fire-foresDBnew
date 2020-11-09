import React, { memo, useState, useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { NewListLiquidsCount } from "../mathfunctions/listFunctions";
import {
  ExportReactCSV,
  agrCarExelInfo,
  carLiquidsExelInfo,
  carListLiquidsExelInfo,
} from "../mathfunctions/liquidsFunctions";
import { CreateComponent } from "./CreateComponent";
import { ModalBox } from "./ModalBox";
import { AlertBox } from "./AlertBox";
import fire from "../config/Fire";
import { ListComponent } from "./ListComponent";

export const CarAgrComp = memo(
  ({
    cars,
    dates,
    lists,
    routes,
    userInfos,
    openCar,
    closeCar,
    openNewList,
    clouseNewList,
    openNewRoute,
    closeNewRoute,
    openList,
    closeList,
    openRoute,
    closeRoute,
    windowWidth,
  }) => {
    //----------------------------Alert functions block----------------------------//
    const dataWarningText =
      "Ви намагаєтеся видалити дані! Після видалення відновлення даних буде не можливим!";
    const { removeCar, removeList } = useContext(FirebaseContext);
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
    //--------------------------------Create user data---------------------------------//
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
    //------------------------------Create cars data array------------------------------//
    cars = cars.filter((car) => car.owner === userInUse.owner);
    cars = cars.filter((car) => car.driver === "Автомобіль-агрегат");
    cars.sort(
      (a, b) => new Date(b.dateOfRegistration) - new Date(a.dateOfRegistration)
    );
    let carExists = cars.length;
    if (carExists === 0) {
      return null;
    }
    //---------------------------------Cars JSX block----------------------------------//
    return (
      <div>
        <div>
          <TransitionGroup component="ul" className="list-group">
            {carExists &&
              cars.map((car) => {
                //--------------------Create car lists and routes-----------------------//
                let newLists = lists.filter(
                  (list) => list.listOwner === car.id
                );
                newLists.sort((a, b) => a.listNumber - b.listNumber);
                let carRoutes = routes.filter(
                  (route) => route.listOwner === car.id
                );
                //---------------------------Car liquids array---------------------------//
                let listCarLiquids = NewListLiquidsCount(carRoutes);
                //-----------------------------Data for TO--------------------------------//
                let TO2 =
                  parseInt(
                    (Number(car.carIndicatorLastTO2) + Number(car.routeToTO2)) *
                      100,
                    10
                  ) / 100;
                let routeToTO2 =
                  parseInt(
                    (Number(car.carIndicatorLastTO2) +
                      Number(car.routeToTO2) -
                      Number(car.carIndicatorLast)) *
                      100,
                    10
                  ) / 100;
                let TO1 =
                  parseInt(
                    (Number(car.carIndicatorLastTO1) + Number(car.routeToTO1)) *
                      100,
                    10
                  ) / 100;
                let routeToTO1 =
                  parseInt(
                    (Number(car.carIndicatorLastTO1) +
                      Number(car.routeToTO1) -
                      Number(car.carIndicatorLast)) *
                      100,
                    10
                  ) / 100;
                let timeTO2 =
                  parseInt(
                    (Number(car.carTimeLastTO2) + Number(car.nextTimeTO2)) *
                      100,
                    10
                  ) / 100;
                let timeToTO2 =
                  parseInt(
                    (Number(car.carTimeLastTO2) +
                      Number(car.nextTimeTO2) -
                      Number(car.carTimeFinish)) *
                      100,
                    10
                  ) / 100;
                let timeTO1 =
                  parseInt(
                    (Number(car.carTimeLastTO1) + Number(car.nextTimeTO1)) *
                      100,
                    10
                  ) / 100;
                let timeToTO1 =
                  parseInt(
                    (Number(car.carTimeLastTO1) +
                      Number(car.nextTimeTO1) -
                      Number(car.carTimeFinish)) *
                      100,
                    10
                  ) / 100;
                let КР =
                  parseInt(
                    (Number(car.carIndicatorLastКР) + Number(car.routeToКР)) *
                      100,
                    10
                  ) / 100;
                let routeToКР =
                  parseInt(
                    (Number(car.carIndicatorLastКР) +
                      Number(car.routeToКР) -
                      Number(car.carIndicatorLast)) *
                      100,
                    10
                  ) / 100;
                let СР =
                  parseInt(
                    (Number(car.carIndicatorLastСР) + Number(car.routeToСР)) *
                      100,
                    10
                  ) / 100;
                let routeToСР =
                  parseInt(
                    (Number(car.carIndicatorLastСР) +
                      Number(car.routeToСР) -
                      Number(car.carIndicatorLast)) *
                      100,
                    10
                  ) / 100;
                let timeКР =
                  parseInt(
                    (Number(car.carTimeLastКР) + Number(car.nextTimeКР)) * 100,
                    10
                  ) / 100;
                let timeToКР =
                  parseInt(
                    (Number(car.carTimeLastКР) +
                      Number(car.nextTimeКР) -
                      Number(car.carTimeFinish)) *
                      100,
                    10
                  ) / 100;
                let timeСР =
                  parseInt(
                    (Number(car.carTimeLastСР) + Number(car.nextTimeСР)) * 100,
                    10
                  ) / 100;
                let timeToСР =
                  parseInt(
                    (Number(car.carTimeLastСР) +
                      Number(car.nextTimeСР) -
                      Number(car.carTimeFinish)) *
                      100,
                    10
                  ) / 100;
                //------------------------Color alert types for TO----------------------//
                let carType = null;
                if (car.serviceability === "Справний") {
                  carType = "head";
                } else {
                  carType = "carBrocken";
                }
                let typeRouteTO1 = null;
                if (car.carIndicatorLast > TO1) {
                  typeRouteTO1 = "carBrocken";
                } else {
                  typeRouteTO1 = "routeTO2";
                }
                let typeRouteTO2 = null;
                if (car.carIndicatorLast > TO2) {
                  typeRouteTO2 = "carBrocken";
                } else {
                  typeRouteTO2 = "routeTO2";
                }
                let typeTimeTO1 = null;
                if (car.carTimeFinish > timeTO1) {
                  typeTimeTO1 = "carBrocken";
                } else {
                  typeTimeTO1 = "routeTO2";
                }
                let typeTimeTO2 = null;
                if (car.carTimeFinish > timeTO2) {
                  typeTimeTO2 = "carBrocken";
                } else {
                  typeTimeTO2 = "routeTO2";
                }
                let typeRouteКР = null;
                if (car.carIndicatorLast > КР) {
                  typeRouteКР = "carBrocken";
                } else {
                  typeRouteКР = "routeTO2";
                }
                let typeRouteСР = null;
                if (car.carIndicatorLast > СР) {
                  typeRouteСР = "carBrocken";
                } else {
                  typeRouteСР = "routeTO2";
                }
                let typeTimeКР = null;
                if (car.carTimeFinish > timeКР) {
                  typeTimeКР = "carBrocken";
                } else {
                  typeTimeКР = "routeTO2";
                }
                let typeTimeСР = null;
                if (car.carTimeFinish > timeСР) {
                  typeTimeСР = "carBrocken";
                } else {
                  typeTimeСР = "routeTO2";
                }
                //--------------------------------JSX Car--------------------------------//
                return (
                  <CSSTransition key={car.id} classNames={"note"} timeout={800}>
                    <li
                      key={car.id}
                      id="carInnerLi"
                      className="list-group-item"
                    >
                      <form
                        id="carBasis"
                        className="d-flex  justify-content-start"
                      >
                        {!car.openCar && (
                          <div
                            onClick={() => {
                              openCar(car);
                            }}
                          >
                            <table className="carTable">
                              <thead></thead>
                              <tbody>
                                <tr align="center">
                                  {windowWidth > 265 && (
                                    <td width="100">
                                      <small className={carType}>
                                        {car.typeOfCar}
                                      </small>
                                    </td>
                                  )}
                                  <td width="88">
                                    <small className={carType}>
                                      {car.governmentCarNumber}
                                    </small>
                                  </td>
                                  {windowWidth > 319 && (
                                    <td width="60">
                                      <small>{car.carIndicatorLast}</small>
                                    </td>
                                  )}
                                  {windowWidth > 359 && (
                                    <td width="40">
                                      <small>{car.carTimeFinish}</small>
                                    </td>
                                  )}
                                  {windowWidth > 411 && (
                                    <td width="52">
                                      <small>{car.totalCarMileage}</small>
                                    </td>
                                  )}
                                  {windowWidth > 451 && (
                                    <td width="40">
                                      <small>{car.carTimeTotal}</small>
                                    </td>
                                  )}
                                  {windowWidth > 551 && (
                                    <td width="90">
                                      <small>{car.specialCarEquipment}</small>
                                    </td>
                                  )}
                                  {windowWidth > 770 && (
                                    <td width="110">
                                      <small>{car.carOwnerName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 995 && (
                                    <td width="90">
                                      <small className={carType}>ТО1: </small>
                                      <small className={typeRouteTO1}>
                                        {TO1}
                                      </small>
                                    </td>
                                  )}
                                  {windowWidth > 995 && (
                                    <td width="52" className={typeRouteTO1}>
                                      <small>{routeToTO1}</small>
                                    </td>
                                  )}
                                  {windowWidth > 995 && (
                                    <td width="62" className={typeTimeTO1}>
                                      <small>{timeTO1}</small>
                                    </td>
                                  )}
                                  {windowWidth > 995 && (
                                    <td width="38" className={typeTimeTO1}>
                                      <small>{timeToTO1}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1201 && (
                                    <td width="90">
                                      <small className={carType}>ТО2: </small>
                                      <small className={typeRouteTO2}>
                                        {TO2}
                                      </small>
                                    </td>
                                  )}
                                  {windowWidth > 1201 && (
                                    <td width="52" className={typeRouteTO2}>
                                      <small>{routeToTO2}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1201 && (
                                    <td width="62" className={typeTimeTO2}>
                                      <small>{timeTO2}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1201 && (
                                    <td width="38" className={typeTimeTO2}>
                                      <small>{timeToTO2}</small>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                        <div>
                          {!car.openCar &
                            !newLists.length &
                            (userInfo.company === userInfo.jointCompany) && (
                            <button
                              id="deleteCarBtn"
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => {
                                setId(car.id);
                                setFunct("removeCar");
                                setModalText(dataWarningText);
                                setModalClass();
                              }}
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      </form>
                      <form className="addingObjTableCarAgr">
                        {car.openCar && (
                          <table
                            className="carTable"
                            onClick={() => {
                              closeCar(car);
                            }}
                          >
                            <tbody>
                              <tr align="center">
                                <td width="70">
                                  <small className={carType}>КР: </small>
                                  <small className={typeRouteКР}>{КР}</small>
                                </td>
                                {windowWidth > 247 && (
                                  <td width="55" className={typeRouteКР}>
                                    <small>{routeToКР}</small>
                                  </td>
                                )}
                                {windowWidth > 327 && (
                                  <td width="70">
                                    <small className={carType}>СР: </small>
                                    <small className={typeRouteСР}>{СР}</small>
                                  </td>
                                )}
                                {windowWidth > 377 && (
                                  <td width="55" className={typeRouteСР}>
                                    <small>{routeToСР}</small>
                                  </td>
                                )}
                                {windowWidth > 477 && (
                                  <td width="80">
                                    <small className={carType}>ТО1: </small>
                                    <small className={typeRouteTO1}>
                                      {TO1}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 527 && (
                                  <td width="55" className={typeRouteTO1}>
                                    <small>{routeToTO1}</small>
                                  </td>
                                )}
                                {windowWidth > 770 && (
                                  <td width="80">
                                    <small className={carType}>ТО2: </small>
                                    <small className={typeRouteTO2}>
                                      {TO2}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 770 && (
                                  <td width="55" className={typeRouteTO2}>
                                    <small>{routeToTO2}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="70">
                                    <small className={carType}>ЧК: </small>
                                    <small className={typeTimeКР}>
                                      {timeКР}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="55" className={typeTimeКР}>
                                    <small>{timeToКР}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="80">
                                    <small className={carType}>ЧС: </small>
                                    <small className={typeTimeСР}>
                                      {timeСР}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="55" className={typeTimeСР}>
                                    <small>{timeToСР}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="80">
                                    <small className={carType}>ЧТ1: </small>
                                    <small className={typeTimeTO1}>
                                      {timeTO1}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="55" className={typeTimeTO1}>
                                    <small>{timeToTO1}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="80">
                                    <small className={carType}>ЧТ2: </small>
                                    <small className={typeTimeTO2}>
                                      {timeTO2}
                                    </small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="55" className={typeTimeTO2}>
                                    <small>{timeToTO2}</small>
                                  </td>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </form>
                      {!car.openCar && (
                        <ListComponent
                          car={car}
                          dates={dates}
                          routes={routes}
                          newLists={newLists}
                          openNewList={openNewList}
                          clouseNewList={clouseNewList}
                          openNewRoute={openNewRoute}
                          closeNewRoute={closeNewRoute}
                          openList={openList}
                          closeList={closeList}
                          openRoute={openRoute}
                          closeRoute={closeRoute}
                          windowWidth={windowWidth}
                          setAlertClass={setAlertClass}
                          setAlertText={setAlertText}
                          setFunct={setFunct}
                          setModalText={setModalText}
                          setModalClass={setModalClass}
                          setId={setId}
                          modalClass={modalClass}
                          carRoutes={carRoutes}
                          listCarLiquids={listCarLiquids}
                          userInfo={userInfo}
                        />
                      )}
                      <form>
                        {car.openCar && (
                          <CreateComponent
                            car={car}
                            cars={cars}
                            userInfo={userInfo}
                          />
                        )}
                      </form>
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
                innerFunction={removeCar}
              />
            )}
            {fun === "removeList" && (
              <ModalBox
                modalClass={modalClass}
                modalText={textModal}
                modalFunction={setClass}
                Id={Id}
                innerFunction={removeList}
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
          <ExportReactCSV
            csvData={agrCarExelInfo(cars)}
            fileName={"авто"}
            textCSV="авто.xlx"
          />
          <ExportReactCSV
            csvData={carLiquidsExelInfo(cars, lists, routes)}
            fileName={"пммАвто"}
            textCSV="пмм.xlx"
          />
          <ExportReactCSV
            csvData={carListLiquidsExelInfo(cars, lists, routes)}
            fileName={"пммЛист"}
            textCSV="листи.xlx"
          />
        </div>
      </div>
    );
  }
);
