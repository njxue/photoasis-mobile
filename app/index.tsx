import { Link, router } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-primary items-center justify-center">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}>
        <View className=" h-[85vh] justify-center items-center px-4">
          <View className="w-full px-4 flex-row justify-center items-center gap-2">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-12 h-12"
            />
            <Text className="text-secondary font-psemibold text-2xl">
              Photoasis
            </Text>
          </View>
          <Image
            source={images.placeholder}
            resizeMode="contain"
            className="max-w-[380px] w-full h-[300px] mt-10"
          />
          <View className="relative mt-5">
            <Text className="text-2xl font-psemibold text-center text-secondary">
              Relive your moments anywhere with{" "}
              <Text className="text-orange-600 font-pbold">PhotoAsis</Text>
            </Text>
            <Text className="text-center mt-5">
              Capture your most precious memories and organize them into albums
            </Text>
          </View>
          <CustomButton
            onPress={() => router.push("/home")}
            text="Continue with email"
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
