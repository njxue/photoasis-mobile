import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useAuth } from "@/contexts/AuthContext";

interface Form {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
const SignUp = () => {
  const [form, setForm] = useState<Form>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { setUser, setIsLoggedIn } = useAuth();

  const handleSignUp = async () => {
    try {
      const { email, username, password, confirmPassword } = form;
      // Validate
      if (!email || !username || !password || !confirmPassword) {
        Alert.alert("Sign up error", "Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Sign up error", "Passwords do not match");
        return;
      }

      setIsSubmitting(true);
      const user = await createUser(email, password, username);
      setUser(user);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (err: any) {
      Alert.alert("Error", err.message);
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
              Sign up for Photoasis
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
              title="Username"
              value={form.username}
              placeholder="Username"
              handleChangeText={(e) => {
                setForm({ ...form, username: e });
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
            <FormField
              title="Confirm Password"
              value={form.confirmPassword}
              placeholder="Confirm Password"
              handleChangeText={(e) => {
                setForm({ ...form, confirmPassword: e });
              }}
              type="password"
            />
          </View>
          <CustomButton
            containerStyles="mt-10 w-full"
            text="Sign up"
            onPress={handleSignUp}
            disabled={isSubmitting}
          />
          <Text className="mt-5 text-base font-pregular">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-accent font-psemibold">
              Sign in
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
