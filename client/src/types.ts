export type UserInPostType = {
  _id: string;
  fullName: string;
}

export type PostType = {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: UserInPostType;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type RegisterValuesType = {
  fullName: string;
  email: string;
  password: string;
}

export type LoginValuesType = {
  email: string;
  password: string;
}

export type UserType = {
  _id: string;
  fullName: string,
  email: string,
  createdAt: string;
  updatedAt: string;
  avatarUrl: string;
}