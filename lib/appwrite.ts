import { AlbumDocument, PhotoDocument, UserDocument } from "@/types/appwrite";
import { Photo } from "@/types/Photo";
import User from "@/types/User";
import {
  Client,
  Storage,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Models,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.doge.photoasis",
  projectId: "678b4c42002bed92b15a",
  databaseId: "678b4d32002be826b2f2",
  userCollectionId: "678b4d49000fe4e4c5ec",
  photoCollectionId: "678b4d6f0001e040399f",
  albumCollectionId: "678ca213003a4c78273b",
  storageId: "678b4e1e00262cf82a2e",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  photoCollectionId,
  albumCollectionId,
  storageId,
} = config;

const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error();
    }

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser: UserDocument = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl }
    );

    return formatUser(newUser);
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export const getCurrUser = async (): Promise<User> => {
  try {
    const currUser = await account.get();

    if (!currUser) {
      throw new Error("User not found");
    }
    const userDocuments: Models.DocumentList<Models.Document> =
      await databases.listDocuments(databaseId, userCollectionId, [
        Query.equal("accountId", currUser.$id),
      ]);

    if (!userDocuments) {
      throw new Error("User not found");
    }
    const userDocument: UserDocument = userDocuments
      .documents[0] as UserDocument;
    const user = formatUser(userDocument);
    return user;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

const formatUser = (userDocument: UserDocument): User => {
  const { accountId, username, email, avatar } = userDocument;
  return { accountId, username, email, avatar };
};

const formatAlbum = (albumDocument: AlbumDocument): Album => {
  const { name, thumbnail, photos, userId, $id } = albumDocument;
  return { name, thumbnail, photos, userId, albumId: $id };
};

const formatPhoto = (photoDocument: PhotoDocument): Photo => {
  const { name, url, $id } = photoDocument;
  return { name, url, id: $id };
};

export const getUserAlbums = async (userId: string) => {
  try {
    const albums = await databases.listDocuments(
      databaseId,
      albumCollectionId,
      [Query.equal("userId", userId)]
    );
    const albumDocuments: AlbumDocument[] = albums.documents as AlbumDocument[];
    return albumDocuments.map(formatAlbum);
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export const getPhotos = async (photoIds: string[]) => {
  const photoDocuments = await databases.listDocuments(
    databaseId,
    photoCollectionId,
    [Query.contains("$id", photoIds)]
  );
  const photos = photoDocuments.documents as PhotoDocument[];
  return photos.map(formatPhoto);
};

export const getAlbumData = async (
  albumId: string
): Promise<{ album: Album; photos: Photo[] }> => {
  try {
    const albumDocument = await databases.listDocuments(
      databaseId,
      albumCollectionId,
      [Query.equal("$id", albumId), Query.limit(1)]
    );
    if (!albumDocument.documents?.[0]) {
      throw new Error("Album not found");
    }
    const album = formatAlbum(albumDocument.documents[0] as AlbumDocument);

    let photos: Photo[] = [];

    if (album.photos && album.photos?.length > 0) {
      photos = await getPhotos(album.photos);
    }

    return { album, photos };
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
