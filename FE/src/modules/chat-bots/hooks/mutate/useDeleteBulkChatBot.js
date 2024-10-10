import { deleteBulkChatBot } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useDeleteBulkChatBot = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn:async (formData) => {
      return await deleteBulkChatBot(formData);
    },
    onSuccess:()=>{
      qc.invalidateQueries(['chat-bots'])
    }
  });
};

export default useDeleteBulkChatBot;
