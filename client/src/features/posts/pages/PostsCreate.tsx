import { PostsForm } from '../components';
import { createPost } from '../utils/postsUtils';

export const PostsCreate = () => {
  return (
    <div className="posts-create">
      <PostsForm submitFunction={createPost} />
    </div>
  );
};
