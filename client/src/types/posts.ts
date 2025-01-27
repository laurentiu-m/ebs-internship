export type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type TopPosts = {
  postId: number;
  commentCount: number;
};
