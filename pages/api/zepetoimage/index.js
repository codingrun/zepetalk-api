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

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json({ id, name: `User ${id}` });
      break;
    case "POST":
      // Update or create data in your database
      try {
        const resSentimental = await getSentimental(req.body.text);
        console.log("resSentimental = ", resSentimental);
        //지정된 이미지 url가져오기
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
