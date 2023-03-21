import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSbpData,
  selectSbpData,
  setSbpEmbeddings,
  setSbpFileData,
} from "../../store/sbpData";
import { setLoading, unsetLoading } from "../../store/loaderStatus";
import axios from "axios";

export default function SbpUpload() {
  const { sbpFileName } = useSelector(selectSbpData);
  const dispatch = useDispatch();

  const handleUploadSbp = async (event: any) => {
    try {
      dispatch(setLoading());
      const sbpDocumentFile = event.target.files[0];

      const formData = new FormData();
      formData.append("sbpDocumentFile", sbpDocumentFile);

      await axios
        .post("/api/sbp/sbp-summarized", formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then(({ data: { sbpFields, sbpFileName, sbpChatChoices, embeddings } }) => {
          dispatch(setSbpFileData({ fields: sbpFields, sbpFileName }));
          dispatch(setSbpEmbeddings({ embeddings }));
        })
        .then(() => dispatch(unsetLoading()));
    } catch (error) {
      console.error(error);
      dispatch(unsetLoading());
    }
  };

  const handleRemoveSbp = () => {
    dispatch(resetSbpData());
  };

  return (
    <>
      <Typography variant="h2" align="center">
        SBP Document
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {sbpFileName ? (
          <Button
            variant="text"
            onClick={handleRemoveSbp}
            startIcon={<PictureAsPdfIcon />}
            endIcon={<CloseIcon />}
          >
            {sbpFileName}
          </Button>
        ) : (
          <Button
            variant="contained"
            component="label"
            startIcon={<PictureAsPdfIcon />}
            color="info"
          >
            Upload SBP PDF
            <input
              hidden
              accept="application/pdf"
              type="file"
              onChange={handleUploadSbp}
            />
          </Button>
        )}
      </Box>
    </>
  );
}
