import ZepetoImageStore from "../../../lib/zepetoimageStore";
import axios from "axios";

export default async function zepetoimageHandler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const getSentimental = async (requestText) => {
    try {
      const sentimentalReqData = {
        document: {
          type: "PLAIN_TEXT",
          language: "EN",
          content: requestText,
        },
        encodingType: "UTF8",
      };
      const response = await axios.post(
        `https://language.googleapis.com/v1beta2/documents:analyzeSentiment?key=${process.env.GA_APIKEY}`,
        sentimentalReqData
      );
      return response.data;
    } catch (error) {
      console.log("error = ", error);
      throw new Error(error);
    }
  };

  const getImageType = (score) => {
    if (score < 0) {
      return "negative";
    }
    if (score === 0) {
      return "neutrality";
    }
    if (score === 0) {
      return "positive";
    }
  };
  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json({ id, name: `User ${id}` });
      break;
    case "PUT":
      // Get data from your database
      ZepetoImageStore.writeImageData();
      res.status(200).json({ id, name: `User ${id}` });
      break;
    case "POST":
      // Update or create data in your database
      try {
        const resSentimental = await getSentimental(req.body.text);
        const imageType = getImageType(resSentimental.documentSentiment.score);
        const resultImages = await ZepetoImageStore.getUserImages(
          req.body.hashcode,
          imageType
        );
        //지정된 이미지 url가져오기
        res.status(200).json({ images: resultImages });
      } catch (error) {
        console.log("error = ", error);
        res.status(500).json({ message: error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
