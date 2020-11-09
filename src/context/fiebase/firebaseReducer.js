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

const handlers = {
  //---COMMON FUNCTIONS------------------------------------>
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),

  [ADD_DATES]: (state, { payload }) => ({
    ...state,
    dates: [...state.dates, payload],
  }),
  [CHANGE_DATES]: (state, { payload }) => ({
    ...state,
    dates: state.dates
      .filter((date) => date.owner !== payload.owner)
      .concat([payload]),
  }),
  [FETCHED_DATES]: (state, { payload }) => ({
    ...state,
    dates: payload,
  }),
  [REMOVE_DATES]: (state, { payload }) => ({
    ...state,
    dates: state.dates.filter((date) => date.id !== payload),
  }),

  [FETCHED_USERINFO]: (state, { payload }) => ({
    ...state,
    userInfos: payload,
  }),
  [ADD_USERINFO]: (state, { payload }) => ({
    ...state,
    userInfos: [...state.userInfos, payload],
  }),
  [REMOVE_USERINFOS]: (state, { payload }) => ({
    ...state,
    userInfos: state.userInfos.filter((info) => info.id !== payload),
  }),
  [CHANGE_USERINFO]: (state, { payload }) => ({
    ...state,
    userInfos: state.userInfos
      .filter((info) => info.id !== payload.id)
      .concat([payload]),
  }),

  //---CLIENTS STATE--------------------------------------->
  [ADD_CLIENT]: (state, { payload }) => ({
    ...state,
    clients: [...state.clients, payload],
  }),
  [CHANGE_CLIENT]: (state, { payload }) => ({
    ...state,
    clients: state.clients
      .filter((client) => client.id !== payload.id)
      .concat([payload]),
  }),
  [FETCH_CLIENTS]: (state, { payload }) => ({
    ...state,
    clients: payload,
    loading: false,
  }),
  [REMOVE_CLIENT]: (state, { payload }) => ({
    ...state,
    clients: state.clients.filter((client) => client.id !== payload),
  }),

  //---PROJECTS STATE--------------------------------------->
  [ADD_PROJECT]: (state, { payload }) => ({
    ...state,
    projects: [...state.projects, payload],
  }),
  [CHANGE_PROJECT]: (state, { payload }) => ({
    ...state,
    projects: state.projects
      .filter((project) => project.id !== payload.id)
      .concat([payload]),
  }),
  [CHANGE_PROJECTFORM]: (state, { payload }) => ({
    ...state,
    clients: state.clients
      .filter((client) => client.id !== payload.id)
      .concat([payload]),
  }),
  [FETCH_PROJECTS]: (state, { payload }) => ({
    ...state,
    projects: payload,
    loading: false,
  }),
  [REMOVE_PROJECT]: (state, { payload }) => ({
    ...state,
    projects: state.projects.filter((project) => project.id !== payload),
    loading: false,
  }),
  //---PAYMENTS STATE------------------------------------->
  [ADD_PAYMENT]: (state, { payload }) => ({
    ...state,
    payments: [...state.payments, payload],
  }),
  [CHANGE_PAYMENT]: (state, { payload }) => ({
    ...state,
    payments: state.payments
      .filter((pay) => pay.id !== payload.id)
      .concat([payload]),
  }),
  [CHANGE_PAYMENTFORM]: (state, { payload }) => ({
    ...state,
    projects: state.projects
      .filter((project) => project.id !== payload.id)
      .concat([payload]),
  }),
  [FETCH_PAYMENTS]: (state, { payload }) => ({
    ...state,
    payments: payload,
    loading: false,
  }),
  [REMOVE_PAYMENT]: (state, { payload }) => ({
    ...state,
    payments: state.payments.filter((pay) => pay.id !== payload),
  }),
  DEFAULT: (state) => state,
};

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
