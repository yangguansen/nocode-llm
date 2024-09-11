import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { ReactFlowInstance } from "@xyflow/react";

interface SaveFlowButtonProps {
  rfInstance: ReactFlowInstance | null;
}

export const SaveFlowButton: React.FC<SaveFlowButtonProps> = ({
  rfInstance,
}) => {
  return (
    <>
      <div className="fixed top-8 right-8">
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
              console.log("Save to DB: ", flow);

              //  Perform validate nodes flow, like check if has required model, if has repeated node.

              // Save to DB
            }
          }}
        >
          <SaveIcon />
        </IconButton>
      </div>
    </>
  );
};
