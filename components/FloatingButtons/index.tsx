import { Wrapper } from "./styles";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { openChat } from "../../store/chatOpen";

export default function FloatingButtons() {
  const dispatch = useDispatch();

  const handleOpenChat = () => {
    dispatch(openChat());
  };

  return (
    <Wrapper>
      <Button variant="contained" color="secondary" onClick={handleOpenChat}>
        Inquire Chatbot
      </Button>
    </Wrapper>
  );
}
