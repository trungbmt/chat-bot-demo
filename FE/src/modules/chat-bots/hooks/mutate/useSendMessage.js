import { sendMessage } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useSendMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      return await sendMessage(formData);
    },
    onSuccess: () => {
      qc.invalidateQueries(["chat-bots"]);
    },
  });
};

export default useSendMessage;
