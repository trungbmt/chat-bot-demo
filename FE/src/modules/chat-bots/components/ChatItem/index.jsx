import React, { useCallback, useEffect } from "react";
import ResponseItem from "../ResponseItem";
import { Avatar, Button, Popconfirm, Skeleton } from "antd";
import useSendMessage from "@modules/chat-bots/hooks/mutate/useSendMessage";
import { socket } from "@config/socketio";

import { ReloadOutlined } from "@ant-design/icons";
const ChatItem = ({ message, uuid, model }) => {
  const { mutate: sendMessageFnc, isLoading } = useSendMessage();
  const sendMessage = useCallback(() => {
    if (message) {
      sendMessageFnc({ message, socketId: socket.id, uuid, model });
    }
  }, [message, model, sendMessageFnc, uuid]);
  useEffect(() => {
    sendMessage();
  }, [sendMessage]);
  return (
    <div className="flex my-2 flex-col">
      <div className="bg-slate-200 rounded-xl p-3 ml-auto">{message}</div>
      <div>
        <Avatar>GPT</Avatar>
        <Skeleton loading={isLoading}>
          <div className="flex max-w-[70%]">
            <ResponseItem uuid={uuid} />
            <div className="my-auto">
              <Popconfirm onConfirm={sendMessage} title="Bạn có chắc chắn muốn tạo lại?">
                <Button type="text">
                  <ReloadOutlined />
                </Button>
              </Popconfirm>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default ChatItem;
