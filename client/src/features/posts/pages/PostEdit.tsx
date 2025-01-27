import { apiClient } from '@src/api';
import { Loading } from '@src/components';
import { Posts } from '@src/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { PostsForm } from '../components';
import { editPost } from '../utils/postsUtils';

export const PostEdit = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<Posts>({
    queryKey: [`edit_post_${id}`],
    queryFn: () => apiClient.posts.getListById(id || '')
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
        header={`Edit Post ${id}`}
        initialValues={formData}
        submitFunction={editPost}
        postId={id}
        postUserId={data.userId}
      />
    </div>
  );
};
