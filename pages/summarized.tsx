/* eslint-disable react-hooks/exhaustive-deps */
import DocumentSummarizer from "../components/DocumentSummarizer";
import Alert from "@mui/material/Alert";
import DocumentTabs from "../components/DocumentTabs";
import { useDispatch, useSelector } from "react-redux";
import { selectSection, setSections } from "../store/pdfDocument";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setLoading } from "../store/loaderStatus";
import { unsetLoading } from "../store/loaderStatus";
import ButtonSaveAllSections from "../components/ButtonSaveAllSections";

export default function Summarized() {
  const router = useRouter();

  const pdfSections = useSelector(selectSection);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());
    Promise.resolve("pdfSections")
      .then((data) => localStorage.getItem(data))
      .then((localStoragePdfSection) => {
        if (localStoragePdfSection) {
          dispatch(setSections(JSON.parse(localStoragePdfSection || "")));
        } else if (!localStoragePdfSection && !pdfSections) {
          router.push("/");
        }
      })
      .then(() => {
        dispatch(unsetLoading());
      });
  }, []);

  return (
    <>
      <Alert severity="warning" sx={{ width: '90%', margin: '0 auto'}}>
        This document summary is not legal advice or legally binding in any way.
        You should consult a lawyer.
      </Alert>
      <DocumentTabs />
      <DocumentSummarizer />
      <ButtonSaveAllSections />
    </>
  );
}
