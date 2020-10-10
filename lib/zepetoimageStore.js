import firebase from "../utils/firebase";

function writeImageData() {
  //hashcode-score
  //   const tablename = "Q8QTQF-1-3";
  return firebase
    .database()
    .ref("images/Q8QTQF")
    .set([
      {
        type: "negative",
        url: "https://render-image.zepeto.io/images/?key=39mqJ0sd03Z8WKvE7f",
      },
      {
        type: "negative",
        url: "https://render-image.zepeto.io/images/?key=39mqIZsd04ezKnOst2",
      },
      {
        type: "negative",
        url: "https://render-image.zepeto.io/images/?key=39mqKIsd05hF8zraUD",
      },
      {
        type: "neutrality",
        url: "https://render-image.zepeto.io/images/?key=39mqJ0sd05qPmwjZbp",
      },
      {
        type: "positive",
        url: "https://render-image.zepeto.io/images/?key=39mqDcsd05HGfd6GaH",
      },
      {
        type: "positive",
        url: "https://render-image.zepeto.io/images/?key=39mqEvsd05SkFL7yV2",
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
