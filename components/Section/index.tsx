import React, { useMemo, useRef, useState } from "react";
import {
  DocumentTextArea,
  DocumentTitle,
  DocumentWrapper,
  SectionHeader,
} from "./styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { textFieldClasses } from "@mui/material/TextField";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "../../store/loaderStatus";
import axios from "axios";
import { Zoom } from "@mui/material";
import styled from "@emotion/styled";
import { setTranscription } from "../../store/pdfDocument";

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
    padding: "0.5rem",
  },
}));
export default function Section({ title, text, index }: SectionProps) {
  const [editModeOn, setEditModeOn] = useState(false);
  const [newSectionText, setNewSectionText] = useState(text);
  const sectionRef = useRef(null);
  const dispatch = useDispatch();

  const handleGetTranscription = async (
    { pageY }: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    paragraph: string
  ) => {
    try {
      dispatch(setLoading());

      await axios
        .post("/api/generate-transcription", { text: `${title} ${paragraph}` })
        .then(
          ({
            data: {
              result: { choices },
            },
          }) => {
            console.log(choices[0].text);
            dispatch(
              setTranscription({
                position: index,
                transcription: { yPosition: pageY, text: choices[0].text },
              })
            );
          }
        )
        .then(() => dispatch(unsetLoading()));
    } catch (error) {
      console.error(error);
      dispatch(unsetLoading());
    }
  };

  const handleSaveChanges = () => {
    sectionRef.current;
    setEditModeOn(false);
  };

  const sectionParagraph = useMemo(() => {
    return newSectionText.split("\n\n");
  }, [newSectionText]);

  return (
    <DocumentWrapper key={title}>
      <SectionHeader>
        <DocumentTitle>
          <b id={index.toString()}>{title}</b>
        </DocumentTitle>
        <Button
          variant="outlined"
          startIcon={<ModeEditIcon />}
          onClick={() =>
            editModeOn ? handleSaveChanges() : setEditModeOn(true)
          }
        >
          {editModeOn ? "Save" : "Edit"}
        </Button>
      </SectionHeader>
      {editModeOn ? (
        <DocumentTextArea
          ref={sectionRef}
          disabled={!editModeOn}
          value={newSectionText}
          onChange={(event) => setNewSectionText(event.target.value)}
          className={textFieldClasses.root}
        />
      ) : (
        <div>
          {sectionParagraph?.map((paragraph, index) => (
            <SectionTooltip
              title={
                !editModeOn && (
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<AutoFixHighIcon />}
                    onClick={(event) =>
                      handleGetTranscription(event, paragraph)
                    }
                  >
                    Transcription
                  </Button>
                )
              }
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 200 }}
              leaveDelay={300}
              placement="right"
              disableFocusListener={editModeOn}
              key={index}
            >
              <p>{paragraph}</p>
            </SectionTooltip>
          ))}
        </div>
      )}
    </DocumentWrapper>
  );
}
