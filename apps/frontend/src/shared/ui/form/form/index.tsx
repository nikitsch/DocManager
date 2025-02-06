import { FormProvider } from 'react-hook-form';

import type { FormEventHandler, PropsWithChildren } from 'react';
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

export interface FormProps<TFormValues extends FieldValues>
  extends PropsWithChildren {
  form: UseFormReturn<TFormValues>;
  formId?: string;
  onSubmit: SubmitHandler<TFormValues>;
  onError?: SubmitErrorHandler<TFormValues>;
  onReset?: FormEventHandler<HTMLFormElement>;
}

export default function Form<TFormValues extends FieldValues = FieldValues>(
  props: FormProps<TFormValues>
) {
  const { form, formId, onSubmit, onError, onReset, children } = props;

  return (
    <FormProvider {...form}>
      <form
        id={formId}
        noValidate
        // autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit, onError)}
        onReset={onReset}
      >
        {children}
      </form>
    </FormProvider>
  );
}
