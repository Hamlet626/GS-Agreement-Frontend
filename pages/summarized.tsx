/* eslint-disable react-hooks/exhaustive-deps */
import DocumentSummarizer from "../components/DocumentSummarizer";
import Alert from "@mui/material/Alert";
import DocumentTabs from "../components/DocumentTabs";
import { useDispatch, useSelector } from "react-redux";
import { selectSection, setSections } from "../store/docSections";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setLoading } from "../store/loaderStatus";
import { unsetLoading } from "../store/loaderStatus";
import ButtonSaveAllSections from "../components/ButtonSaveAllSections";
import EmailDrawer from "../components/EmailDrawer";
import FloatingButtons from "../components/FloatingButtons";

export default function Summarized() {
  const router = useRouter();

  const sections = useSelector(selectSection);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());
    Promise.resolve("sections")
      .then((data) => localStorage.getItem(data))
      .then((localStorageSections) => {
        if (localStorageSections) {
          dispatch(setSections(JSON.parse(localStorageSections || "")));
        } else if (!localStorageSections && !sections) {
          router.push("/");
        }
      })
      .then(() => {
        dispatch(unsetLoading());
      });
  }, []);

  return (
    <>
      <Alert severity="warning" sx={{ width: "90%", margin: "0 auto" }}>
        This document summary is not legal advice or legally binding in any way.
        You should consult a lawyer.
      </Alert>
      <DocumentTabs />
      <DocumentSummarizer />
      <ButtonSaveAllSections />
      <FloatingButtons />
      <EmailDrawer />
    </>
  );
}
