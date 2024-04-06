import { ActivityIndicator } from "react-native";

export function Loading() {
  return (
    <ActivityIndicator
      size="large"
      className="flex-1 bg-green-500 items-center justify-center text-orange-500"
    />
  );
}
