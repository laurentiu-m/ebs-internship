import cn from 'classnames';
import { FieldError, FieldValues, UseFormRegister, Path } from 'react-hook-form';

type TextareaProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  error?: FieldError;
};

export const FormTextarea = <T extends FieldValues>({
  register,
  name,
  label,
  placeholder,
  error
}: TextareaProps<T>) => {
  return (
    <div className="form__textarea">
      <div className="form__textarea-wrapper">
        <label htmlFor={name} className="form__textarea-label">
          {label}
          <span className="form__textarea-required">*</span>
        </label>
        <textarea
          {...register(name)}
          id={name}
          placeholder={placeholder}
          className={cn('form__textarea-field', { 'form__textarea-field--error': error })}
        />
      </div>
      {error && <p className="form__input-error">{error?.message}</p>}
    </div>
  );
};
