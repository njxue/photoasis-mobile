import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrUser, signIn } from "@/lib/appwrite";
import { useAuth } from "@/contexts/AuthContext";

interface Form {
  email: string;
  password: string;
}
const SignIn = () => {
  const [form, setForm] = useState<Form>({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { setUser, setIsLoggedIn } = useAuth();

  const handleSignIn = async () => {
    const { email, password } = form;
    if (!email) {
      Alert.alert("Error", "Email required");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Password required");
      return;
    }
    try {
      setIsSubmitting(true);
      await signIn(email, password);
      const user = await getCurrUser();
      setUser(user);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (err) {
      Alert.alert("Error", "Unable to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}>
        <View className="w-full h-full justify-center items-center px-5">
          <View className="w-full">
            <View className="flex-row gap-3 items-center">
              <Image source={images.logo} className="w-16 h-16" />
              <Text className="text-2xl font-psemibold">Photoasis</Text>
            </View>
            <Text className="text-xl font-psemibold mt-7">
              Sign in to Photoasis
            </Text>
          </View>
          <View className="mt-5 flex-col gap-5">
            <FormField
              title="Email"
              value={form.email}
              placeholder="Email"
              handleChangeText={(e) => {
                setForm({ ...form, email: e });
              }}
            />
            <FormField
              title="Password"
              value={form.password}
              placeholder="Password"
              handleChangeText={(e) => {
                setForm({ ...form, password: e });
              }}
              type="password"
            />
          </View>
          <CustomButton
            containerStyles="mt-10 w-full"
            text="Sign in"
            onPress={handleSignIn}
            disabled={isSubmitting}
          />
          <Text className="mt-5 text-base font-pregular">
            Do not have an account?{" "}
            <Link href="/sign-up" className="text-accent font-psemibold">
              Sign up
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
