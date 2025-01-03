import { FieldError, FieldValues, UseFormRegister, Path } from 'react-hook-form';
import '../index.scss';

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
      placeholder={error?.message || placeholder}
      className={`form__input ${error && 'form__input--error'}`}
    />
  );
};
