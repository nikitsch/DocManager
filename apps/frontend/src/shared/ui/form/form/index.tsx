import { useId } from 'react';
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
  onSubmit?: SubmitHandler<TFormValues>;
  onError?: SubmitErrorHandler<TFormValues>;
  onReset?: FormEventHandler<HTMLFormElement>;
  // onChange?: (event: ChangeEvent<HTMLFormElement>) => void;
}

export default function Form<TFormValues extends FieldValues = FieldValues>(
  props: FormProps<TFormValues>
) {
  const {
    form,
    // eslint-disable-next-line
    onSubmit = () => {},
    onError,
    onReset,
    children,
  } = props;

  const id = useId();

  return (
    <FormProvider {...form}>
      <form
        id={id}
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
