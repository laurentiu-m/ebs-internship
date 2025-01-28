import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';

export const configStats = {
  totalUsers: {
    title: 'Total Users',
    queryKey: ['total_users'],
    fetchFunction: () => apiClient.users.getTotalUsers(),
    requiredRoles: [Roles.Admin, Roles.Moderator]
  },
  totalPosts: {
    title: 'Total Posts',
    queryKey: ['total_posts'],
    fetchFunction: () => apiClient.posts.getTotalPosts(),
    requiredRoles: [Roles.Admin, Roles.Moderator]
  },
  totalComments: {
    title: 'Total Comments',
    queryKey: ['total_comments'],
    fetchFunction: () => apiClient.comments.getTotalComments(),
    requiredRoles: [Roles.Admin, Roles.Moderator]
  },
  totalUserPosts: {
    title: 'Your Total Posts',
    queryKey: ['total_user_posts'],
    fetchFunction: (userId: number) => apiClient.posts.getUserTotalPosts(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User]
  },
  totalUserComments: {
    title: 'Total Comments On Your Posts',
    queryKey: ['total_user_comments'],
    fetchFunction: (userId: number) => apiClient.comments.getTotalUserComments(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User]
  },
  totalCommentedPosts: {
    title: 'Total Comments You Made',
    queryKey: ['user_post_comments'],
    fetchFunction: (userId: number) => apiClient.comments.getTotalUserComments(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User]
  },
  totalAlbums: {
    title: 'Your Total Albums',
    queryKey: ['user_total_albums'],
    fetchFunction: (userId: number) => apiClient.comments.getTotalUserComments(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User]
  }
};
