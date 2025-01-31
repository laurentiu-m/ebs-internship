import { apiClient } from '@src/api';
import { Loading } from '@src/components';
import { UserEdit } from '@src/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { UserForm } from '../components/';
import '../index.scss';

export const UsersEdit = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<UserEdit>({
    queryKey: [`edit_user_${id}`],
    queryFn: () => apiClient.users.getById(Number(id))
  });

  if (isLoading) return <Loading />;
  if (!data) return;

  const [first_name, ...last_name] = data?.name.split(' ') || [];
  const lastName = last_name.join(' ');

  const formData = {
    first_name: first_name,
    last_name: lastName,
    email: data.email,
    username: data.username,
    phone: data.phone,
    gender: data.gender,
    role: data.role,
    password: data.password,
    confirm_password: data.password
  };

  return (
    <div className="users-edit">
      <UserForm mainClass="users-edit" submitButton="form.button.edit" userId={id} initialValues={formData} />
    </div>
  );
};
