import { IRoute } from "@routes/route.interface";
import { lazy } from "react";

// const GroupQuestion = lazy(() => import("../pages/group-question"));
const ChatBotHomePage = lazy(() => import("../pages"));

const chatBotRoutes: IRoute[] = [
  {
    component: ChatBotHomePage,
    isPrivate: false,
    path:"/chat-bots"
  },
  {
    component: ChatBotHomePage,
    isPrivate: false,
    path:"/"
  },
];
export default chatBotRoutes;
