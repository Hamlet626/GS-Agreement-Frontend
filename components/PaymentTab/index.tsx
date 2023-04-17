import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Tabs,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { theme } from "../../config/theme";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { selectSbpData } from "../../store/sbpData";
import { useSelector } from "react-redux";

export default function PaymentTab() {
  const {
    sbpPaymentTabs: { certain_payments, uncertain_payments },
  } = useSelector(selectSbpData);

  const [paymentTab, setPaymentTab] = useState<string>(Object.keys(certain_payments)[0]);

  const certainPaymentsMonths = useMemo(() => {
    if (certain_payments) {
      return Object.keys(certain_payments);
    }
  }, [certain_payments]);

  const monthFeeTotal = useMemo(() => {
    let total: {[key:string]:number;} = {};
    for(let month in certain_payments){
      let totalMth = 0;
      certain_payments[month].forEach(({ amount }: { amount: number }) => (totalMth += amount));
      total[month] = totalMth;
    }
    return total;
  }, [certain_payments]);

  const certainPaymentsTotalFee = useMemo(() => {
    let total = 0;
    if (certain_payments && certainPaymentsMonths) {
      certainPaymentsMonths.forEach((month: string) =>
        certain_payments[month]?.forEach(
          ({ amount }: { amount: number }) => (total = amount + total)
        )
      );
    }

    return total;
  }, [certain_payments, certainPaymentsMonths]);

  const uncertainPaymentsTotalFee = useMemo(() => {
    if (uncertain_payments?.length > 0) {
      return uncertain_payments.reduce(
        (accumulator: number, currentValue: any) =>
          accumulator + (parseFloat(currentValue.amount)||0),
        0
      );
    }
  }, [uncertain_payments]);

  return (
    <>
      {certain_payments && (
        <>
          <PaymentsHeader leftText={"Upcoming Payments"} rightText={`Total: ${toFormalAmount(certainPaymentsTotalFee)}`}/>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              gap: "1rem",
            }}
          >
            <>
              <Tabs
                orientation="vertical"
                value={paymentTab}
                onChange={(ev,val)=>setPaymentTab(val)}
                aria-label="Vertical tabs example"
                sx={{ minWidth: "100px" }}
              >
                {certainPaymentsMonths?.map((month) => (
                  <Tab key={month} label={`${month}\n${toFormalAmount(monthFeeTotal[month])}`} value={month} />
                ))}
              </Tabs>

              <Box
                sx={{
                  p: 3,
                  width: "100%",
                  borderRadius: `${theme.border.$borderRadius}px`,
                  border: `1px solid ${theme.colors.$primaryMain}`,
                }}
              >
                <Typography variant="h6">
                  Total Estimated Amount for {paymentTab}:{" "}
                  <strong style={{ marginLeft: "12px" }}>
                    {toFormalAmount(monthFeeTotal[paymentTab])}
                  </strong>
                </Typography>
                <List dense>
                  {Boolean(certain_payments && paymentTab) &&
                    certain_payments[paymentTab]?.map(
                      (payment: any, index: number) =>
                        Number(payment.amount) > 0 ? (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <InsertInvitationIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <>
                                  {formatDate(payment.date,paymentTab)}:
                                  <strong style={{ marginLeft: "12px" }}>
                                    {`${payment.type} ${toFormalAmount(payment.amount)}`}
                                  </strong>
                                </>
                              }
                            />
                          </ListItem>
                        ) : (
                          <></>
                        )
                    )}
                </List>
              </Box>
            </>
          </Box>
        </>
      )}
      {uncertain_payments?.length > 0 && (
        <>
          <PaymentsHeader leftText={"Potential Payments"}
                          rightText={`Total: ${toFormalAmount(uncertainPaymentsTotalFee)}`}/>
          <TableContainer  component={Paper}>
            <Table>
              {/*<TableHead>*/}
              {/*  <TableRow>*/}
              {/*    <TableCell>Payment type</TableCell>*/}
              {/*    <TableCell>Amount</TableCell>*/}
              {/*  </TableRow>*/}
              {/*</TableHead>*/}
              <TableBody>
                {/*<TableRow>*/}
                {/*  <TableCell>All month payments</TableCell>*/}
                {/*  <TableCell>*/}
                {/*    {toFormalAmount(certainPaymentsTotalFee)}*/}
                {/*  </TableCell>*/}
                {/*</TableRow>*/}
                {uncertain_payments.map((payment: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell>
                      {toFormalAmount(payment.amount)}
                    </TableCell>
                  </TableRow>
                ))}
                {/*<TableRow>*/}
                {/*  <TableCell sx={{ fontWeight: 'bolder'}}>Total</TableCell>*/}
                {/*  <TableCell sx={{ fontWeight: 'bolder'}}>*/}
                {/*    {toFormalAmount(*/}
                {/*      certainPaymentsTotalFee + uncertainPaymentsTotalFee*/}
                {/*    )}*/}
                {/*  </TableCell>*/}
                {/*</TableRow>*/}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}

type HeaderProps = {
  leftText: string;
  rightText: string;
};
const PaymentsHeader: React.FC<HeaderProps> = ({ leftText, rightText}) => {
  return <Box style={{ display: "flex", justifyContent: "space-between", flexWrap: 'wrap' }}>
    <Typography variant="h2" align="left" sx={{ py: 2 }}>
      {leftText}
    </Typography>
    <Box justifyContent="flex-end" paddingTop={2}>
      <Typography variant="h5" align="right" sx={{ pb: 2 }}>
        {rightText}
      </Typography>
    </Box>
  </Box>
}
const toFormalAmount = (amount: number) => {
  return amount?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

///return date in format Mon Feb 01 2021, given a date number and a month string in formate "Feb 2023"
const formatDate = (date: number, month: string) => {
  const monthStr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthNum = monthStr.indexOf(month.split(" ")[0])+1;
  const year = Number(month.split(" ")[1]);
  return new Date(year,monthNum,date).toDateString();
}