import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
  containerStyles?: string;
  textStyles?: string;
  text: string;
  onPress: (...args: any[]) => void;
  disabled?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  containerStyles = "",
  textStyles = "",
  text,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-secondary p-2 rounded-2xl justify-center items-center min-h-[60px] ${containerStyles}`}>
      <Text className={`text-white text-lg font-psemibold   ${textStyles}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
