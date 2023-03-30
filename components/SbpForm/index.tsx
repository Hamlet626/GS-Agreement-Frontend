import { Box, Button, Grid, TextField, FormLabel } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers";
import { selectSbpData, setSbpPaymentTabs } from "../../store/sbpData";
import { setLoading, unsetLoading } from "../../store/loaderStatus";
import axios from "axios";
import {getPaymentTabs} from "../../utils/apis/getPaymentTabs";
import reFormatPayments from "../../utils/reFormatPayments";

export default function SbpForm() {
  const { fields,fileText, dateMergeList} = useSelector(selectSbpData);
  const [fieldsData, setFieldsData] = useState<any>({});
  const dispatch = useDispatch();

  const handleSubmitFieldsData = async () => {
    try {
      dispatch(setLoading());
      await axios
        .post("https://wechaty.trustus.app/gpt/getPayments", { fileText, sbpForm: fieldsData, dateMergeList },
            {headers: { "content-type": "application/json", "wckey":"hamlet"}})
        .then(async({ data: { paymentTabs } }) => {
            console.log(paymentTabs);
            // const { data: { sbpPaymentTabs } }=await axios.post("/api/sbp/doc-form", {formOptions,fileText });
            // const sbpPaymentTabs = await getPaymentTabs(fileText||"",paymentTabs);

            dispatch(setSbpPaymentTabs({ sbpPaymentTabs: reFormatPayments(paymentTabs) }));
        })
        .then(() => dispatch(unsetLoading()));
    } catch (error) {
      console.error(error);
      dispatch(unsetLoading());
    }
  };

  return fields ? (
    <>
      <FormLabel component="legend" sx={{ margin: '1.5rem 0 0.75rem 0'}}>
        Provide some info to help us estimate the payments:
      </FormLabel>
      {fields?.date.length > 0 && (
        <Grid container spacing={2}>
          {fields?.date?.map((date: string) => (
            <Grid item md={6} key={date}>
              <DatePicker
                sx={{ width: "100%" }}
                label={date.charAt(0).toUpperCase() + date.slice(1)}
                onChange={(newValue: any) =>
                  setFieldsData((prev: any) => {
                    return {
                      ...prev,
                      [date//.replace(/ /g, "_")
                          ]: new Date(
                        newValue
                      ).toDateString(),
                    };
                  })
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
      {fields?.boolean.length > 0 &&
        fields?.boolean?.map((boolean: string) => (
          <FormControlLabel
            key={boolean}
            control={
              <Checkbox
                checked={fieldsData[boolean//.replace(/ /g, "_")
                    ] === "Yes"}
                onChange={({ target: { checked } }) =>
                  setFieldsData((prev: any) => {
                    return {
                      ...prev,
                      [boolean//.replace(/ /g, "_")
                          ]: checked ? "Yes" : "No",
                    };
                  })
                }
              />
            }
            label={boolean.charAt(0).toUpperCase() + boolean.slice(1)}
          />
        ))}
      <FormLabel component="legend" sx={{ margin: '1.5rem 0 0.75rem 0'}}>
        Put here additional data you want to provide:
      </FormLabel>
      <TextField
        onChange={({ target: { value } }) =>
          setFieldsData((prev: any) => {
            return { ...prev, comments: value };
          })
        }
        label="Comments"
        multiline
        rows={4}
      />
      <Box justifyContent="flex-end">
        <Button
          variant="contained"
          component="label"
          color="info"
          onClick={handleSubmitFieldsData}
        >
          Submit
        </Button>
      </Box>
    </>
  ) : (
    <></>
  );
}
