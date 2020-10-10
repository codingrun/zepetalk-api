import ChatMessage from "../../../lib/chatMessageStore";

export default async function chatmessageHandler(req, res) {
  const {
    query: { id, text },
    method,
  } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json({ id, name: `User ${id}` });
      break;
    case "POST":
      // Update or create data in your database
      try {
        const { text, image, user } = req.body;
        await ChatMessage.writeChatMessage({ text, image, user });
        res.status(200).json({ text, image, user });
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
