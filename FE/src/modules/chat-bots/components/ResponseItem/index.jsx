import React, { useEffect, useState } from "react";

import { socket } from "@config/socketio";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const ResponseItem = ({ uuid }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [text, setText] = useState("");
  useEffect(() => {
    socket.on(`chat-generating-${uuid}`, (data) => {
      if (!data.isLastChunk) {
        setText((pre) => (pre += data.text));
      } else {
        setIsGenerating(false);
      }
    });
    return () => {
      socket.off(`chat-generating-${uuid}`);
    };
  }, [uuid]);
  return (
    <div className="rounded-lg p-3 bg-green-400 my-2 max-w-[70%]">
      {text}
      {isGenerating && (
        <div className="text-center">
          <Spin size="default" />
        </div>
      )}
    </div>
  );
};

export default ResponseItem;
