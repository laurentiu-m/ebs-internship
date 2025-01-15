import { FieldError, FieldValues, UseFormRegister, Path } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  type: string;
  placeholder: string;
  error: FieldError | undefined;
};

export const FormInput = <T extends FieldValues>({ register, name, type, placeholder, error }: InputProps<T>) => {
  return (
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className={`form__input ${error && 'form__input--error'}`}
    />
  );
};
