import { useState } from "react";
import {
  Box,
  Tabs,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Typography,
} from "@mui/material";
import { theme } from "../../config/theme";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { selectSbpData } from "../../store/sbpData";
import { useSelector } from "react-redux";

export default function PaymentTab() {
  const {
    sbpPaymentTabs: { certain_payments },
  } = useSelector(selectSbpData);

  const [paymentTab, setPaymentTab] = useState(0);

  const handleChangePaymentTab = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setPaymentTab(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        gap: "1rem",
      }}
    >
      {certain_payments && (
        <>
          <Tabs
            orientation="vertical"
            value={paymentTab}
            onChange={handleChangePaymentTab}
            aria-label="Vertical tabs example"
            sx={{ minWidth: "100px" }}
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
            <Typography variant="h6">
              January Fee <strong style={{ marginLeft: "12px" }}>$440</strong>
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <InsertInvitationIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      Fee Jan 1st:
                      <strong style={{ marginLeft: "12px" }}>$90</strong>
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InsertInvitationIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      Fee Jan 15th:
                      <strong style={{ marginLeft: "12px" }}>$100</strong>
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InsertInvitationIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      Fee Jan 30th:
                      <strong style={{ marginLeft: "12px" }}>$250</strong>
                    </>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </>
      )}
    </Box>
  );
}
