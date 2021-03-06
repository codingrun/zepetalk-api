import UserStore from "../../../lib/userStore";

export default async function usermessageHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { user, target } = req.body;
        const result = await UserStore.getUserData(user);
        const result = await UserStore.writeUserData();
        //채팅 내용, 선택한 제페토 image저장
        res.status(200).json({ message: "user success" });
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
