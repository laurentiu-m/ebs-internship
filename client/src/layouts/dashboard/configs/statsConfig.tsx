import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';
import { AlbumIcon, CommentIcon, PostIcon, UserIcon } from '@src/components';

export const configStats = {
  totalUsers: {
    queryKey: 'total_users',
    fetchFunction: async () => {
      const { count } = await apiClient.users.getList();
      return count;
    },
    requiredRoles: [Roles.Admin, Roles.Moderator],
    icon: (styleClass: string) => <UserIcon styleClass={styleClass} />
  },
  totalPosts: {
    queryKey: 'total_posts',
    fetchFunction: async () => {
      const { count } = await apiClient.posts.getList();
      return count;
    },
    requiredRoles: [Roles.Admin, Roles.Moderator],
    icon: (styleClass: string) => <PostIcon styleClass={styleClass} />
  },
  totalComments: {
    queryKey: 'total_comments',
    fetchFunction: () => apiClient.comments.getTotalComments(),
    requiredRoles: [Roles.Admin, Roles.Moderator],
    icon: (styleClass: string) => <CommentIcon styleClass={styleClass} />
  },
  totalUserPosts: {
    queryKey: 'total_user_posts',
    fetchFunction: async (userId: number) => {
      const { count } = await apiClient.posts.getList({ userId });
      return count;
    },
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: (styleClass: string) => <PostIcon styleClass={styleClass} />
  },
  totalUserComments: {
    queryKey: 'total_user_comments',
    fetchFunction: async (userId: number) => {
      const { totalComments } = await apiClient.posts.getUserPostComments(userId);
      return totalComments;
    },
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: (styleClass: string) => <CommentIcon styleClass={styleClass} />
  },
  totalAlbums: {
    queryKey: 'user_total_albums',
    fetchFunction: (userId: number) => apiClient.users.getTotalAlbums(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: (styleClass: string) => <AlbumIcon styleClass={styleClass} />
  }
};
