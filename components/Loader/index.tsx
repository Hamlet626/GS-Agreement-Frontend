import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { LoaderWrapper } from "./styles";
import { useSelector } from "react-redux";
import { selectLoaderStatus } from "../../store/loaderStatus";

export default function Loader() {
  const loading = useSelector(selectLoaderStatus);
  return (
    <>
      {loading && (
        <LoaderWrapper>
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={90} />
          </Box>
        </LoaderWrapper>
      )}
    </>
  );
}
