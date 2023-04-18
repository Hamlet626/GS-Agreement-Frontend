import { Button } from "@mui/material";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {setDocumentStorageTitle, setDocumentTitle, setSections} from "../../store/docSections";
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
      formData.append("file", documentFile);

      await axios
        .post(
          "https://wechaty.trustus.app/gpt/storeVect",
          formData,
          {
            headers: { "content-type": "multipart/form-data", "wckey":"hamlet"},
          }
        )
        .then(({ data: { sections, newFileName, originalname } }) => {
          console.log(newFileName);
          console.log(originalname);
          dispatch(setSections(sections));
          dispatch(setDocumentTitle(originalname));
          dispatch(setDocumentStorageTitle(newFileName));
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