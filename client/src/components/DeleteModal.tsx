import { apiClient } from '@src/api';
import { useAppContext } from '@src/hooks/useAppContext';
import { Posts, UserEdit } from '@src/types';
import { useQuery } from '@tanstack/react-query';

import { Loading } from './Loading';

export const DeleteModal = ({ id, modalMode, onDelete }: { id: number; modalMode: string; onDelete: () => void }) => {
  const { onCloseModal } = useAppContext();

  const { data, isLoading } = useQuery({
    queryKey: [`${modalMode}_data`],
    queryFn: async () => {
      if (modalMode === 'delete_user') {
        return await apiClient.users.getById(id);
      } else {
        return await apiClient.posts.getById(id);
      }
    }
  });

  if (isLoading) return <Loading />;

  return (
    <div className="delete">
      <div className="delete__info">
        <h1 className="title">{modalMode === 'delete_user' ? 'Delete User' : 'Delete Post'}</h1>
        <p className="warning">
          Are you sure you want to delete{' '}
          {modalMode === 'delete_user' ? (
            <span>{(data as UserEdit)?.username}</span>
          ) : (
            <span>{(data as Posts)?.title}</span>
          )}
        </p>
      </div>

      <div className="delete__buttons">
        <button className="cancel" onClick={onCloseModal}>
          Cancel
        </button>
        <button className="delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
