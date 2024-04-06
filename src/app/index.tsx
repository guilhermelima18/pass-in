import { useState } from "react";
import { View, Image, StatusBar, Alert } from "react-native";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { colors } from "@/styles/colors";

export default function Home() {
  const [code, setCode] = useState<string>("");

  function handleInputChange(value: string) {
    setCode(value);
  }

  function handleAccessCredentials() {
    if (!code.trim()) {
      return Alert.alert("Atenção", "Não foi informado o código do ingresso!");
    }

    console.warn(code);
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

        <Button text="Acessar credencial" onPress={handleAccessCredentials} />

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
