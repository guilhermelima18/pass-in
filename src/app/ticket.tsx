import { useState } from "react";
import {
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { Redirect } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useBadgeStore } from "@/store/badge-store";
import { Header } from "@/components/header";
import { Credential } from "@/components/credential";
import { Button } from "@/components/button";
import { QRCode } from "@/components/qr-code";
import { colors } from "@/styles/colors";

export default function Ticket() {
  const badgeStore = useBadgeStore();

  const [expandedQRCode, setExpandedQRCode] = useState<boolean>(false);

  async function handleChangeAvatar() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets?.length) {
        const uri = result.assets[0].uri;
        badgeStore.updateAvatar(uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Avatar", "Não foi possível selecionar o avatar!");
    }
  }

  if (badgeStore.data === null) {
    return <Redirect href="/register" />;
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />
      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          badge={badgeStore.data}
          onChangeAvatar={handleChangeAvatar}
          onShowQRCode={() => setExpandedQRCode(true)}
        />

        <FontAwesome
          name="angle-double-down"
          size={24}
          color={colors.gray[300]}
          className="self-center my-6"
        />

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do Unite Summit,{" "}
          {badgeStore.data.name}!
        </Text>

        <Button text="Compartilhar" />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-10"
          onPress={() => badgeStore.remove()}
        >
          <Text className="text-base text-white font-bold text-center">
            Remover ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={expandedQRCode}
        statusBarTranslucent
        animationType="slide"
      >
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandedQRCode(false)}
          >
            <QRCode value="Teste" size={300} />
            <Text className="font-body text-orange-500 text-sm text-center mt-10">
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
