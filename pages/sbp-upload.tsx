import { Box, Button, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setLoading, unsetLoading } from "../store/loaderStatus";
import axios from "axios";
import { setSbpFields } from "../store/sbpFields";

export default function Sbp() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleUploadPdf = async (event: any) => {
    try {
      dispatch(setLoading());
      const documentFile = event.target.files[0];

      const formData = new FormData();
      formData.append("documentFile", documentFile);

      await axios
        .post(
          "/api/generate-sbp-fields",
          {
            headers: { "content-type": "multipart/form-data" },
          }
        )
        .then(({ data: { sbpFields } }) => {
          dispatch(setSbpFields(sbpFields));
        })
        .then(() => router.push("/sbp-response"))
        .then(() => dispatch(unsetLoading()));
    } catch (error) {
      console.error(error);
      dispatch(unsetLoading());
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" align="center">
        Upload a Document
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
            onChange={handleUploadPdf}
          />
        </Button>
      </Box>
    </Box>
  );
}
