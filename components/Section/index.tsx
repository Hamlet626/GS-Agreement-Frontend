import React, { useRef } from "react";
import {
  DocumentText,
  DocumentTitle,
  DocumentWrapper,
  TooltipButtonsWrapper,
} from "./styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "../../store/loaderStatus";
import axios from "axios";
import { Zoom } from "@mui/material";

interface SectionProps {
  title: string;
  text: string;
  index: number;
}
const SectionTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff",
    color: "#0c273a",
    boxShadow: "0 0 10px #0c273a50",
    maxWidth: 220,
    padding: "1rem",
    marginLeft: "-2rem",
  },
}));

export default function Section({ title, text, index }: SectionProps) {
  const sectionRef = useRef(null);
  const dispatch = useDispatch();

  const handleGetTranscription = async () => {
    try {
      dispatch(setLoading());

      await axios
        .post("/api/generate-transcription", { text: `${title} ${text}` })
        .then(({ data }) => {
          // dispatch(setTranscriptions(data));
        })
        .then(() => dispatch(unsetLoading()));
    } catch (error) {
      console.error(error);
      dispatch(unsetLoading());
    }
  };

  return (
    <SectionTooltip
      title={
        <TooltipButtonsWrapper>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<AutoFixHighIcon />}
            onClick={handleGetTranscription}
          >
            Transcription
          </Button>
          <Button variant="outlined" fullWidth startIcon={<ModeEditIcon />}>
            Edit Section
          </Button>
        </TooltipButtonsWrapper>
      }
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 300 }}
      leaveDelay={500}
      placement="right"
    >
      <DocumentWrapper key={title}>
        <DocumentTitle>
          <b id={index.toString()}>{title}</b>
        </DocumentTitle>
        <DocumentText ref={sectionRef} disabled value={text} />
      </DocumentWrapper>
    </SectionTooltip>
  );
}
