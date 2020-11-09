import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../context/fiebase/firebaseContext";
var moment = require("moment");

export const CreatePayment = ({
  project,
  pay,
  currentProjectPayments,
  setAlertClass,
  setAlertText,
  userInfo,
}) => {
  // if (fire.auth.currentUser) {
  //   var owner = fire.auth.currentUser.uid;
  // }
  const firebase = useContext(FirebaseContext);
  let initialForm = {};
  if (!pay) {
    // let nextNumber =
    //   Number(project.projectNumber) +
    //   Math.round((currentProjectPayments.length / 100 + 0.01) * 100) / 100;
    initialForm = {
      payNumber: "",
      payDate: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      owner: project.owner,
      projectOwner: project.projectOwner,
      paymentOwner: project.id,
      openPay: false,
    };
  } else {
    initialForm = {
      ...pay,
    };
  }
  let [form, setForm] = useState({ ...initialForm });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  currentProjectPayments.sort((a, b) => new Date(a.payDate) - new Date(b.payDate));
  const createHandler = (event) => {
    let isPayExists = !!currentProjectPayments.filter(
      // eslint-disable-next-line
      (pay) => Number(pay.payNumber) == Number(form.payNumber)
    ).length;
    !form.payDate && setAlertText("Дата проплати обовязкова!");
    !form.payNumber && setAlertText("Номер проплати обовязковий!");
    !form.payDate && setAlertClass("open");
    !form.payNumber && setAlertClass("open");
    event.preventDefault();
    if (form.payNumber) {
      if (form.payDate) {
        if (!pay) {
          if (!isPayExists) {
            if (userInfo.company === userInfo.jointCompany) {
              firebase
                .addPayment(form, project)
                .then(() => {
                  // firebase.changeListRouteTime(
                  //   form,
                  //   list,
                  //   oldRoutes,
                  //   oldTimes,
                  //   departureListDate,
                  //   arrivalListDate
                  // );
                  // firebase.addCarRouteTime(
                  //   form,
                  //   car,
                  //   oldCarRoutes,
                  //   oldCarTimes,
                  //   arrivalCarDate
                  // );
                })
                .catch(() => {
                  setAlertText("Ошибка сервера!");
                  setAlertClass("open");
                });
            } else {
              setAlertText("У Вас відсутні права вносити зміни в документи!");
              setAlertClass("open");
              return;
            }
          } else {
            setAlertText("Така проплата вже існує!");
            setAlertClass("open");
            return;
          }
        } else {
          if (userInfo.company === userInfo.jointCompany) {
            firebase
              .changePayment(form, project, pay.id)
              .then(() => {
                // firebase.rewriteListRouteTime(
                //   form,
                //   route,
                //   list,
                //   oldRoutes,
                //   oldTimes,
                //   departureListDate,
                //   arrivalListDate
                // );
                // firebase.rewriteCarRouteTime(
                //   form,
                //   route,
                //   car,
                //   oldCarRoutes,
                //   oldCarTimes,
                //   arrivalCarDate
                // );
              })
              .catch(() => {
                setAlertText("Ошибка сервера!");
                setAlertClass("open");
              });
          } else {
            setAlertText("У Вас відсутні права вносити зміни в документи!");
            setAlertClass("open");
            return;
          }
        }
        if (!pay) {
          setAlertText("Нова проплата створена!");
          setAlertClass("open");
        } else {
          setAlertText("Проплату збережено!");
          setAlertClass("open");
        }
        setTimeout(() => {
          setAlertClass("modal");
        }, 1000);
      }
    }
  };
  return (
    <div className="createPaymentStyle">
      <div>
        <div className="d-flex  flex-wrap justify-content-between">
          <div className="form-group">
            <label htmlFor="payNumber">
              <small>Номер проплати</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Номер проплати"
              value={form.payNumber}
              name="payNumber"
              onChange={changeHandler}
              required
            />
          </div>
          <div id="datetime-local" className="form-group">
            <label htmlFor="payDate">
              <small>Час проплати</small>
            </label>
            <input
              id="createRouteDate"
              type="datetime-local"
              className="form-control"
              placeholder="Час проплати"
              value={form.payDate}
              name="payDate"
              onChange={changeHandler}
              required
            />
          </div>
        </div>
      </div> 
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-success createRouteBtn"
          value="Enter"
          name="submit"
          onClick={createHandler}
        >
          {!pay && "Створити нову проплату"}
          {pay && "Зберегти дані"}
        </button>
      </div>
    </div>
  );
};
