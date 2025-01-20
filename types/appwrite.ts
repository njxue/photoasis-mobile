import { Models } from "react-native-appwrite";

export interface UserDocument extends Models.Document {
  accountId: string;
  username: string;
  email: string;
  avatar: string;
}

export interface AlbumDocument extends Models.Document {
  name: string;
  photos: string[];
  thumbnail: string;
  userId: string;
}

export interface PhotoDocument extends Models.Document {
  name: string;
  url: string;
}
