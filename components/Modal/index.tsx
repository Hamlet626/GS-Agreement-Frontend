import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch, useSelector } from "react-redux";
import { destroyModal, selectModal } from "../../store/modal";
import { DialogTitle, Icon } from "./styles";

export default function Modal() {
  const { status, title, message } = useSelector(selectModal);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(destroyModal());
  };

  return (
    <Dialog open={status} onClose={handleCloseModal}>
      <DialogTitle>
        <Icon /> {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseModal} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
