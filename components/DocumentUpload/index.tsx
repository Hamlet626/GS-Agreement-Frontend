import { Button } from "@mui/material";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setPdfDocument } from "../../store/pdfDocument";
import { setLoading, unsetLoading } from "../../store/loaderStatus";

export default function DocumentUpload() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleUploadPdf = async (event: any) => {
    try {
      dispatch(setLoading());
      const pdfFile = event.target.files[0];

      const formData = new FormData();
      formData.append("pdfFile", pdfFile);

      const {
        data: { text },
      } = await axios.post("/api/extract-html-from-pdf", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      dispatch(setPdfDocument(text));
      router.push("/summarized");
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        dispatch(unsetLoading());
      }, 3000);
    }
  };

  return (
    <Button
      variant="contained"
      component="label"
      startIcon={<PictureAsPdfIcon />}
      color="info"
    >
      Upload PDF
      <input hidden accept="*" type="file" onChange={handleUploadPdf} />
    </Button>
  );
}
