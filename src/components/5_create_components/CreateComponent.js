import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../context/fiebase/firebaseContext";
import { AlertBox } from "../6_common_help_comp/AlertBox";
import fire from "../../config/Fire";
var moment = require("moment");

export const CreateComponent = ({ client, clients, userInfo }) => {
  //---CALL CONTEXT--------------------------->
  const firebase = useContext(FirebaseContext);
  //---ALERT BLOCK STATE---------------------->
  let [alertClass, setAlertClass] = useState("modal");
  let [alertText, setAlertText] = useState("");
  //---INITIAL CLIENT FORM-------------------->
  let initialForm = {};
  if (!client) {
    initialForm = {
      clientType: "Юрідичний",
      companyName: "",
      secName: "Іванов",
      firstName: "Іван",
      thirdName: "Іванович",
      contractNumber: "",
      adress: "Полтава",
      phonNumber: "0987896756",
      addPhonNumber: "0532678909",
      dateOfNegotiations: moment(new Date()).format("YYYY-MM-DD"),
      negotiationsResult: "Не узгоджено",
      incomingSourse: "",
      dateOfSignContract: moment(new Date()).format("YYYY-MM-DD"),
      contractPeriod: 12,
      registrationDate: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      ipNumber: "22345678865555",
      passportNumber: "АБ 345678",
      additionalInfo: "",
      openClient: false,
      openList: false,
    };
  } else {
    initialForm = {
      ...client,
      openClient: false,
      openList: false,
    };
  }
  //---INITIAL FORM STATE HENDLER-------------------->
  let [form, setForm] = useState({ ...initialForm });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.currentTarget.value });
  };
  //---CREATE CLIENT-------------------------------->
  const createHandler = (event) => {
    var owner = fire.auth.currentUser.uid;
    clients = clients.filter((client) => client.owner === owner);
    let isClientExists = !!clients.filter(
      // eslint-disable-next-line
      (client) => client.contractNumber === form.contractNumber
    ).length;
    !form.secName && setAlertText("Призвіще  обовязкове!");
    !form.secName && setAlertClass("open");
    event.preventDefault();
    if (form.secName) {
      if (!client) {
        if (!isClientExists) {
          if (userInfo.company === userInfo.jointCompany) {
            firebase
              .addClient(form)
              .then(() => {
              })
              .catch(() => {
                setAlertText("Помилка сервера!");
                setAlertClass("open");
              });
            setAlertText("Нового кліента створено!");
            setAlertClass("open");
          } else {
            setAlertText("У Вас відсутні права вносити зміни в документи!");
            setAlertClass("open");
            return;
          }
        } else {
          setAlertText(
            "Договір з таким номером вже існує! Оберіть інший або внесіть зміни!"
          );
          setAlertClass("open");
          return;
        }
        if (form.clientType === "Юрідичний") {
          setAlertText(
            "Нового кліента створено! Для перегляду перейдіть до юридичних осіб."
          );
          setAlertClass("open");
        } else if (form.clientType === "Фізичний") {
          setAlertText(
            "Нового кліента створено! Для перегляду перейдіть до фізичних осіб."
          );
          setAlertClass("open");
        } else {
          setAlertClass("modal");
        }
      } else {
        if (
          (userInfo.company === userInfo.jointCompany) &
          (userInfo.owner === client.owner)
        ) {
          firebase
            .changeClient(form)
            .then(() => { })
            .catch(() => {
              setAlertText("Ошибка сервера!");
              setAlertClass("open");
            });
          setAlertText("Інформацію скореговано!");
          setAlertClass("open");
        } else {
          setAlertText("У Вас відсутні права вносити зміни в документи!");
          setAlertClass("open");
          return;
        }
      }
      setTimeout(() => {
        setAlertClass("modal");
      }, 1500);
    }
  };
  //-----------------------------Change car basis----------------------------//
  let classClientBasis = null;
  if (!client) {
    classClientBasis = "createClientBasis";
  } else {
    classClientBasis = "modifyClientBasis";
  }
  //-------------------------------GSX car form------------------------------//
  return (
    <div className={classClientBasis}>
      <div className="clientMainForm">
        <div className="d-flex flex-wrap justify-content-between">
          <div className="form-group">
            <label htmlFor="clientType">
              <small>Оберіть статус кліента:</small>
            </label>
            <div>
              <select
                type="text"
                name="clientType"
                value={form.clientType}
                onChange={changeHandler}
                className="custom-select custom-select-sm important"
              >
                <option className="main" value="Юрідичний">
                  Юрідичний
                </option>
                <option value="Юрідичний">Юрідичний</option>
                <option value="Фізичний">Фізичний</option>
                {/* <option value="Автомобіль-агрегат">Авто-агрегат</option>
                <option value="Електроприлад">Електроприлад</option> */}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="compamyName">
              <small>Найменування  компанії</small>
            </label>
            <input
              type="text"
              className="form-control important"
              placeholder="Найменування компанії"
              value={form.companyName || ""}
              name="companyName"
              onChange={changeHandler}
            />
          </div><div className="form-group">
            <label htmlFor="secName">
              <small>Призвіще</small>
            </label>
            <input
              type="text"
              className="form-control important"
              placeholder="Призвіще"
              value={form.secName}
              name="secName"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">
              <small>Ім'я</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ім'я"
              value={form.firstName}
              name="firstName"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="thirdName">
              <small>По батькові</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="По батькові"
              value={form.thirdName}
              name="thirdName"
              onChange={changeHandler}
            // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contractNumber">
              <small>Номер договору</small>
            </label>
            <input
              type="text"
              className="form-control important"
              placeholder="Номер договору"
              value={form.contractNumber}
              name="contractNumber"
              onChange={changeHandler}
            // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adress">
              <small>Адреса</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Адреса"
              value={form.adress}
              name="adress"
              onChange={changeHandler}
            // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phonNumber">
              <small>Телефон</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Телефон"
              value={form.phonNumber}
              name="phonNumber"
              onChange={changeHandler}
            // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addPhonNumber">
              <small>Додатковтий телефон</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Додатковтий телефон"
              value={form.addPhonNumber}
              name="addPhonNumber"
              onChange={changeHandler}
            // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfNegotiations">
              <small>Дата переговорів</small>
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Дата переговорів"
              value={moment(form.dateOfNegotiations).format("YYYY-MM-DD")}
              name="dateOfNegotiations"
              onChange={changeHandler}
            // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="negotiationsResult">
              <small>Результат переговорів</small>
            </label>
            <div>
              <select
                type="text"
                name="negotiationsResult"
                value={form.negotiationsResult}
                onChange={changeHandler}
                className="custom-select custom-select-sm"
              >
                <option className="main" value="Не узгоджено">
                  Не узгоджено
                </option>
                <option value="Узгоджено">Узгоджено</option>
                <option value="В процесі">В процесі</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="incomingSourse">
              <small>Джерело надходження</small>
            </label>
            <div>
              <select
                type="text"
                name="incomingSourse"
                value={form.incomingSourse}
                onChange={changeHandler}
                className="custom-select custom-select-sm"
              >
                <option className="main" value="Телефон">
                  Телефон
                </option>
                <option value="Сайт">Сайт</option>
                <option value="Ютюб">Ютюб</option>
                <option value="Інше">Інше</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dateOfSignContract">
              <small>Дата укладання договору</small>
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Дата укладання договору"
              value={moment(form.dateOfSignContract).format("YYYY-MM-DD")}
              name="dateOfSignContract"
              onChange={changeHandler}
            // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contractPeriod">
              <small>Строк дії догшовору, міс</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Строк дії догшовору, міс"
              value={form.contractPeriod}
              name="contractPeriod"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ipNumber">
              <small>ІПН</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="ІПН"
              value={form.ipNumber}
              name="ipNumber"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passportNumber">
              <small>Серія та номер паспорту</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Серія та номер паспорту"
              value={form.passportNumber}
              name="passportNumber"
              onChange={changeHandler}
            // required
            />
          </div>
        </div>
        <div className="form-group additionalInfoConteiner">
          <label htmlFor="additionalInfo">
            <small>Додаткові дані</small>
          </label>
          <textarea
            type="text"
            className="form-control additionalInfo"
            placeholder="Додатково"
            value={form.additionalInfo}
            name="additionalInfo"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-success createSaveClientBtn"
          value="Enter"
          name="submit"
          onClick={createHandler}
        >
          {!client && "Створити нового клієнта"}
          {client && "Зберегти дані"}
        </button>
      </div>
      <AlertBox
        modalClass={alertClass}
        modalText={alertText}
        modalFunction={setAlertClass}
      />
    </div>
  );
};
