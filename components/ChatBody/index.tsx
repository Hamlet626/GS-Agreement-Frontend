import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {ChangeEvent, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {selectDocumentTitle} from "../../store/pdfDocument";
import {mountModal} from "../../store/modal";

const ChatBox = styled(Box)({
    flexGrow: 1,
    overflowY: "auto",
    paddingBottom: "1rem",
});

const ChatMessageContainer = styled(Box)(({ ismine }: { ismine: boolean }) => ({
    display: "flex",
    justifyContent: ismine ? "flex-end" : "flex-start",
    marginBottom: "0.5rem",
}));

const ChatMessageBubble = styled(Box)(({ ismine }: { ismine: boolean }) => ({
    backgroundColor: ismine ? "#DCF8C6" : "#F1F0F0",
    padding: "0.5rem",
    borderRadius: "0.5rem",
}));

const ChatTextField = styled(TextField)({
    flexGrow: 1,
    marginRight: "1rem",
});

const ChatSendButton = styled(Button)({
    marginLeft: "1rem",
});

const messages = ["Hello", "Hi, how do you do.", "Fine, thank you."];

export default function ChatBody() {
    const documentTitle = useSelector(selectDocumentTitle);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<{role:string,content:string}[]>([] as {role:string,content:string}[]);
    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSendClick = async () => {
        if (inputText.trim()) {
            let newMsgs=messages.concat([{role:"user",content:inputText.trim()}]);
            setMessages(newMsgs);
            setLoading(true);
            const {data:{text,error}}=await axios.post("https://wechaty.trustus.app/gpt/contractChat",
                { fileName:documentTitle, history:newMsgs, },
                {headers: { "content-type": "application/json", "wckey":"hamlet"}})
                .catch((e)=>e.response);
            console.log(text);
            setLoading(false);
            if(error)return dispatch(mountModal({
                    status: true,
                    title: "An error happend",
                    message: error || "Unfortunately, an error happened, please try again.",
                }));
            if(text)setMessages(newMsgs.concat([{role:"assistant",content:text}]));
            // Send the message here
            setInputText("");
        }
    };

    return (
        <>
            <ChatBox>
                {messages.map((message, index) => (
                    <ChatMessageContainer key={index} ismine={message.role=="user"}>
                        <ChatMessageBubble ismine={message.role=="user"}>
                            {message.content}
                        </ChatMessageBubble>
                    </ChatMessageContainer>
                ))}
            </ChatBox>
            <Grid container component="form" onSubmit={(e) => e.preventDefault()}>
                <Grid item xs={9}>
                    <ChatTextField
                        label="Type your message here"
                        value={inputText}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <ChatSendButton
                        variant="contained"
                        onClick={handleSendClick}
                        disabled={loading||!inputText.trim()}
                    >
                        Send
                    </ChatSendButton>
                </Grid>
            </Grid>
        </>
    );
}
