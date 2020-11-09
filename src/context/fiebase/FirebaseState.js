import React, { useReducer } from "react";
import fire from "../../config/Fire";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import {
  SHOW_LOADER,

  ADD_DATES,
  CHANGE_DATES,
  REMOVE_DATES,
  FETCHED_DATES,
  
  ADD_USERINFO,
  CHANGE_USERINFO,
  FETCHED_USERINFO,
  REMOVE_USERINFOS,

  ADD_CLIENT,
  CHANGE_CLIENT,
  REMOVE_CLIENT,
  FETCH_CLIENTS,

  ADD_PROJECT,
  CHANGE_PROJECT,
  CHANGE_PROJECTFORM,
  REMOVE_PROJECT,
  FETCH_PROJECTS,
 
  ADD_PAYMENT,
  CHANGE_PAYMENT,
  CHANGE_PAYMENTFORM,
  REMOVE_PAYMENT,
  FETCH_PAYMENTS,
} from "../types";

export const FirebaseState = ({ children }) => {
  //-----------------------Get Car Owner ID = userID-----------------------//
  if (fire.auth.currentUser) {
    var owner = fire.auth.currentUser.uid;
  }
  //-------------------------------Init State------------------------------//
  const initialState = {
    clients: [],
    projects: [],
    payments: [],
    dates: [],
    userInfos: [],
    loading: false,
    create: false,
    writeInfo: false,
  };
   //--- USE USEREDUSER FROM REACT------------------->
   const [state, dispatch] = useReducer(firebaseReducer, initialState);
   //----COMMON LOADER----->
   const showLoader = () => dispatch({ type: SHOW_LOADER });
   //---USE PERIOD DATE FUNCTIONS------------------------------------------->
   const addDates = async (newDates) => {
     console.log(newDates);
     const dates = {
       ...newDates,
       owner,
     };
     console.log(dates);
     try {
       await fire.db
         .collection("dates")
         .add(dates)
         .catch((err) => console.log(err));
       const payload = {
         ...dates,
       };
       dispatch({
         type: ADD_DATES,
         payload,
       });
     } catch (e) {
       throw new Error(e.message);
     }
   };
   //----------------------------------------->
   const changeDates = async (newDates) => {
     const dates = {
       ...newDates,
       owner,
     };
     try {
       await fire.db
         .collection("dates")
         .doc(dates.id)
         .update(dates)
         .catch((err) => console.log(err));
       const payload = {
         ...dates,
       };
       dispatch({
         type: CHANGE_DATES,
         payload,
       });
     } catch (e) {
       throw new Error(e.message);
     }
   };
   //------------------------------------->
   const removeDates = async (id) => {
     await fire.db
       .collection("dates")
       .doc(id)
       .delete()
       .catch((err) => console.log(err));
     dispatch({
       type: REMOVE_DATES,
       payload: id,
     });
   };
   //--------------------------------->
   const fetchDates = async () => {
     showLoader();
     const res = await fire.db
       .collection("dates") //.doc(id)
       .get()
       .catch((err) => console.log(err));
     if (!res.data) {
       res.data = {};
     }
     const payload = [];
     res.forEach((doc) => {
       payload.push({ ...doc.data(), id: doc.id });
     });
     dispatch({
       type: FETCHED_DATES,
       payload,
     });
   };
  //---USER INFO FUNCTIONS--------------------------------------------------->
   const addUserInfo = async (newInfo) => {
     showLoader();
     const userInfo = {
       ...newInfo,
     };
     try {
       const res = await fire.db
         .collection("usersInfos")
         .add(userInfo)
         .catch((err) => console.log(err));
       console.log(res);
       const payload = {
         ...newInfo,
       };
       dispatch({
         type: ADD_USERINFO,
         payload,
       });
     } catch (e) {
       throw new Error(e.message);
     }
   };
   //------------------------------------------------------------------------//
   const changeUserInfo = async (newUserInfo) => {
     showLoader();
     const userInfo = {
       ...newUserInfo,
     };
     console.log(userInfo.id);
     try {
       await fire.db
         .collection("usersInfos")
         .doc(userInfo.id)
         .update(userInfo)
         .catch((err) => console.log(err));
       const payload = {
         ...userInfo,
       };
       console.log(payload);
       dispatch({
         type: CHANGE_USERINFO,
         payload,
       });
     } catch (e) {
       throw new Error(e.message);
     }
   };
   //------------------------------------------------------------------------//
   const fetchUsersInfo = async () => {
     showLoader();
     const res = await fire.db
       .collection("usersInfos") //.doc(id)
       .get()
       .catch((err) => console.log(err));
     const payload = [];
     res.forEach((doc) => {
       payload.push({ ...doc.data(), id: doc.id });
     });
     dispatch({
       type: FETCHED_USERINFO,
       payload,
     });
   };
   //-----------------------------------------------------------------------//
   const removeUserInfos = async (id) => {
     await fire.db
       .collection("usersInfos")
       .doc(id)
       .delete()
       .catch((err) => console.log(err));
     dispatch({
       type: REMOVE_USERINFOS,
       payload: id,
     });
   };
  //-CLIENT FUNCTIONS----------------------------------------------->
  const addClient = async (newClient) => {
    const client = {
      ...newClient,
      owner,
    };
    try {
      const res = await fire.db
        .collection("clients")
        .add(client)
        .catch((err) => console.log(err));
      const payload = {
        ...client,
        id: res.id,
      };
      dispatch({
        type: ADD_CLIENT,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //---CHANGE CLIENT---------------------------->
  const changeClient = async (changedClient) => {
    const client = {
      ...changedClient,
      owner,
    };
    try {
      await fire.db
        .collection("clients")
        .doc(client.id)
        .update(client)
        .catch((err) => console.log(err));
      const payload = {
        ...client,
      };
      dispatch({
        type: CHANGE_CLIENT,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //---OPEN CLIENT------------------------------->
  const openClient = async (changedClient) => {
    let client = {
      ...changedClient,
      openClient: true,
    };
    try {
      await fire.db
        .collection("clients")
        .doc(client.id)
        .update(client)
        .catch((err) => console.log(err));
      const payload = {
        ...client,
      };
      dispatch({
        type: CHANGE_CLIENT,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //---CLOUSE CLIENT------------------------------>
  const clouseClient = async (changedClient) => {
    let client = {
      ...changedClient,
      openClient: false,
    };
    try {
      await fire.db
        .collection("clients")
        .doc(client.id)
        .update(client)
        .catch((err) => console.log(err));
      const payload = {
        ...client,
      };
      dispatch({
        type: CHANGE_CLIENT,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //---REMOVE CLIENT------------------------------>
  const removeClient = async (id) => {
    await fire.db
      .collection("clients")
      .doc(id)
      .delete()
      .catch((err) => console.log(err));
    dispatch({
      type: REMOVE_CLIENT,
      payload: id,
    });
  };
  //---FETCH CLIENTS---------------------->
  const fetchClients = async () => {
    showLoader();
    const res = await fire.db
      .collection("clients")
      .get()
      .catch((err) => console.log(err));
    const payload = [];
    res.forEach((doc) => {
      payload.push({ ...doc.data(), id: doc.id });
    });
    dispatch({
      type: FETCH_CLIENTS,
      payload,
    });
  };
  //--PROJECT FUNCTIONS---------------------------------------------------->
  const addProject = async (newProject, client) => {
    let owner = newProject.owner;
    let projectOwner = newProject.projectOwner;
    if (client) {
      owner = client.owner;
      projectOwner = client.id;
    }
    const project = {
      ...newProject,
      owner,
      projectOwner,
    };
    try {
      const res = await fire.db
        .collection("projects")
        .add(project)
        .catch((err) => console.log(err));
      const payload = {
        ...project,
        id: res.id,
      };
      dispatch({
        type: ADD_PROJECT,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  // --SAVE PROJECT -------------------------->
  const changeProject = async (newProject, client, id) => {
    let owner = newProject.owner;
    let projectOwner = newProject.projectOwner;
    if (client) {
      owner = client.owner;
      projectOwner = client.id;
    }
    const project = {
      ...newProject,
      owner,
      projectOwner,
    };
    try {
      await fire.db
        .collection("projects")
        .doc(id)
        .update(project)
        .catch((err) => console.log(err));
      const payload = {
        ...project,
      };
      dispatch({
        type: CHANGE_PROJECT,
        payload,
        id,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //--OPEN CURRENT PROJECT FORM ----------------->
  const openCurrentProject = async (currentProject) => {
    let updateProject = {
      ...currentProject,
      openProject: true,
    };
    try {
      await fire.db
        .collection("projects")
        .doc(updateProject.id)
        .update(updateProject)
        .catch((err) => console.log(err));
      const payload = {
        ...updateProject,
      };
      dispatch({
        type: CHANGE_PROJECT,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //--CLOUSE NEW PROJECT FORM ----------------->
  const clouseCurrentProject = async (currentProject) => {
    let updateProject = {
      ...currentProject,
      openProject: false,
    };
    try {
      await fire.db
        .collection("projects")
        .doc(updateProject.id)
        .update(updateProject)
        .catch((err) => console.log(err));
      const payload = {
        ...updateProject,
      };
      dispatch({
        type: CHANGE_PROJECT,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
   //--OPEN NEW PROJECT FORM ----------------->
   const openProject = async (currentClient) => {
    let client = {
      ...currentClient,
      openProject: true,
    };
    try {
      await fire.db
        .collection("clients")
        .doc(client.id)
        .update(client)
        .catch((err) => console.log(err));
      const payload = {
        ...client,
      };
      dispatch({
        type: CHANGE_PROJECTFORM,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //--CLOUSE NEW PROJECT FORM ----------------->
  const clouseProject = async (currentClient) => {
    let client = {
      ...currentClient,
      openProject: false,
    };
    try {
      await fire.db
        .collection("clients")
        .doc(client.id)
        .update(client)
        .catch((err) => console.log(err));
      const payload = {
        ...client,
      };
      dispatch({
        type: CHANGE_PROJECTFORM,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //---REMOVE PROJECT ---------------------->
  const removeProject = async (id) => {
    if (id) {
      await fire.db
        .collection("projects")
        .doc(id)
        .delete()
        .catch((err) => console.log(err));
      dispatch({
        type: REMOVE_PROJECT,
        payload: id,
      });
    } else {
      return null;
    }
  };
  // ---FETCH PROJECTS -------------------->
  const fetchProjects = async () => {
    showLoader();
    const res = await fire.db
      .collection("projects")
      .get()
      .catch((err) => console.log(err));
    const payload = [];
    res.forEach((proj) => {
      payload.push({ ...proj.data(), id: proj.id });
    });
    dispatch({
      type: FETCH_PROJECTS,
      payload,
    });
  };

  
  //------------------------------------------------------------------------//
  // const changeListRouteTime = async (
  //   form,
  //   list,
  //   routeTotal,
  //   routeTotalTime,
  //   departureListDate,
  //   arrivalListDate
  // ) => {
  //   routeTotal =
  //     parseInt((routeTotal + Number(form.routeTotal)) * 100, 10) / 100;
  //   routeTotalTime =
  //     Math.round((routeTotalTime + Number(form.routTotalTime)) * 100) / 100;
  //   list = {
  //     ...list,
  //     departure: departureListDate,
  //     arrival: arrivalListDate,
  //     indicatorListFinish:
  //       parseInt((Number(list.indicatorListStart) + routeTotal) * 100, 10) /
  //       100,
  //     timeListLast:
  //       Math.round((Number(list.timeListFirst) + routeTotalTime) * 100) / 100,
  //     totalListMileage: routeTotal,
  //     timeListTotal: routeTotalTime,
  //     openRoute: false,
  //   };
  //   try {
  //     const res = await axios.patch(`${url}/lists/${list.id}.json`, list);
  //     const payload = {
  //       ...res.data,
  //     };
  //     dispatch({
  //       type: CHANGE_LIST,
  //       payload,
  //     });
  //   } catch (e) {
  //     throw new Error(e.message);
  //   }
  // };
  //---PAYMENT FUNCTIONS------------------------------------------------------>
  const addPayment = async (newPayment, project) => {
    let owner = newPayment.owner;
    let projectOwner = newPayment.projectOwner;
    let paymentOwner = newPayment.paymentOwner;
    if (project) {
      owner = project.owner;
      projectOwner = project.projectOwner;
      paymentOwner = project.id;
    }
    const payment = {
      ...newPayment,
      owner,
      projectOwner,
      paymentOwner,
    };
    try {
      const res = await fire.db
        .collection("payments")
        .add(payment)
        .catch((err) => console.log(err));
      const payload = {
        ...payment,
        id: res.id,
      };
      dispatch({
        type: ADD_PAYMENT,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //--CHANGE PAYMENT---------------------------->
  const changePayment = async (newPayment, project, id) => {
    let owner = newPayment.owner;
    let projectOwner = newPayment.projectOwner;
    let paymentOwner = newPayment.paymentOwner;
    if (project) {
      owner = project.owner;
      projectOwner = project.projectOwner;
      paymentOwner = project.id;
    }
    const payment = {
      ...newPayment,
      openPay: false,
      owner,
      projectOwner,
      paymentOwner
    };
    try {
      await fire.db
        .collection("payments")
        .doc(id)
        .update(payment)
        .catch((err) => console.log(err));
      const payload = {
        ...payment,
      };
      dispatch({
        type: CHANGE_PAYMENT,
        payload,
        id,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
   //--OPEN PAYMENT FORM----------------------->
   const openPayment = async (currentPay) => {
    let pay = {
      ...currentPay,
      openPay: true,
    };
    try {
      await fire.db
        .collection("payments")
        .doc(pay.id)
        .update(pay)
        .catch((err) => console.log(err));
      const payload = {
        ...pay,
      };
      dispatch({
        type: CHANGE_PAYMENT,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
   //--CLOUSE PAYMENT FORM----------------------->
   const clousePayment = async (currentPay) => {
    let pay = {
      ...currentPay,
      openPay: false,
    };
    try {
      await fire.db
        .collection("payments")
        .doc(pay.id)
        .update(pay)
        .catch((err) => console.log(err));
      const payload = {
        ...pay,
      };
      dispatch({
        type: CHANGE_PAYMENT,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //--OPEN PAYMENT FORM----------------------->
  const openNewPayment = async (currentProject) => {
    let project = {
      ...currentProject,
      openPayment: true,
    };
    try {
      await fire.db
        .collection("projects")
        .doc(project.id)
        .update(project)
        .catch((err) => console.log(err));
      const payload = {
        ...project,
      };
      dispatch({
        type: CHANGE_PAYMENTFORM,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
    //--CLOSE PAYMENT FORM----------------------->
    const clouseNewPayment = async (currentProject) => {
      let project = {
        ...currentProject,
        openPayment: false,
      };
      try {
        await fire.db
          .collection("projects")
          .doc(project.id)
          .update(project)
          .catch((err) => console.log(err));
        const payload = {
          ...project,
        };
        dispatch({
          type: CHANGE_PAYMENTFORM,
          payload,
        });
      } catch (e) {
        throw new Error(e.message);
      }
    };
 
  //--FETCH PAYMENTS---------------------------->
  const fetchPayments = async () => {
    showLoader();
    const res = await fire.db
      .collection("payments")
      .get()
      .catch((err) => console.log(err));
    const payload = [];
    res.forEach((pay) => {
      payload.push({ ...pay.data(), id: pay.id });
    });
    dispatch({
      type: FETCH_PAYMENTS,
      payload,
    });
  };
 //---DELETE PAYMENT---------------------------->
  const removePayment = async (id) => {
    if (id) {
      await fire.db
        .collection("payments")
        .doc(id)
        .delete()
        .catch((err) => console.log(err));
      dispatch({
        type: REMOVE_PAYMENT,
        payload: id,
      });
    } else {
      return null;
    }
  };
  //------------------------------------------------------------------------//
  return (
    <FirebaseContext.Provider
      value={{
        showLoader,

        addDates,
        changeDates,
        removeDates,
        fetchDates,

        addUserInfo,
        changeUserInfo,
        removeUserInfos,
        fetchUsersInfo,
       
        addClient,
        changeClient,
        openClient,
        clouseClient,
        removeClient,
        fetchClients,

        addProject,
        changeProject,
        openProject,
        clouseProject,
        openCurrentProject,
        clouseCurrentProject,
        removeProject,
        fetchProjects,

        addPayment,
        openPayment,
        clousePayment,
        openNewPayment,
        clouseNewPayment,
        changePayment,
        removePayment,
        fetchPayments,

        loading: state.loading,
        clients: state.clients,
        projects: state.projects,
        payments: state.payments,
        dates: state.dates,
        userInfos: state.userInfos,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
