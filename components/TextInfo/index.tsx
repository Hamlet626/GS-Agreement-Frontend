import { Warning } from "./styles";
import { Warning as WarningIcon } from "@mui/icons-material";

interface TextInfoProps {
  text: string;
  type?: "info" | "warning" | "error";
}

export default function TextInfo({ text, type }: TextInfoProps) {
  return (
    <Warning>
      {type === "warning" && <WarningIcon />}
      {text}
    </Warning>
  );
}
