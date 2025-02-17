import { apiClient } from '@src/api';
import { Loading } from '@src/components';
import { Posts } from '@src/types';
import { useQuery } from '@tanstack/react-query';

import { PostsForm } from '../components';

export const PostEdit = ({ id, onClose }: { id: number; onClose: () => void }) => {
  const { data, isLoading } = useQuery<Posts>({
    queryKey: [`edit_post_${id}`],
    queryFn: () => apiClient.posts.getById(id)
  });

  if (isLoading) return <Loading />;
  if (!data) return;

  const formData = {
    title: data.title,
    body: data.body
  };

  return (
    <div className="posts-edit">
      <PostsForm
        mainClass="posts-edit"
        submitButton="form.button.edit"
        initialValues={formData}
        postId={id}
        postUserId={data.userId}
        onClose={onClose}
      />
    </div>
  );
};
