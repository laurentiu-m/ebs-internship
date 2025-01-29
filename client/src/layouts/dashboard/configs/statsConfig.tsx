import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';
import { AlbumIcon, CommentIcon, PostIcon, UserIcon } from '@src/components';

export const configStats = {
  totalUsers: {
    title: 'Total Users',
    queryKey: ['total_users'],
    fetchFunction: () => apiClient.users.getTotalUsers(),
    requiredRoles: [Roles.Admin, Roles.Moderator],
    icon: (styleClass: string) => <UserIcon styleClass={styleClass} />
  },
  totalPosts: {
    title: 'Total Posts',
    queryKey: ['total_posts'],
    fetchFunction: () => apiClient.posts.getTotalPosts(),
    requiredRoles: [Roles.Admin, Roles.Moderator],
    icon: (styleClass: string) => <PostIcon styleClass={styleClass} />
  },
  totalComments: {
    title: 'Total Comments',
    queryKey: ['total_comments'],
    fetchFunction: () => apiClient.comments.getTotalComments(),
    requiredRoles: [Roles.Admin, Roles.Moderator],
    icon: (styleClass: string) => <CommentIcon styleClass={styleClass} />
  },
  totalUserPosts: {
    title: 'Your Total Posts',
    queryKey: ['total_user_posts'],
    fetchFunction: (userId: number) => apiClient.posts.getUserTotalPosts(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: (styleClass: string) => <PostIcon styleClass={styleClass} />
  },
  totalUserComments: {
    title: 'Total Comments On Your Posts',
    queryKey: ['total_user_comments'],
    fetchFunction: (userId: number) => apiClient.comments.getTotalUserComments(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: (styleClass: string) => <CommentIcon styleClass={styleClass} />
  },
  totalCommentedPosts: {
    title: 'Total Comments You Made',
    queryKey: ['user_post_comments'],
    fetchFunction: (userId: number) => apiClient.comments.getTotalUserComments(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: (styleClass: string) => <CommentIcon styleClass={styleClass} />
  },
  totalAlbums: {
    title: 'Your Total Albums',
    queryKey: ['user_total_albums'],
    fetchFunction: (userId: number) => apiClient.comments.getTotalUserComments(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: (styleClass: string) => <AlbumIcon styleClass={styleClass} />
  }
};
