import firebase from "../utils/firebase";

function writeChatMessage(hashcode) {
  return firebase.database().ref(`chatsmessage/${hashcode}`).set({
    username: "username",
  });
}

export default { writeChatMessage };
