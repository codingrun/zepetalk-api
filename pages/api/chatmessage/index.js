import ChatMessage from "../../../lib/chatMessageStore";
import ZepetoImageStore from "../../../lib/zepetoimageStore";
import axios from "axios";

export default async function chatmessageHandler(req, res) {
  const {
    query: { id, text },
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
    } else if (score > 0) {
      return "positive";
    } else {
      return "neutrality";
    }
  };

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json({ id, name: `User ${id}` });
      break;
    case "POST":
      // Update or create data in your database
      try {
        const { text, user } = req.body;
        const resSentimental = await getSentimental(text);
        const imageType = getImageType(resSentimental.documentSentiment.score);
        const resultImages = await ZepetoImageStore.getUserImages(
          user,
          imageType
        );
        const imageData = resultImages[0] || undefined;
        await ChatMessage.writeChatMessage({
          text,
          image: imageData.url || "",
          user,
        });
        res.status(200).json({ message: "success!" });
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
