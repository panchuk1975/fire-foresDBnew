import React, { useContext, useState, memo } from "react";
import { NavLink } from "react-router-dom";
import fire from "../../config/Fire";
import { FirebaseContext } from "../../context/fiebase/firebaseContext";
const newLogo = require("../../pictures/newLogo.png");

export const Navbar = memo(() => {
  const [showBtn, setBtn] = useState("item");
  let logout = () => {
    fire.auth.signOut();
  };
  let setClass = () => {
    if (showBtn === "showBtn") {
      setBtn("item");
    } else {
      setBtn("showBtn");
    }
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width >= 900) {
      setBtn("item");
    }
    return showBtn;
  };
  const { changeCreate } = useContext(FirebaseContext);
  return (
    <nav>
      <div className="logo">
        <img className="logoPicture" alt="ForasLand" src={newLogo} />
      </div>
      <small className="blockBeetween"></small>
      <ul className="headerBlock">
        {/* <li className="logo">FORAS-LAND DB</li> */}
        <li className="btn">
          <i
            id="mainBtn"
            className="fa fa-bars fa-fw"
            onClick={() => setClass()}
          ></i>
        </li>
        <li className={showBtn} onClick={changeCreate}>
          <NavLink
            onClick={() => setClass()}
            className="nav-link"
            to="/createnew"
            exact
          >
            Новий
          </NavLink>
        </li>
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/legalpersons">
            Юридичні
          </NavLink>
        </li>
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/unlegalpersons">
            Фізичні
          </NavLink>
        </li>
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/projects">
            Проекти
          </NavLink>
        </li>
        {/* <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/projects">
            Резерв
          </NavLink>
        </li>*/}
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/payments">
            Проплати
          </NavLink>
        </li> 
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/profile">
            Профіль
          </NavLink>
        </li>
        <li className={showBtn}>
          <NavLink className="nav-link" to="/out" onClick={logout}>
            Вийти
          </NavLink>
        </li>
        <li className={showBtn} onClick={() => setClass()}>
          <NavLink className="nav-link" to="/help">
            ?
          </NavLink>
        </li>
      </ul>
    </nav>
  );
});
