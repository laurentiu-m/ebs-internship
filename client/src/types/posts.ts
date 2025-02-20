export type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostsTable = {
  username: string;
  id: number;
  title: string;
  body: string;
};

export type PostsList = {
  result: {
    username: string;
    id: number;
    title: string;
    body: string;
  }[];
  count: number;
  page: number;
  totalPages: number;
  rows: number;
};

export type PostForm = Omit<Posts, 'id' | 'userId'>;

export type PostCreate = Omit<Posts, 'id'>;

export type TopPosts = {
  title: string;
  commentCount: number;
};

export type PostComments = {
  totalComments: number;
  commentsCounts: [TopPosts];
};
