import { deleteChatBot } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useDeleteChatBot = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn:async (_id) => {
      return await deleteChatBot(_id);
    },
    onSuccess:()=>{
      qc.invalidateQueries(['chat-bots'])
    }
  });
};

export default useDeleteChatBot;
