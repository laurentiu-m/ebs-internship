import cn from 'classnames';
import { FieldError, FieldValues, UseFormRegister, Path } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  type: string;
  label: string;
  placeholder: string;
  error: FieldError | undefined;
};

export const FormInput = <T extends FieldValues>({
  register,
  name,
  type,
  label,
  placeholder,
  error
}: InputProps<T>) => {
  return (
    <div className="form__input">
      <div className="form__input-wrapper">
        <label htmlFor={name} className="form__input-label">
          {label}
          <span className="form__input-required">*</span>
        </label>
        <input
          {...register(name)}
          id={name}
          type={type}
          placeholder={placeholder}
          className={cn('form__input-field', { 'form__input-field--error': error })}
        />
      </div>
      {error && <p className="form__input-error">{error?.message}</p>}
    </div>
  );
};
