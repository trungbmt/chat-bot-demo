import { updateChatBot } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useUpdateChatBot = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn:async ({_id,formData}) => {
      return await updateChatBot(_id,formData);
    },
    onSuccess:()=>{
      
      qc.invalidateQueries(['chat-bots'])
    }
  });
};

export default useUpdateChatBot;
