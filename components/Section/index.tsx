import React, { useEffect, useMemo, useState } from "react";
import {
  DocumentTextArea,
  DocumentTitle,
  SectionHeader,
  Transcription,
} from "./styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { textFieldClasses } from "@mui/material/TextField";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "../../store/loaderStatus";
import axios from "axios";
import { Card, CardContent, Grid, Zoom } from "@mui/material";
import styled from "@emotion/styled";

type ITranscription = {
  transcriptionText: string;
  originalParagraph: string;
};

interface SectionProps {
  title: string;
  text: string;
  index: number;
  transcriptions?: ITranscription[];
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
  const [transcriptions, setTranscriptions] = useState<ITranscription[]>([]);

  const dispatch = useDispatch();

  const handleGetTranscription = async (paragraph: string) => {
    try {
      dispatch(setLoading());

      await axios
        .post("/api/generate-transcription", { text: paragraph })
        .then(
          ({
            data: {
              result: { choices },
            },
          }) => {
            setTranscriptions([
              ...transcriptions,
              {
                transcriptionText: choices[0].text,
                originalParagraph: paragraph,
              },
            ]);
          }
        )
        .then(() => dispatch(unsetLoading()));
    } catch (error) {
      console.error(error);
      dispatch(unsetLoading());
    }
  };

  const handleSaveChanges = () => {
    setEditModeOn(false);
  };

  const sectionParagraph = useMemo(() => {
    return newSectionText.split("\n\n");
  }, [newSectionText]);

  //If the paragraph change, remove the transcription
  useEffect(() => {
    transcriptions.forEach(
      (singleTranscription, index) =>
        !sectionParagraph.includes(singleTranscription.originalParagraph) &&
        transcriptions.splice(index, 1)
    );
  }, [sectionParagraph, transcriptions]);

  return (
    <Card key={title}>
      <CardContent>
        <SectionHeader>
          <DocumentTitle>
            <b id={index.toString()}>{title}</b>
          </DocumentTitle>
          <Button
            variant={editModeOn ? "contained" : "outlined"}
            color={editModeOn ? "info" : "primary"}
            startIcon={<ModeEditIcon />}
            onClick={() =>
              editModeOn ? handleSaveChanges() : setEditModeOn(true)
            }
          >
            {editModeOn ? "Save" : "Edit"}
          </Button>
        </SectionHeader>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {editModeOn ? (
            <>
              <Grid item xs={12} sm={6}>
                <DocumentTextArea
                  disabled={!editModeOn}
                  value={newSectionText}
                  onChange={(event) => setNewSectionText(event.target.value)}
                  className={textFieldClasses.root}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {transcriptions?.map(({ transcriptionText }, index) => (
                  <Transcription key={index}>{transcriptionText}</Transcription>
                ))}
              </Grid>
            </>
          ) : (
            <>
              {sectionParagraph?.map((paragraph, index) => (
                <>
                  <Grid item xs={12} sm={6}>
                    <SectionTooltip
                      title={
                        !editModeOn && (
                          <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<AutoFixHighIcon />}
                            onClick={() => handleGetTranscription(paragraph)}
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {transcriptions?.map(
                      ({ originalParagraph, transcriptionText }, index) =>
                        originalParagraph === paragraph && (
                          <Transcription key={index}>
                            {transcriptionText}
                          </Transcription>
                        )
                    )}
                  </Grid>
                </>
              ))}
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
