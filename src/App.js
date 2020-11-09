import React, { Component } from "react";
import fire from "./config/Fire";
import firebase from "firebase";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { FirebaseState } from "./context/fiebase/FirebaseState";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { NavLink } from "react-router-dom";

import { Loader } from "./components/6_common_help_comp/Loader";
import { Navbar } from "./components/6_common_help_comp/Navbar";

const About = React.lazy(() => import("./components/1_all_login/About"));
const Login = React.lazy(() => import("./components/1_all_login/Login"));
const Register = React.lazy(() => import("./components/1_all_login/Register"));
const ForgotPassword = React.lazy(() => import("./components/1_all_login/ForgotPassword"));
const Help = React.lazy(() => import("./components/6_common_help_comp/Help"));

const Payments = React.lazy(() => import("./pages/Payments"));
const CreateNew = React.lazy(() => import("./pages/CreateNew"));
const LegalPersons = React.lazy(() => import("./pages/LegalPersons"));
const UnlegalPersons = React.lazy(() => import("./pages/UnlegalPersons"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Profile = React.lazy(() => import("./pages/Profile"));

let contentWidth = "25%";
let contentWidthNumber =
  7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
  3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
  7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
  6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
  0.1046586 * window.innerWidth +
  106.6952733;
contentWidth = `${contentWidthNumber}%`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }
  uiConfigLogin = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callBacks: {
      ignInSuccessWithAuthResult: () => false,
    },
  };
  uiConfigRegister = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callBacks: {
      ignInSuccessWithAuthResult: () => false,
    },
  };
  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    this.authListener();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  authListener() {
    fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    contentWidth = `${7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
      3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
      7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
      6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
      0.1046586 * window.innerWidth +
      106.6952733
      }%`;
    return (
      <FirebaseState>
        <BrowserRouter>
          <div className="bg-img pt-4">
            {this.state.user ? (
              <div>
                <Navbar />
                <Switch>
                  <Route
                    path={"/createnew"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <CreateNew />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/legalpersons"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <LegalPersons
                            contentWidth={contentWidth}
                            windowWidth={window.innerWidth}
                          />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/unlegalpersons"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <UnlegalPersons
                            contentWidth={contentWidth}
                            windowWidth={window.innerWidth}
                          />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/projects"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <Projects
                            contentWidth={contentWidth}
                            windowWidth={window.innerWidth}
                          />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/payments"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <Payments windowWidth={window.innerWidth} />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/profile"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <Profile
                            contentWidth={contentWidth}
                            windowWidth={window.innerWidth}
                          />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/help"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <Help windowWidth={window.innerWidth} />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Redirect from="/" to="/help" />
                </Switch>
              </div>
            ) : (
                // if state is absent
                <div>
                  <Switch>
                    <Route
                      path={"/register"}
                      render={() => {
                        return (
                          <React.Suspense
                            fallback={
                              <div>
                                <Loader />
                              </div>
                            }
                          >
                            <Register />
                            <div
                              style={{ width: contentWidth }}
                              className="fireAuthConteinerRegister"
                            >
                              <StyledFirebaseAuth
                                className="firebaseAuth"
                                uiConfig={this.uiConfigRegister}
                                firebaseAuth={firebase.auth()}
                              />
                            </div>
                          </React.Suspense>
                        );
                      }}
                    />
                    <Route
                      path={"/about"}
                      render={() => {
                        return (
                          <React.Suspense
                            fallback={
                              <div>
                                <Loader />
                              </div>
                            }
                          >
                            <About contentWidth={contentWidthNumber} />
                          </React.Suspense>
                        );
                      }}
                    />
                    <Route
                      path={"/forgotpassword"}
                      render={() => {
                        return (
                          <React.Suspense
                            fallback={
                              <div>
                                <Loader />
                              </div>
                            }
                          >
                            <ForgotPassword />
                            <div
                              style={{ width: contentWidth }}
                              className="firebaseAuthConteinerLogin"
                            >
                              <h5>Forgot password? Use "Trouble signing in!"</h5>
                              <StyledFirebaseAuth
                                className="firebaseAuth"
                                uiConfig={this.uiConfigLogin}
                                firebaseAuth={firebase.auth()}
                              />
                              <div className="signup">
                                <p></p>
                              Return to:
                              <NavLink to={"/login"}>
                                  <span>Login</span>
                                </NavLink>
                              </div>
                            </div>
                          </React.Suspense>
                        );
                      }}
                    />
                    <React.Suspense
                      fallback={
                        <div>
                          <Loader />
                        </div>
                      }
                    >
                      <Login />
                    </React.Suspense>
                  </Switch>
                </div>
              )}
          </div>
        </BrowserRouter>
      </FirebaseState>
    );
  }
}

export default App;
