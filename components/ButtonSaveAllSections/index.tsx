import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAllCallback,
  selectCallbackArray,
} from "../../store/saveSection";
import { Button } from "@mui/material";
import { Wrapper } from "./styles";

export default function ButtonSaveAllSections() {
  const callbackArray = useSelector(selectCallbackArray);
  const dispatch = useDispatch();

  const handleSaveAllSections = () => {
    callbackArray.forEach(({ callback }) => callback());
    dispatch(removeAllCallback());
  };

  if (callbackArray.length) {
    return (
      <Wrapper>
        <Button
          variant={"contained"}
          onClick={handleSaveAllSections}
        >
          Save All
        </Button>
      </Wrapper>
    );
  } else {
    return <></>;
  }
}
