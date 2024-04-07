import { useState } from "react";
import axios from "axios";
import { View, Image, StatusBar, Alert } from "react-native";
import { Link, Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAttendee } from "@/hooks/use-attendee";
import { useBadgeStore } from "@/store/badge-store";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { colors } from "@/styles/colors";

export default function Home() {
  const { attendeeBadgeLoading, getAttendeeBadge } = useAttendee();
  const badgeStore = useBadgeStore();

  const [code, setCode] = useState<string>("");

  function handleInputChange(value: string) {
    setCode(value);
  }

  async function handleAccessCredentials() {
    if (!code.trim()) {
      return Alert.alert("Atenção", "Não foi informado o código do ingresso!");
    }

    try {
      const response = await getAttendeeBadge(code);

      if (response.data) {
        badgeStore.save(response.data.badge);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          String(error.response?.data.message).includes("already registered")
        ) {
          return Alert.alert("Inscrição", "Esse e-mail já está cadastrado");
        }
      }

      Alert.alert("Inscrição", "Não foi possível fazer a inscrição");
    }
  }

  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />;
  }

  return (
    <View className="bg-green-500 flex-1 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />
      <Image
        source={require("@/assets/logo.png")}
        className="size-16"
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Código do seu ingresso"
            onChangeText={handleInputChange}
          />
        </Input>

        <Button
          text="Acessar credencial"
          onPress={handleAccessCredentials}
          isLoading={attendeeBadgeLoading}
        />

        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  );
}
