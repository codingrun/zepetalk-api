import axios from "axios";
export default async function sendHandler(req, res) {
  const {
    query: { id, text },
    method,
  } = req;

  const getSetimental = async (requestText) => {
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

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json({ id, name: `User ${id}` });
      break;
    case "POST":
      // Update or create data in your database
      try {
        const resSentimental = await getSetimental(req.body.text);
        console.log("resSentimental = ", resSentimental);
        res.status(200).json(resSentimental);
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
