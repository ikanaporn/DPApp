import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyBD1fnuh8wekft44Do3LH0W6LA0ksRhRBQ",
    authDomain: "depression-58a60.firebaseapp.com",
    databaseURL: "https://depression-58a60.firebaseio.com",
    projectId: "depression-58a60",
    storageBucket: "depression-58a60.appspot.com",
    messagingSenderId: "206891501632",
    appId: "1:206891501632:web:7cbb8068c1f5a1918537a5",
    measurementId: "G-8ZSJ8PC4GQ"
};
export default class myFirebase {
    static init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }
}