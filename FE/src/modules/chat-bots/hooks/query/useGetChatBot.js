import { getChatBot } from "../../services/index";
import { useQuery } from "react-query";

const useGetChatBot = (query) => {
  return useQuery({
    queryKey:["chat-bots",query],
    queryFn:async () => {
      return await getChatBot(query);
    }
  });
};

export default useGetChatBot;
