import { AppBar, IconButton, Toolbar, Typography, Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { selectDocumentTitle } from "../../store/docSections";
import ChatBody from "../ChatBody";
import { closeChat, selectChatStatus } from "../../store/chatOpen";

export default function Chat() {
  const documentTitle = useSelector(selectDocumentTitle);
  const chatOpen = useSelector(selectChatStatus);
  const dispatch = useDispatch();

  const handleCloseChat = () => {
    dispatch(closeChat());
  };

  return (
    <Drawer
      elevation={4}
      anchor="right"
      open={chatOpen}
      onClose={handleCloseChat}
    >
      <div style={{ width: "100vw" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back to summarization"
              sx={{ mr: 2 }}
              onClick={handleCloseChat}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Inquire about {documentTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <ChatBody />
      </div>
    </Drawer>
  );
}
