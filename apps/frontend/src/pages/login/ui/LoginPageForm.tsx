import type { FC } from 'react';
import FormTextField from '~shared/ui/form/text-field';
import Form from '~shared/ui/form/form';
import { useLoginForm } from '../model/useLoginForm';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const LoginPageForm: FC = () => {
  const { form, isPending, onSubmit } = useLoginForm();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Stack direction="column" spacing={2}>
        <FormTextField name="username" label="Username" required />
        <FormTextField
          type="password"
          name="password"
          label="Password"
          minLength={5}
          required
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          loading={isPending}
        >
          Login
        </Button>
      </Stack>
    </Form>
  );
};

export default LoginPageForm;
