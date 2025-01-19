import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface FormFieldProps {
  title: string;
  value: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  titleStyles?: string;
  inputStyles?: string;
  handleChangeText: (...args: any[]) => void;
}
const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  type = "text",
  placeholder = "",
  titleStyles = "",
  inputStyles = "",
  handleChangeText,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View className="w-full">
      <Text className={`font-pmedium text-base text-secondary ${titleStyles}`}>
        {title}
      </Text>
      <View
        className={`flex-row items-center bg-white w-full h-14 mt-2 rounded-2xl px-2 ${
          isFocused ? "border-2 border-secondary-100" : ""
        }`}>
        <TextInput
          className={`flex-1  ${inputStyles}`}
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          inputMode={type === "password" ? "text" : type}
          keyboardType={type === "email" ? "email-address" : "default"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {type === "password" && (
          <TouchableOpacity
            className=" "
            onPress={() => setShowPassword((prev) => !prev)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
