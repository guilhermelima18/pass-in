import QRCodeSVG from "react-native-qrcode-svg";
import { colors } from "@/styles/colors";

type QRCodeProps = {
  value: string;
  size: number;
};

export function QRCode({ value, size }: QRCodeProps) {
  return (
    <QRCodeSVG
      value={value}
      size={size}
      backgroundColor="transparent"
      color={colors.white}
    />
  );
}
