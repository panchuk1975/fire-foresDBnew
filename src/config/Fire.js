import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

//  const config = {
//     apiKey: "AIzaSyC7upDKFTdml2k5hmyCztxlNQHOPIZwOr4",
//     authDomain: "tehsupport-react-firebase.firebaseapp.com",
//     databaseURL: "https://tehsupport-react-firebase.firebaseio.com",
//     projectId: "tehsupport-react-firebase",
//     storageBucket: "tehsupport-react-firebase.appspot.com",
//     messagingSenderId: "239751210523",
//     appId: "1:239751210523:web:0142dfefd377246be9fabe"
//   };

const config = {
  apiKey: "AIzaSyDWw9R1M3lPb4FT070s-Wqa1lsv7jiBiFg",
  authDomain: "fire-cloudefunctionsdb.firebaseapp.com",
  databaseURL: "https://fire-cloudefunctionsdb.firebaseio.com",
  projectId: "fire-cloudefunctionsdb",
  storageBucket: "fire-cloudefunctionsdb.appspot.com",
  messagingSenderId: "850311714667",
  appId: "1:850311714667:web:e273e56d9b63c68b1d9e2e",
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.store = firebase.storage();
  }
}

export default new Firebase();
