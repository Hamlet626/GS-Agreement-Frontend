import { Button, Typography } from "@mui/material";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setSections } from "../../store/pdfDocument";
import { setLoading, unsetLoading } from "../../store/loaderStatus";
import { Wrapper } from "./styles";

export default function DocumentUpload() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleUploadPdf = async (event: any) => {
    try {
      dispatch(setLoading());
      const pdfFile = event.target.files[0];

      const formData = new FormData();
      formData.append("pdfFile", pdfFile);

      await axios
        .post("/api/pdf-to-html", formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then(({ data: { sections } }) => {
          dispatch(setSections(sections));
        })
        .then(() => router.push("/summarized"))
        .then(() => dispatch(unsetLoading()));
    } catch (error) {
      console.error(error);
      dispatch(unsetLoading());
    }
  };

  return (
    <Wrapper>
      <Typography variant="h2" align="center">
        Upload a Document
      </Typography>
      <Button
        variant="contained"
        component="label"
        startIcon={<PictureAsPdfIcon />}
        color="info"
      >
        Upload PDF
        <input hidden accept="*" type="file" onChange={handleUploadPdf} />
      </Button>
    </Wrapper>
  );
}
