import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DocumentTextArea,
  DocumentTitle,
  Paragraph,
  SectionHeader,
  SectionsWrapper,
  Transcription,
} from "./styles";
import Button from "@mui/material/Button";
import { textFieldClasses } from "@mui/material/TextField";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "../../store/loaderStatus";
import axios from "axios";
import { Box, Grid, Card } from "@mui/material";
import { mountModal } from "../../store/modal";
import { pushCallback, removeCallbackById } from "../../store/saveSection";

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

export default function Section({ title, text, index }: SectionProps) {
  const [editModeOn, setEditModeOn] = useState(false);
  const [newSectionText, setNewSectionText] = useState(text);
  const [transcriptions, setTranscriptions] = useState<ITranscription[]>([]);

  const textEditorRef = useRef(null);

  const dispatch = useDispatch();

  const handleGetTranscription = async (paragraph: string) => {
    try {
      dispatch(setLoading());

      await axios
        .post("/api/generate-transcription", { text: paragraph })
        .then(({ data: { result } }) => {
          let alreadyHas = false;

          transcriptions?.forEach(({ originalParagraph }, index) => {
            if (originalParagraph === paragraph) {
              let newTranscriptions = [...transcriptions];
              newTranscriptions[index].transcriptionText = result;
              setTranscriptions(newTranscriptions);
              alreadyHas = true;
            }
          });

          if (!alreadyHas) {
            setTranscriptions([
              ...transcriptions,
              {
                transcriptionText: result,
                originalParagraph: paragraph,
              },
            ]);
          }
        })
        .then(() => dispatch(unsetLoading()));
    } catch (error: any) {
      console.error(error);
      dispatch(unsetLoading());
      dispatch(
        mountModal({
          status: true,
          title: "An error happend",
          message:
            error.response.data.error.message ||
            "Unfortunately, an error happened, please try again.",
        })
      );
    }
  };

  const handleSaveChanges = () => {
    dispatch(removeCallbackById({ id: index }));
    setEditModeOn(false);
  };
  const handleEdit = () => {
    setEditModeOn(true);
    dispatch(pushCallback({ callback: () => setEditModeOn(false), id: index }));
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
    <SectionsWrapper key={title}>
      <SectionHeader>
        <DocumentTitle id={index.toString()}>{title}</DocumentTitle>
        <Button
          variant={editModeOn ? "outlined" : "text"}
          color="secondary" //{editModeOn ? "secondary" : "primary"}
          startIcon={!editModeOn && <ModeEditIcon />}
          onClick={editModeOn ? handleSaveChanges : handleEdit}
        >
          {editModeOn ? "Save" : "Edit"}
        </Button>
      </SectionHeader>
      {editModeOn ? (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6}>
            <DocumentTextArea
              ref={textEditorRef}
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
        </Grid>
      ) : (
        <>
          {sectionParagraph?.map(
            (paragraph, index) =>
              /[a-z]/i.test(paragraph) && (
                <Card
                  elevation={6}
                  key={index}
                  sx={{ marginTop: index > 0 ? "1rem" : "" }}
                >
                  <Grid container rowSpacing={3} alignItems="center">
                    <Grid item xs={12} sm={5} onClick={handleEdit}>
                      <Paragraph>{paragraph}</Paragraph>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                          padding: "1rem",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleGetTranscription(paragraph)}
                        >
                          Summarize
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleGetTranscription(paragraph)}
                        >
                          Send to me
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      {transcriptions?.map(
                        ({ originalParagraph, transcriptionText }, index) =>
                          originalParagraph === paragraph && (
                            <Transcription key={index}>
                              {transcriptionText}
                            </Transcription>
                          )
                      )}
                    </Grid>
                  </Grid>
                </Card>
              )
          )}
        </>
      )}
    </SectionsWrapper>
  );
}
