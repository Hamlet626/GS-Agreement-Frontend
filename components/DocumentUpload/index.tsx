import { Button } from "@mui/material";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setDocumentTitle, setSections } from "../../store/docSections";
import { setLoading, unsetLoading } from "../../store/loaderStatus";
import { Wrapper } from "./styles";

export default function DocumentUpload() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleUploadDocument = async (event: any) => {
    try {
      dispatch(setLoading());
      const documentFile = event.target.files[0];

      const formData = new FormData();
      formData.append("documentFile", documentFile);

      await axios
        .post(
          documentFile.type === "application/pdf"
            ? "/api/pdf-to-html"
            : "/api/doc-to-html",
          formData,
          {
            headers: { "content-type": "multipart/form-data" },
          }
        )
        .then(({ data: { sections, documentTitle } }) => {
          dispatch(setSections(sections));
          dispatch(setDocumentTitle(documentTitle));
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
      <Button
        variant="contained"
        component="label"
        startIcon={<PictureAsPdfIcon />}
      >
        Upload Document
        <input
          hidden
          accept="application/pdf, .docx"
          type="file"
          onChange={handleUploadDocument}
        />
      </Button>
    </Wrapper>
  );
}