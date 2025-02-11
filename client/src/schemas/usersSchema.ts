import validator from 'validator';
import { z } from 'zod';

export const getRegisterSchema = (t: (key: string) => string) => {
  return z
    .object({
      first_name: z.string().nonempty(t('error.first_name_empty')).refine(validator.isAlpha, t('error.name_letters')),
      last_name: z.string().nonempty(t('error.last_name_empty')).refine(validator.isAlpha, t('error.name_letters')),
      username: z.string().nonempty(t('error.username_empty')).min(4, t('error.username_min')),
      email: z.string().nonempty(t('error.email_empty')).email(t('error.email_invalid')),
      phone: z.string().nonempty(t('error.phone_empty')).refine(validator.isMobilePhone, t('error.phone_invalid')),
      gender: z.string().nonempty(),
      password: z.string().nonempty(t('error.password_empty')).min(8, t('error.password_min')),
      confirm_password: z.string().nonempty(t('error.confirm_password_empty'))
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t('error.confirm_password_invalid'),
      path: ['confirm_password']
    });
};

export const getUsersSchema = (t: (key: string) => string) => {
  return z
    .object({
      first_name: z.string().nonempty(t('error.first_name_empty')).refine(validator.isAlpha, t('error.name_letters')),
      last_name: z.string().nonempty(t('error.last_name_empty')).refine(validator.isAlpha, t('error.name_letters')),
      username: z.string().nonempty(t('error.username_empty')).min(4, t('error.username_min')),
      email: z.string().nonempty(t('error.email_empty')).email(t('error.email_invalid')),
      phone: z.string().nonempty(t('error.phone_empty')).refine(validator.isMobilePhone, t('error.phone_invalid')),
      gender: z.string().nonempty(),
      role: z.string().nonempty(),
      password: z.string().nonempty(t('error.password_empty')).min(8, t('error.password_min')),
      confirm_password: z.string().nonempty(t('error.confirm_password_empty'))
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t('error.confirm_password_invalid'),
      path: ['confirm_password']
    });
};

export const getLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z.string().nonempty(t('error.email_empty')).email(t('error.email_invalid')),
    password: z.string().nonempty(t('error.password_empty'))
  });
};
