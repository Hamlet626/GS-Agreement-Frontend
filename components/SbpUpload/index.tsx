import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSbpData,
  selectSbpData, setSbpDateMergeList, setSbpFields,
  setSbpFileData,
} from "../../store/sbpData";
import { setLoading, unsetLoading } from "../../store/loaderStatus";
import axios from "axios";


export default function SbpUpload() {
  const { sbpFileName } = useSelector(selectSbpData);
  const dispatch = useDispatch();

  const handleUploadSbp = async (event: any) => {
    console.log("handleUploadSbp");
    try {
      dispatch(setLoading());
      const sbpDocumentFile = event.target.files[0];

      const formData = new FormData();
      formData.append("sbpDocumentFile", sbpDocumentFile);

      await axios
        .post("/api/sbp/process-doc", formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then(async({ data: { sbpFileName, fileText:text } }) => {
          const {data:{fileText,sbpFields,dateMergeList}}=await axios.post("https://wechaty.trustus.app/gpt/getFields", { text },
              {headers: { "content-type": "application/json", "wckey":"hamlet"}});
            dispatch(setSbpFileData({ fields: undefined, sbpFileName, fileText, undefined}));
            dispatch(setSbpFields({sbpFields}));
            dispatch(setSbpDateMergeList({dateMergeList}));
          // dispatch(setSbpFileData({ fields: undefined, sbpFileName, fileText, undefined}));
          // const {data:{rawSbpFields}}=await axios.post("/api/sbp/doc-raw-dates", { fileText });
          // const {data:{sbpFields,dateMergeList}}=await axios.post("/api/sbp/doc-simplified-dates", { rawSbpFields });
          // dispatch(setSbpFields({sbpFields}));
          // dispatch(setSbpDateMergeList({dateMergeList}));
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
    <Card elevation={2}>
      <CardContent>
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
        </CardContent>
    </Card>
  );
}
