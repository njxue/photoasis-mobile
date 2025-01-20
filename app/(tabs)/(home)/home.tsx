import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import useAppwrite from "@/hooks/useAppwrite";
import { getUserAlbums } from "@/lib/appwrite";
import { Href, router } from "expo-router";

const Home = () => {
  const { user } = useAuth();
  const {
    data: albums,
    refetch,
    isLoading,
  } = useAppwrite<Album[]>(() => getUserAlbums(user!.accountId));

  //console.log(albums);
  return (
    <SafeAreaView className="p-3">
      <FlatList
        numColumns={2}
        contentContainerStyle={{ gap: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        data={albums}
        keyExtractor={(album: Album) => album.albumId}
        renderItem={({ item: album }) => (
          <TouchableOpacity
            className="relative w-1/2 h-[140px]"
            activeOpacity={0.5}
            onPress={() => router.push(`/album/${album.albumId}` as Href)}>
            <Image
              source={{ uri: album.thumbnail }}
              resizeMode="cover"
              className="w-full h-full"
            />
            <Text
              className="absolute text-white bottom-2 right-3 text-base font-psemibold"
              numberOfLines={2}>
              {album.name}
            </Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => {
          return (
            <Text className="text-2xl font-psemibold">
              Welcome back,{" "}
              <Text className="text-accent ">{user?.username}</Text>
            </Text>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
