import React, { useEffect, useRef, useState } from "react";

import { UpCircleFilled } from "@ant-design/icons";

import { useParams } from "react-router";
import { Button, Card, Form, Input, Select, Tag } from "antd";
import { v4 as uuidv4 } from "uuid";
import ChatItem from "../components/ChatItem";

const ChatBotHomePage = () => {
  const {} = useParams();
  const [input, setInput] = useState();
  const [messageList, setMessageList] = useState([]);
  const handleSubmit = () => {
    setInput("");
    const uuid = uuidv4();
    setMessageList((pre) => [...pre, { model, message: input, uuid: uuid }]);
  };
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messageList]);
  const [model, setModel] = useState("gpt-4o-mini");
  const models = [
    { value: "gpt-4o-mini", label: "GPT-4 Mini" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  ];

  return (
    <div className="p-2 flex justify-center">
      <Card
        title={
          <div>
            <Tag color="green" className="text-2xl">
              GPT
            </Tag>
          </div>
        }
        className="w-3/4 min-h-[90vh]"
        extra={
          <div>
            <Select
              value={model}
              onChange={setModel}
              className="w-auto lg:w-[200px]"
              options={models}
              placeholder="Select Model"
            ></Select>
          </div>
        }
        bodyStyle={{ padding: 0, margin: 0, border: "none" }}
      >
        <div className="w-full h-full">
          <div
            ref={chatContainerRef}
            className="p-5 max-h-[80vh] overflow-scroll"
          >
            {messageList.map((e) => {
              return <ChatItem model={e.model} uuid={e.uuid} message={e.message}></ChatItem>;
            })}
            <div className="h-[50px]"></div>
          </div>
          <div className="absolute bottom-0 w-[80%] mx-auto right-0 left-0 mb-2">
            <Input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Ask anything here!"
              suffix={
                <Button onClick={handleSubmit} type="primary">
                  <UpCircleFilled className="text-xl" />
                </Button>
              }
              className="text-xl"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatBotHomePage;
