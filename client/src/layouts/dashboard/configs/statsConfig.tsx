import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';
import AlbumIcon from '@src/assets/icons/album_icon.svg?react';
import CommentIcon from '@src/assets/icons/comment_icon.svg?react';
import PostIcon from '@src/assets/icons/posts_icon.svg?react';
import UserIcon from '@src/assets/icons/users_icon.svg?react';

export const configStats = {
  totalUsers: {
    queryKey: 'total_users',
    fetchFunction: async () => {
      const { count } = await apiClient.users.getList();
      return count;
    },
    requiredRoles: [Roles.Admin, Roles.Moderator],
    icon: <UserIcon className="icon" />
  },
  totalPosts: {
    queryKey: 'total_posts',
    fetchFunction: async () => {
      const { count } = await apiClient.posts.getList();
      return count;
    },
    requiredRoles: [Roles.Admin, Roles.Moderator],
    icon: <PostIcon className="icon" />
  },
  totalComments: {
    queryKey: 'total_comments',
    fetchFunction: () => apiClient.comments.getTotalComments(),
    requiredRoles: [Roles.Admin, Roles.Moderator],
    icon: <CommentIcon className="icon" />
  },
  totalUserPosts: {
    queryKey: 'total_user_posts',
    fetchFunction: async (userId: number) => {
      const { count } = await apiClient.posts.getList({ userId });
      return count;
    },
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: <PostIcon className="icon" />
  },
  totalUserComments: {
    queryKey: 'total_user_comments',
    fetchFunction: async (userId: number) => {
      const { totalComments } = await apiClient.posts.getUserPostComments(userId);
      return totalComments;
    },
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: <CommentIcon className="icon" />
  },
  totalAlbums: {
    queryKey: 'user_total_albums',
    fetchFunction: (userId: number) => apiClient.users.getTotalAlbums(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: <AlbumIcon className="icon" />
  }
};
