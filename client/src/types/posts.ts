export type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostsList = {
  results: [Posts];
  count: number;
};

export type PostForm = Omit<Posts, 'id' | 'userId'>;

export type PostCreate = Omit<Posts, 'id'>;

export type TopPosts = {
  postId: number;
  commentCount: number;
};

export type PostComments = {
  totalComments: number;
  commentsCounts: [TopPosts];
};
