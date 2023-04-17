import {
  Box,
  Drawer,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEmailDrawer,
  selectEmailContent,
  selectEmailDrawerStatus,
} from "../../store/emailSender";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function EmailDrawer() {
  const emailDrawerOpen = useSelector(selectEmailDrawerStatus);
  const emailContent = useSelector(selectEmailContent);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      emailContent: "",
    },
  });

  const onSubmit = ({
    email,
    emailContent,
  }: {
    email: string;
    emailContent: string;
  }) => {
    window.location.href = `mailto:${email}?body=${encodeURIComponent(
      emailContent
    )}`;
  };

  const handleCloseDrawer = () => {
    dispatch(closeEmailDrawer());
  };

  useEffect(() => {
    setValue("emailContent", emailContent);
  }, [setValue, emailContent]);

  return (
    <Drawer
      elevation={4}
      anchor="bottom"
      open={emailDrawerOpen}
      onClose={handleCloseDrawer}
    >
      <Card elevation={2}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "2rem",
                }}
              >
                <Typography variant="h5" sx={{ flex: 2 }}>
                  Email Subject
                </Typography>
                <TextField
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  error={Boolean(errors.email)}
                  helperText={Boolean(errors.email) && "The email is required"}
                  sx={{ flex: 5 }}
                ></TextField>
              </Box>
              <TextField
                placeholder="Email content"
                type="text"
                {...register("emailContent", { required: true })}
                multiline
                minRows={4}
                maxRows={22}
                helperText={
                  Boolean(errors.emailContent) &&
                  "The email content is required"
                }
                error={Boolean(errors.emailContent)}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary" type="submit">
                  Send
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Drawer>
  );
}
