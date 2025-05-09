export type UserType = {
  _id: string;
  fullName: string;
}

export type PostType = {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: UserType;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type RegisterValuesType = {
  fullName: string,
  email: string,
  password: string,
}