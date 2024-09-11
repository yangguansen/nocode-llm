import { useState } from "react";

import { IconButton } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { ReactFlowInstance, ReactFlowJsonObject } from "@xyflow/react";

import { ChatWindow } from "./ChatWindow";

interface ChatToggleProps {
  rfInstance: ReactFlowInstance | null;
}

export const ChatToggle: React.FC<ChatToggleProps> = ({ rfInstance }) => {
  const [chatWindowOpen, setChatWindowOpen] = useState(false);
  const [flowJson, setFlowJson] = useState<ReactFlowJsonObject>();
  return (
    <>
      <div className="fixed bottom-8 right-8">
        <IconButton
          sx={{
            width: "50px",
            height: "50px",
            background: "blue",
            color: "#fff",
          }}
          disableRipple
          onClick={() => {
            if (rfInstance) {
              const flow = rfInstance.toObject();
              setFlowJson(flow);
            }

            setChatWindowOpen(true);
          }}
        >
          <ForumIcon />
        </IconButton>
      </div>
      <ChatWindow
        open={chatWindowOpen}
        setOpen={setChatWindowOpen}
        flowJson={flowJson}
      />
    </>
  );
};
