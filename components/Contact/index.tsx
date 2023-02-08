import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

export default function Contact() {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 5, mb: 2 }}>
        Contact Us
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth required id="firstName" label="First Name" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth required id="lastName" label="Last Name" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth required id="phone" label="Phone number" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth required id="email" type="email" label="Email" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            id="message"
            label="Leave your message here..."
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
