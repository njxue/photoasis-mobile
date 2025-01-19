import { Models } from "react-native-appwrite";

export interface UserDocument extends Models.Document {
  accountId: string;
  username: string;
  email: string;
  avatar: string;
}
