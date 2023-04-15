import { styled } from "@mui/material/styles";
import { Box, Button, TextField } from "@mui/material";

export const ChatBox = styled("div")({
  height: "80vh",
  overflowY: "auto",
  padding: "1rem 0",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#F1F0F0",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#D9986F",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#D9986F",
  },
});

export const ChatMessageContainer = styled(Box)(
  ({ ismine }: { ismine: boolean }) => ({
    display: "flex",
    justifyContent: ismine ? "flex-end" : "flex-start",
    marginBottom: "0.5rem",
  })
);

export const ChatMessageBubble = styled(Box)(
  ({ ismine }: { ismine: boolean }) => ({
    backgroundColor: ismine ? "#DCF8C6" : "#F1F0F0",
    margin: ismine ? "0 0 0 30px" : "0 30px 0 0",
    padding: "0.5rem",
    borderRadius: "0.5rem",
  })
);

export const ChatTextField = styled(TextField)({
  flex: 1,
});

export const ChatSendButton = styled(Button)({
  height: "56px",
});

export const ChatFieldContainer = styled("form")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.5rem 0",
  gap: "1rem",
});

export const ChatWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "space-between",
});
