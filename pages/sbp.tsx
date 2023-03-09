import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, unsetLoading } from "../store/loaderStatus";
import axios from "axios";
import {
  IField,
  resetSbpData,
  selectSbpData,
  setSbpData,
} from "../store/sbpData";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { theme } from "../config/theme";

export default function Sbp() {
  const dispatch = useDispatch();
  const { fields, sbpFileName } = useSelector(selectSbpData);
  const [fieldsData, setFieldsData] = useState({});

  const [paymentTab, setPaymentTab] = useState(0);

  const handleChangePaymentTab = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setPaymentTab(newValue);
  };

  const handleUploadSbp = async (event: any) => {
    try {
      dispatch(setLoading());
      const sbpDocumentFile = event.target.files[0];

      const formData = new FormData();
      formData.append("sbpDocumentFile", sbpDocumentFile);

      await axios
        .post("/api/generate-sbp-fields", formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then(({ data: { sbpFields, sbpFileName } }) => {
          dispatch(setSbpData({ fields: sbpFields, sbpFileName }));
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

  const handleSubmitFieldsData = () => {
    console.log(fieldsData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
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
            color="info"
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
      {fields?.length > 0 && (
        <>
          <Box
            sx={{
              my: 6,
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {fields?.map(({ id, label, name }: IField) => (
              <Box
                key={id}
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">{label}</Typography>
                <DatePicker
                  onChange={(newValue) =>
                    setFieldsData((prev) => {
                      return { ...prev, [name]: newValue };
                    })
                  }
                />
              </Box>
            ))}
            <Button
              variant="contained"
              component="label"
              color="info"
              onClick={handleSubmitFieldsData}
            >
              Submit
            </Button>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              gap: "1rem",
              my: 4,
            }}
          >
            <Tabs
              orientation="vertical"
              value={paymentTab}
              onChange={handleChangePaymentTab}
              aria-label="Vertical tabs example"
              sx={{ minWidth: '100px'}}
            >
              <Tab label="January" />
              <Tab label="February" />
              <Tab label="March" />
              <Tab label="April" />
              <Tab label="May" />
              <Tab label="June" />
              <Tab label="July" />
            </Tabs>
            <Box
              sx={{
                p: 3,
                width: "100%",
                borderRadius: "8px",
                border: `1px solid ${theme.colors.$primaryMain}`,
              }}
            >
              <Typography>Item One</Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
