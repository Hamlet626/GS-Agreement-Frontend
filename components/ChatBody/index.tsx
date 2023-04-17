import { Container, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectDocumentTitle } from "../../store/docSections";
import { mountModal } from "../../store/modal";
import {
  ChatBox,
  ChatFieldContainer,
  ChatMessageBubble,
  ChatMessageContainer,
  ChatSendButton,
  ChatTextField,
  ChatWrapper,
} from "./styles";
import { useForm } from "react-hook-form";

export default function ChatBody() {
  const documentTitle = useSelector(selectDocumentTitle);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [] as { role: string; content: string }[]
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getFieldState,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async ({ message }: { message: string }) => {
    reset();

    if (message.trim()) {
      let newMsgs = messages.concat([
        { role: "user", content: message.trim() },
      ]);
      setMessages(newMsgs);
      setLoading(true);
      const {
        data: { text, error },
      } = await axios
        .post(
          "https://wechaty.trustus.app/gpt/contractChat",
          { fileName: documentTitle, history: newMsgs },
          { headers: { "content-type": "application/json", wckey: "hamlet" } }
        )
        .catch((e) => e.response);
      setLoading(false);
      if (error)
        return dispatch(
          mountModal({
            status: true,
            title: "An error happend",
            message:
              JSON.stringify(error) === "{}"
                ? "Unfortunately, an error happened, please try again."
                : JSON.stringify(error),
          })
        );
      if (text)
        setMessages(newMsgs.concat([{ role: "assistant", content: text }]));
    }
  };

  return (
    <>
      <ChatWrapper>
        <ChatBox>
          <Container>
            {[
              ...messages.map((message, index) => (
                <ChatMessageContainer
                  key={index}
                  ismine={message.role == "user"}
                >
                  <ChatMessageBubble ismine={message.role == "user"}>
                    {message.content}
                  </ChatMessageBubble>
                </ChatMessageContainer>
              )),
              ...(loading
                ? [
                    <ChatMessageContainer key="loading" ismine={false}>
                      <ChatMessageBubble ismine={false}>
                        <Typography variant="body2" color="text.secondary">
                          Processing...
                        </Typography>
                      </ChatMessageBubble>
                    </ChatMessageContainer>,
                  ]
                : []),
            ]}
          </Container>
        </ChatBox>
        <Container>
              <ChatFieldContainer onSubmit={handleSubmit(onSubmit)}>
                <ChatTextField
                  label="Type your message here"
                  type="text"
                  {...register("message", { required: true })}
                  error={Boolean(errors.message)}
                />
                <ChatSendButton
                  variant="contained"
                  type="submit"
                  size="large"
                  disabled={loading || !getFieldState("message")}
                >
                  Send
                </ChatSendButton>
              </ChatFieldContainer>
        </Container>
      </ChatWrapper>
    </>
  );
}
