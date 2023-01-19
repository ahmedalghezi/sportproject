


import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
};

const app = initializeApp(firebaseConfig);
console.log("initilaze firebase");
const analytics = getAnalytics(app);

function getApp() {
    return app;
}
export default getApp;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
