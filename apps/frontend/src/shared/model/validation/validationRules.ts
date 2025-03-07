import { FieldValues, RegisterOptions } from 'react-hook-form';

export const validationRules = (
  required?: boolean,
  minLength?: number,
  maxLength?: number
):
  | Omit<
      RegisterOptions<FieldValues, string>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined => ({
  required: required ? 'Field is required' : undefined,
  maxLength: maxLength
    ? {
        value: maxLength,
        message: `Field must be no more than ${maxLength} characters long`,
      }
    : undefined,
  minLength: minLength
    ? {
        value: minLength,
        message: `Field must be at least ${minLength} characters long`,
      }
    : undefined,
});
