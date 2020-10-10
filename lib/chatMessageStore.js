import firebase from "../utils/firebase";

function writeChatMessage({ text, image, user }) {
  var chatData = {
    text,
    image,
    user,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  };

  const foomNumber = "room1";
  var newChatKey = firebase
    .database()
    .ref()
    .child(`chatmessage/${foomNumber}`)
    .push().key;

  var updates = {};
  updates[`/chatmessage/${foomNumber}/${newChatKey}`] = chatData;

  return firebase.database().ref().update(updates);
}

export default { writeChatMessage };
