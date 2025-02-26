import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';

export const configBar = {
  userPost: {
    queryKey: 'top_users',
    axisKey: { yKey: 'postCount', xKey: 'userId' },
    tooltip: { xKey: 'UserId', yKey: 'sidebar.posts' },
    fetchFunction: () => apiClient.users.getTopUsers(),
    requiredRoles: [Roles.Admin, Roles.Moderator]
  },
  postCommented: {
    queryKey: 'top_posts',
    axisKey: { yKey: 'commentCount', xKey: 'title' },
    tooltip: { xKey: 'chart.title', yKey: 'chart.comments' },
    fetchFunction: () => apiClient.posts.getTopPosts(),
    requiredRoles: [Roles.Admin, Roles.Moderator]
  },
  userPostCommented: {
    queryKey: 'user_post_commented',
    axisKey: { yKey: 'commentCount', xKey: 'title' },
    tooltip: { xKey: 'chart.title', yKey: 'chart.comments' },
    fetchFunction: async (userId: number) => {
      const { commentsCounts } = await apiClient.posts.getUserPostComments(userId);
      return commentsCounts;
    },
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User]
  }
};

export const configPie = {
  gender: {
    queryKey: 'gender_number',
    fetchFunction: () => apiClient.users.getGenderCount(),
    requiredRoles: [Roles.Admin]
  },

  role: {
    queryKey: 'roles_number',
    fetchFunction: () => apiClient.users.getRolesCount(),
    requiredRoles: [Roles.Admin]
  }
};
