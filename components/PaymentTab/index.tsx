import { useEffect, useMemo, useState } from "react";
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

  const [paymentTab, setPaymentTab] = useState<string>("");
  const [certainPaymentsMonths, setCertainPaymentsMonths] = useState<string[]>(
    []
  );

  const handleChangePaymentTab = (event: React.SyntheticEvent) => {
    setPaymentTab(event.target.innerText);
  };

  useEffect(() => {
    if (certain_payments) {
      setPaymentTab(Object?.keys(certain_payments)[0]);
      setCertainPaymentsMonths(Object.keys(certain_payments));
    }
  }, [certain_payments]);

  const monthFeeTotal = useMemo(() => {
    return certain_payments[paymentTab]?.reduce(
      (accumulator: number, currentValue: any) =>
        accumulator + currentValue.amount,
      0
    );
  }, [certain_payments, paymentTab]);

  return (
    <>
      <Typography variant="h2" align="center" sx={{ py: 2 }}>
        Certain Payments
      </Typography>
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
              {certainPaymentsMonths.map((month) => (
                <Tab key={month} label={month} value={month} />
              ))}
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
                {paymentTab} Fee{" "}
                <strong style={{ marginLeft: "12px" }}>${monthFeeTotal}</strong>
              </Typography>
              <List dense>
                {Boolean(certain_payments && paymentTab) &&
                  certain_payments[paymentTab].map(
                    (payment: any, index: number) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <InsertInvitationIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <>
                              Fee {paymentTab} - {payment.date}:
                              <strong style={{ marginLeft: "12px" }}>
                                ${payment.amount}
                              </strong>
                            </>
                          }
                        />
                      </ListItem>
                    )
                  )}
              </List>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
