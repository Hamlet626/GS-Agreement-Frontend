import React, { useEffect, useMemo, useState } from "react";
import {
  DocumentTextArea,
  DocumentTitle,
  Paragraph,
  SectionHeader,
  SectionParagraphRow,
  Transcription,
} from "./styles";
import Button from "@mui/material/Button";
import { textFieldClasses } from "@mui/material/TextField";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "../../store/loaderStatus";
import axios from "axios";
import { Box, Card, CardContent, Grid } from "@mui/material";
import { mountModal } from "../../store/modal";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

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
            let alreadyHas = false;

            transcriptions?.forEach(({ originalParagraph }, index) => {
              if (originalParagraph === paragraph) {
                let newTranscriptions = [...transcriptions];
                newTranscriptions[index].transcriptionText = choices[0].text;
                setTranscriptions(newTranscriptions);
                alreadyHas = true;
              }
            });

            if (!alreadyHas) {
              setTranscriptions([
                ...transcriptions,
                {
                  transcriptionText: choices[0].text,
                  originalParagraph: paragraph,
                },
              ]);
            }
          }
        )
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
          <DocumentTitle id={index.toString()}>{title}</DocumentTitle>
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
        {editModeOn ? (
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
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
          </Grid>
        ) : (
          <>
            {sectionParagraph?.map((paragraph, index) => (
              <SectionParagraphRow
                container
                rowSpacing={3}
                alignItems="center"
                key={index}
              >
                <Grid
                  item
                  xs={12}
                  sm={5}
                  style={{
                    paddingTop: 0,
                  }}
                >
                  <Paragraph>{paragraph}</Paragraph>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={2}
                  style={{
                    paddingTop: 0,
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      display: "flex",
                      justifyContent: "center",
                      [theme.breakpoints.down("sm")]: {
                        marginBottom: "1rem",
                      },
                    })}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<TextSnippetIcon />}
                      style={{
                        fontSize: "12px",
                      }}
                      onClick={() => handleGetTranscription(paragraph)}
                    >
                      Summarize
                    </Button>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  style={{
                    paddingTop: 0,
                  }}
                >
                  {transcriptions?.map(
                    ({ originalParagraph, transcriptionText }, index) =>
                      originalParagraph === paragraph && (
                        <Transcription key={index}>
                          {transcriptionText}
                        </Transcription>
                      )
                  )}
                </Grid>
              </SectionParagraphRow>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}
