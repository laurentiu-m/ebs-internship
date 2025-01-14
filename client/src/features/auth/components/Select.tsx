import { FieldValues, UseFormRegister, Path, FieldError } from 'react-hook-form';

type SelectProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  options: { value: string; text: string }[];
  description: string;
  error: FieldError | undefined;
};

export const Select = <T extends FieldValues>({ register, name, options, description, error }: SelectProps<T>) => {
  return (
    <select {...register(name)} defaultValue="" className={`form__select ${error && 'form__select--error'}`}>
      <option value="" disabled>
        {description}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};
