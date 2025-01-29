import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';
import { AlbumIcon, CommentIcon, PostIcon, UserIcon } from '@src/components';

export const configStats = {
  totalUsers: {
    queryKey: 'total_users',
    fetchFunction: () => apiClient.users.getTotalUsers(),
    requiredRoles: [Roles.Admin, Roles.Moderator],
    icon: (styleClass: string) => <UserIcon styleClass={styleClass} />
  },
  totalPosts: {
    queryKey: 'total_posts',
    fetchFunction: () => apiClient.posts.getTotalPosts(),
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
    fetchFunction: (userId: number) => apiClient.posts.getUserTotalPosts(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: (styleClass: string) => <PostIcon styleClass={styleClass} />
  },
  totalUserComments: {
    queryKey: 'total_user_comments',
    fetchFunction: (userId: number) => apiClient.comments.getTotalUserComments(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: (styleClass: string) => <CommentIcon styleClass={styleClass} />
  },
  totalCommentedPosts: {
    queryKey: 'user_post_comments',
    fetchFunction: (userId: number) => apiClient.comments.getTotalUserComments(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: (styleClass: string) => <CommentIcon styleClass={styleClass} />
  },
  totalAlbums: {
    queryKey: 'user_total_albums',
    fetchFunction: (userId: number) => apiClient.comments.getTotalUserComments(userId),
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User],
    icon: (styleClass: string) => <AlbumIcon styleClass={styleClass} />
  }
};
