import { createBulkChatBot } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useCreateBulkChatBot = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn:async (formData) => {
      return await createBulkChatBot(formData);
    },
    onSuccess:()=>{
      qc.invalidateQueries(['chat-bots'])
    }
  });
};

export default useCreateBulkChatBot;
