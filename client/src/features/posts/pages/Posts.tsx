import { PostsTable } from '../components/PostsTable';
import '../index.scss';

export const Posts = () => {
  return (
    <div className="posts">
      <h1 className="posts__header">Posts</h1>

      <PostsTable />
    </div>
  );
};
