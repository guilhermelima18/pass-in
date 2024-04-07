import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { BadgeProps } from "@/store/badge-store";
import { Feather } from "@expo/vector-icons";
import { QRCode } from "@/components/qr-code";
import { colors } from "@/styles/colors";

type CredentialProps = {
  badge: BadgeProps;
  onChangeAvatar?: () => void;
  onShowQRCode?: () => void;
};

export function Credential({
  badge,
  onChangeAvatar,
  onShowQRCode,
}: CredentialProps) {
  return (
    <View className="w-full self-stretch items-center">
      <Image
        source={require("@/assets/ticket/band.png")}
        className="w-24 h-52 z-10"
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require("@/assets/ticket/header.png")}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">
              {badge?.eventTitle}
            </Text>
            <Text className="text-zinc-50 text-sm font-bold">
              #{badge?.name}
            </Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {badge.image ? (
          <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
            <Image
              source={{ uri: badge.image }}
              className="size-36 rounded-full -mt-24"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            className="size-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
            onPress={onChangeAvatar}
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {badge?.name}
        </Text>
        <Text className="font-regular text-base text-zinc-300 mb-4">
          {badge?.email}
        </Text>

        <QRCode value={badge?.checkInURL} size={120} />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6"
          onPress={onShowQRCode}
        >
          <Text className="font-body text-orange-500 text-sm">
            Amplicar QRCode
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
