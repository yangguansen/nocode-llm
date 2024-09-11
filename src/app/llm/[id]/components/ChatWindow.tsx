import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { ReactFlowJsonObject } from "@xyflow/react";

import { Message, continueConversation } from "../../../actions";
import { readStreamableValue } from "ai/rsc";

interface ChatWindowProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  flowJson: ReactFlowJsonObject | undefined;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  open,
  setOpen,
  flowJson,
}) => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  if (!open) return null;

  return (
    <div className="fixed right-0 w-[500px] shadow-lg shadow-gray-300/50 h-full bg-gray-50 flex flex-col">
      <div className="flex items-center justify-between p-2 bg-white shadow-lg shadow-gray-100/50">
        <span>Chat Preview</span>
        <IconButton
          sx={{
            width: "50px",
            height: "50px",
          }}
          onClick={() => {
            setOpen(false);
          }}
        >
          <ArrowCircleRightOutlinedIcon />
        </IconButton>
      </div>

      <div className="p-4 flex flex-1 flex-col">
        <div className="flex-1">
          {conversation.map((message, index) => (
            <div key={index}>
              {message.role}: {message.content}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            className="flex-1 mr-4 border border-slate-500 rounded pl-2"
            type="text"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={async () => {
              const { messages, newMessage } = await continueConversation(
                [...conversation, { role: "user", content: input }],
                flowJson
              );

              let textContent = "";

              for await (const delta of readStreamableValue(newMessage)) {
                textContent = `${textContent}${delta}`;

                setConversation([
                  ...messages,
                  { role: "assistant", content: textContent },
                ]);
              }

              setInput("");
            }}
            sx={{
              background: "#000",
            }}
          >
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};
