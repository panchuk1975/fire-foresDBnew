import React from "react";

export const ShowBox = ({ modalClass, modalText, modalFunction }) => {
  let setClass = () => {
    modalFunction("modal");
  };
  return (
    <div id={modalClass}>
      <div className="showWindow">
        <div className={modalClass}>
          <div className="top-show-content">
            <button
              id="deleteShowModal"
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setClass()}
            >
              &times;
            </button>
            <p>{modalText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
