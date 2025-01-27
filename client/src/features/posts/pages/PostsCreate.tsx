import { PostsForm } from '../components';
import { createPost } from '../utils/postsUtils';

export const PostsCreate = () => {
  return (
    <div className="posts-create">
      <PostsForm mainClass="posts-create" header="Create Post" submitFunction={createPost} />
    </div>
  );
};
