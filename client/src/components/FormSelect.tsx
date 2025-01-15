import { SelectReact } from '@src/components/SelectReact';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type SelectProps<T extends FieldValues> = {
  name: Path<T>;
  options: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  control: Control<T>;
};

export const FormSelect = <T extends FieldValues>({ name, options, placeholder, control }: SelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectReact
          placeholder={placeholder}
          options={options}
          onChange={(newValue) => {
            const selectedValue = newValue as { value: string; label: string };
            field.onChange(selectedValue ? selectedValue.value : undefined);
          }}
        />
      )}
    />
  );
};
