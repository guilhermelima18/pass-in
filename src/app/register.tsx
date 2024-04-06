import { useState } from "react";
import { View, Image, StatusBar, Alert } from "react-native";
import { Link, router } from "expo-router";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { colors } from "@/styles/colors";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function handleInputChange(value: string, inputName: string) {
    inputName === "name" ? setName(value) : setEmail(value);
  }

  function handleRegister() {
    if (!name.trim() || !email.trim()) {
      return Alert.alert("Atenção", "Preencha todos os campos!");
    }

    router.push("/ticket");
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

        <Button text="Realizar inscrição" onPress={handleRegister} />

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
