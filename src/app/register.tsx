import { useState } from "react";
import axios from "axios";
import { View, Image, StatusBar, Alert } from "react-native";
import { Link, router } from "expo-router";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useRegisterEvent } from "@/hooks/use-register-event";
import { useAttendee } from "@/hooks/use-attendee";
import { useBadgeStore } from "@/store/badge-store";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { colors } from "@/styles/colors";

const eventId = "9e9bd979-9d10-4915-b339-3786b1634f33";

export default function Register() {
  const { registerForEventLoading, registerForEvent } = useRegisterEvent();
  const { getAttendeeBadge } = useAttendee();
  const badgeStore = useBadgeStore();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function handleInputChange(value: string, inputName: string) {
    inputName === "name" ? setName(value) : setEmail(value);
  }

  async function handleRegister() {
    if (!name.trim() || !email.trim()) {
      return Alert.alert("Atenção", "Preencha todos os campos!");
    }

    try {
      const response = await registerForEvent({ eventId, name, email });

      if (response.status === 201 && response.data) {
        const badgeResponse = await getAttendeeBadge(response.data.attendeeId);

        if (badgeResponse.data) {
          badgeStore.save(badgeResponse.data.badge);

          Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
            { text: "OK", onPress: () => router.push("/ticket") },
          ]);
        }
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
          <FontAwesome6
            name="user-circle"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Nome completo"
            onChangeText={(value) => handleInputChange(value, "name")}
          />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={(value) => handleInputChange(value, "email")}
          />
        </Input>

        <Button
          text="Realizar inscrição"
          onPress={handleRegister}
          isLoading={registerForEventLoading}
          disabled={registerForEventLoading}
        />

        <Link
          href="/"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  );
}
