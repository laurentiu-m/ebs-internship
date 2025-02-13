import { PostsForm } from '../components';

export const PostsCreate = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="posts-create">
      <PostsForm mainClass="posts-create" onClose={onClose} />
    </div>
  );
};
