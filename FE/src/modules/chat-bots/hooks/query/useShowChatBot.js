import { showChatBot } from "../../services/index";
import { useQuery } from "react-query";

const useShowChatBot = (query) => {
  return useQuery(["detail-chat-bots",query], async () => {
    return await showChatBot(query);
  });
};

export default useShowChatBot;
