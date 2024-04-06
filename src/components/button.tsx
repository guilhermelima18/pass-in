import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  text: string;
  isLoading?: boolean;
};

export function Button({ text, isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      className="bg-orange-500 w-full h-14 items-center justify-center rounded-lg"
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator className="text-green-500" />
      ) : (
        <Text className="text-green-500 text-base font-bold uppercase">
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
