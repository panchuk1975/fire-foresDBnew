import React, { memo, useState, useContext } from "react";
import { FirebaseContext } from "../../context/fiebase/firebaseContext";
import { ModalBox } from "../6_common_help_comp/ModalBox";
import { AlertBox } from "../6_common_help_comp/AlertBox";
import { ExportReactCSV } from "../../mathfunctions/liquidsFunctions";

var moment = require("moment");

export const PaymentsRend = memo(
  ({
    ownerDates,
    ownerInitialDates,
    liquidWidth,
    ownerAllPayments,
    //ownerAllProjects,
  }) => {
    const firebase = useContext(FirebaseContext);
    let [modalClass, setClass] = useState("modal");
    let [textModal, setModalText] = useState();
    let [Id, setId] = useState();
    let setModalClass = () => {
      if ((modalClass = "modal")) {
        setClass("open");
      } else {
        setClass("modal");
      }
    };
    let [alertClass, setAlertClass] = useState("modal");
    let [alertText, setAlertText] = useState("");
    let [form, setForm] = useState({
      ...ownerInitialDates,
    });
    if (Object.keys(form).length === 0) {
      form = JSON.parse(localStorage.getItem("date"));
    } else {
      localStorage.setItem("date", JSON.stringify(form));
    }
    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
      console.log(event.target.name, event.target.value);
    };
    // //------------------------Set deleted Data-----------------------//
    // let holdTime = new Date();
    // let requiredHoldTime = new Date();
    // holdTime.setMonth(holdTime.getMonth() - Number(form.dateOfEnd));
    // requiredHoldTime.setMonth(holdTime.getMonth() - 36);
    // //----------------------Set deleted old Items--------------------//
    // let routesForRemove = [];
    // let listsForRemove = [];
    // if (Number(form.dateOfEnd) > 36) {
    //   routesForRemove = ownerAllRoutes.filter(
    //     (route) => Date.parse(route.routArrival) < Date.parse(requiredHoldTime)
    //   );
    //   if (routesForRemove.length === 0) {
    //     routesForRemove = ownerAllRoutes.filter(
    //       (route) => Date.parse(route.routDate) < Date.parse(requiredHoldTime)
    //     );
    //   }
    //   listsForRemove = ownerAllLists.filter(
    //     (list) => Date.parse(list.listDate) < Date.parse(requiredHoldTime)
    //   );
    // } else {
    //   routesForRemove = ownerAllRoutes.filter(
    //     (route) => Date.parse(route.routArrival) < Date.parse(holdTime)
    //   );
    //   if (routesForRemove.length === 0) {
    //     routesForRemove = ownerAllRoutes.filter(
    //       (route) => Date.parse(route.routDate) < Date.parse(holdTime)
    //     );
    //   }
    //   listsForRemove = ownerAllLists.filter(
    //     (list) => Date.parse(list.listDate) < Date.parse(holdTime)
    //   );
    // }
    //----------------------------Set Date---------------------------//
    const createHandler = (event) => {
      event.preventDefault();
      // if (routesForRemove.length !== 0) {
      //   setId(event);
      //   setModalText(dataWarningText);
      //   setModalClass();
      // }
      // if (listsForRemove.length !== 0) {
      //   setId(event);
      //   setModalText(dataWarningText);
      //   setModalClass();
      // }
      if (!ownerDates) {
        firebase
          .addDates({ ...form })
          .then(() => { })
          .catch(() => {
            console.log("Error");
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Дату встановлено!");
        setAlertClass("open");
      } else {
        firebase
          .changeDates({ ...form, id: ownerDates.id })
          .then(() => { })
          .catch(() => {
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Дату змінено!");
        setAlertClass("open");
      }
      setTimeout(() => {
        setAlertClass("modal");
      }, 1000);
    };
    //------------------------Delete Old Data-----------------------//
    const deleteHandler = (event) => {
      event.preventDefault();
      // routesForRemove.forEach((element) => {
      //   firebase
      //     .removeRoute(element.id)
      //     .then(() => {})
      //     .catch(() => {
      //       setAlertText("Ошибка сервера!");
      //       setAlertClass("open");
      //     });
      //   setAlertText("Маршрути успішно видалено!");
      //   setAlertClass("open");
      // });
      // listsForRemove.forEach((element) => {
      //   firebase
      //     .removeList(element.id)
      //     .then(() => {})
      //     .catch(() => {
      //       setAlertText("Ошибка сервера!");
      //       setAlertClass("open");
      //     });
      //   setAlertText("Застарілі дані успішно видалено!");
      //   setAlertClass("open");
      // });
      // setTimeout(() => {
      //   setAlertClass("modal");
      // }, 1000);
    };
    let  newClientPaymentInfo = [];
    // let dataWarningText =
    //   "У вас є застарілі дані, необхідно видалити їх та звільніти місце!";
    let dataWarningThanksText =
      "Дякуємо за видалення застарілих даних, ви звільнили додаткове місце!";
    return (
      <div>
        <div id="2345" className="createTimeBasis">
          <div className="d-flex flex-wrap justify-content-around">
            <div className="form-group">
              <label htmlFor="dateStart">
                <small>Початкова дата</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Початкова дата"
                value={moment(form.dateStart).format("YYYY-MM-DD")}
                name="dateStart"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateFinish">
                <small>Кінцева дата</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Кінцева дата"
                value={moment(form.dateFinish).format("YYYY-MM-DD")}
                name="dateFinish"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfEnd">
                <small>Час зберігання,міс</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Період зберігання,міс"
                value={form.dateOfEnd}
                name="dateOfEnd"
                onChange={changeHandler}
              />
            </div>
            <div className="createDateBtnConteiner">
              <button
                className="btn btn-success createDateBtn"
                value="Дата"
                name="submit"
                onClick={createHandler}
              >
                <small>Зберегти</small>
              </button>
            </div>
            <div className="createDateBtnConteiner">
              <button
                className="btn btn-danger createDateBtn"
                value="Дата"
                name="submit"
                onClick={(event) => {
                  setId(event);
                  setModalText(dataWarningThanksText);
                  setModalClass();
                }}
              >
                <small>Очистити</small>
              </button>
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-wrap justify-content-around payments-conteiner"
        >
          <div className="createPaymentsHeadBasis">
            <table className="allPaymentTable">
              <tbody>
                <tr>
                  <td>
                    <small className="paymentNumber">№</small>
                  </td>
                  <td>
                    <small className="paymentData">Дата</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {ownerAllPayments.map((pay) => {
            // ownerRoutes.sort((a, b) => a.routeDate - b.routeDate);
            // let liquidDensities = CountStartDensity(ownerRoutes, pay);
            // let firstDensity = Number(liquidDensities[0]);
            // if (!firstDensity) {
            //   firstDensity = 1;
            // }
            // let endDensity = Number(
            //   liquidDensities[liquidDensities.length - 1]
            // );
            // if (!endDensity) {
            //   endDensity = 1;
            // }
            // let balanceStartWeight =
            //   parseInt(pay.balanceStart * firstDensity * 100) / 100;
            // let balanceReceivedWeight =
            //   parseInt(pay.received * endDensity * 100) / 100;
            // let balanceExpendedWeight =
            //   parseInt(pay.expended * endDensity * 100) / 100;
            // let balanceFinishWeight =
            //   parseInt(pay.balanceFinish * endDensity * 100) / 100;
            // if (pay.name === "") {
            //   return null;
            // }
            let newProjectPayment = {};
            newProjectPayment = {
              "№ проплати": pay.payNumber,
              "Дата проплати": pay.payDate,
            };
            newClientPaymentInfo =  newClientPaymentInfo.concat(newProjectPayment);
            return (
              <div
                key={pay.id}
                className="createPaymentsHeadBasis" 
                width={{ liquidWidth }}
              >
                <div>
                  <table className="allPaymentTable">
                    <tbody>
                      <tr>
                        <td>
                          <small className="paymentNumber">
                            {pay.payNumber}
                          </small>
                        </td>
                        <td>
                          <small className="paymentData">
                            {pay.payDate}
                          </small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
        <ExportReactCSV
          csvData={newClientPaymentInfo}
          fileName={"Проплати"}
          textCSV="EXEL"
        />
        <ModalBox
          modalClass={modalClass}
          modalText={textModal}
          modalFunction={setClass}
          Id={Id}
          innerFunction={deleteHandler}
        />
        <AlertBox
          modalClass={alertClass}
          modalText={alertText}
          modalFunction={setAlertClass}
        />
      </div>
    );
  }
);
