import firebase from "../utils/firebase";

function writeUserData(hashcode) {
  return firebase.database().ref(`users/${hashcode}`).set({
    username: "username",
  });
}

function getUserData(hashcode) {
  return firebase.database().ref("users").equalTo(hashcode);
}

export default { writeUserData, getUserData };
