import { SelectReact } from '@src/components/SelectReact';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type SelectProps<T extends FieldValues> = {
  context?: string;
  name: Path<T>;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  control: Control<T>;
  error: FieldError | undefined;
};

export const FormSelect = <T extends FieldValues>({
  context,
  name,
  label,
  options,
  placeholder,
  control,
  error
}: SelectProps<T>) => {
  const { t } = useTranslation();
  return (
    <div className="form__select">
      <div className="form__select-wrapper">
        <label htmlFor={name} className="form__select-label">
          {label}
          <span className="form__select-required">*</span>
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <SelectReact
              placeholder={placeholder}
              options={options}
              error={error}
              onChange={(newValue) => {
                const selectedValue = newValue as { value: string; label: string };
                field.onChange(selectedValue ? selectedValue.value : undefined);
              }}
            />
          )}
        />
      </div>
      {error && <p className="form__select-error">{t(`${context}.error.${name}_empty`)}</p>}
    </div>
  );
};
