import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useAppwrite from "@/hooks/useAppwrite";
import { getAlbumData } from "@/lib/appwrite";
import { Photo } from "@/types/Photo";

const Album = () => {
  const { albumId } = useLocalSearchParams();

  const { data: albumData, isLoading } = useAppwrite<{
    album: Album;
    photos: Photo[];
  }>(() => getAlbumData(albumId as string));

  if (!albumData) {
    return <></>;
  }

  const { album, photos } = albumData;

  return (
    <SafeAreaView className="p-3">
      <FlatList
        numColumns={2}
        contentContainerStyle={{ gap: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        data={photos}
        keyExtractor={(photo: Photo) => photo.id}
        renderItem={({ item: photo }) => (
          <TouchableOpacity
            className="w-1/2 h-[140px]"
            activeOpacity={0.5}
            onPress={() => {}}>
            <Image
              source={{ uri: photo.url }}
              resizeMode="cover"
              className="w-full h-full"
            />
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => {
          return (
            <Text className="text-2xl font-psemibold">
              <Text className="text-secondary ">{album.name}</Text>
            </Text>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Album;
