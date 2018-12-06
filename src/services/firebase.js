import fb from 'firebase'

const config = {
  apiKey: "AIzaSyCzIQX83cj48IzVOGn3QlSlqEk67cmh8Xg",
  authDomain: "meal-ordering-app-7d369.firebaseapp.com",
  databaseURL: "https://meal-ordering-app-7d369.firebaseio.com",
  projectId: "meal-ordering-app-7d369",
  storageBucket: "meal-ordering-app-7d369.appspot.com",
  messagingSenderId: "1097630995398"
}

export default {
  initializeApp: () => fb.initializeApp(config),
  loginWithFacebook: (type) => {
    var provider = new fb.auth.FacebookAuthProvider()
    return fb.auth().signInWithPopup(provider)
  },
  loginWithEmail: (email, password) => fb.auth().signInWithEmailAndPassword(email, password),
  register: (email, password) => fb.auth().createUserWithEmailAndPassword(email, password)
}
