import validator from 'validator';
import { z } from 'zod';

export const getRegisterSchema = (t: (key: string) => string) => {
  return z
    .object({
      first_name: z.string().nonempty(t('register.error.first_name_empty')).min(2, t('register.error.first_name_min')),
      last_name: z.string().nonempty(t('register.error.last_name_empty')).min(2, t('register.error.last_name_min')),
      username: z.string().nonempty(t('register.error.username_empty')).min(4, t('register.error.username_min')),
      email: z.string().nonempty(t('register.error.email_empty')).email(t('register.error.email_invalid')),
      phone: z
        .string()
        .nonempty(t('register.error.phone_empty'))
        .refine(validator.isMobilePhone, t('register.error.phone_invalid')),
      gender: z.string().nonempty(),
      password: z.string().nonempty(t('register.error.password_empty')).min(8, t('register.error.password_min')),
      confirm_password: z.string().nonempty(t('register.error.confirm_password_empty'))
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t('register.error.confirm_password_invalid'),
      path: ['confirm_password']
    });
};

export const getUsersSchema = (t: (key: string) => string) => {
  return z
    .object({
      first_name: z.string().nonempty(t('register.error.first_name_empty')).min(2, t('register.error.first_name_min')),
      last_name: z.string().nonempty(t('register.error.last_name_empty')).min(2, t('register.error.last_name_min')),
      username: z.string().nonempty(t('register.error.username_empty')).min(4, t('register.error.username_min')),
      email: z.string().nonempty(t('register.error.email_empty')).email(t('register.error.email_invalid')),
      phone: z
        .string()
        .nonempty(t('register.error.phone_empty'))
        .refine(validator.isMobilePhone, t('register.error.phone_invalid')),
      gender: z.string().nonempty(),
      role: z.string().nonempty(),
      password: z.string().nonempty(t('register.error.password_empty')).min(8, t('register.error.password_min')),
      confirm_password: z.string().nonempty(t('register.error.confirm_password_empty'))
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t('register.error.confirm_password_invalid'),
      path: ['confirm_password']
    });
};

export const getLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z.string().nonempty(t('login.error.email_empty')).email(t('login.error.email_invalid')),
    password: z.string().nonempty(t('login.error.password_empty'))
  });
};
