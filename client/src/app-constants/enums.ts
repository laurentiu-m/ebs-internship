export enum Roles {
  Admin = 'admin',
  Moderator = 'moderator',
  User = 'user'
}

export enum Routes {
  Login = '/login',
  Register = '/register',
  Dashboard = '/dashboard',
  Users = '/users',
  UsersCreate = '/users/create',
  UsersEdit = '/users/:id/edit',
  Posts = '/posts',
  Error = '/error',
  NotFound = '*'
}

export enum Genders {
  Male = 'male',
  Female = 'female',
  PreferNotToSay = 'prefer_not_to_say'
}
