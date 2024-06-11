


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
