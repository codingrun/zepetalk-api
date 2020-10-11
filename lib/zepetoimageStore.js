import firebase from "../utils/firebase";

function writeImageData() {
  //hashcode-score
  //   const tablename = "Q8QTQF-1-3";
  return firebase
    .database()
    .ref("images/QYM5G4")
    .set([
      {
        type: "negative",
        url: "QYM5G4_negative1",
      },
      {
        type: "neutrality",
        url: "QYM5G4_neutrality1",
      },
      {
        type: "positive",
        url: "QYM5G4_positive1",
      },
    ]);
}

async function getUserImages(hashcode, type) {
  const resultImages = [];
  await firebase
    .database()
    .ref(`images/${hashcode}`)
    .once("value", (snapshot) => {
      snapshot.forEach((test) => {
        const image = test.val();
        if (type === image.type) {
          resultImages.push(image);
        }
      });
      return resultImages;
    });
  return resultImages;
}

export default { writeImageData, getUserImages };
