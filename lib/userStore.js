import firebase from "../utils/firebase";

function writeUserData() {
  return firebase.database().ref("users/hashcode").set({
    username: "nametest",
    email: "email",
    profile_picture: "imageUrl",
  });
}

export default { writeUserData };
