


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
    apiKey: "AIzaSyCQkwvUWIgSj9mFLBgL1gzy39Ga94WT7C4",
    authDomain: "dinary-ac874.firebaseapp.com",
    databaseURL: "https://dinary-ac874.firebaseio.com",
    projectId: "dinary-ac874",
    storageBucket: "dinary-ac874.appspot.com",
    messagingSenderId: "830776009978",
    appId: "1:830776009978:web:851ae1ceadba808ccb9543",
    measurementId: "G-JDQTQ48F8D"
};



async function getApp() {
    const app = await initializeApp(firebaseConfig);
    console.log(JSON.stringify(app))
    console.log("initilaze firebase");
    const analytics = getAnalytics(app);
    return app;
}
export default getApp;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
