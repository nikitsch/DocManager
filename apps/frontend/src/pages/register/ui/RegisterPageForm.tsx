import type { FC } from 'react';
import FormTextField from '~shared/ui/form/text-field';
import Form from '~shared/ui/form/form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useRegisterForm } from '../model/useRegisterForm';

const RegisterPageForm: FC = () => {
  const { form, isPending, onSubmit } = useRegisterForm();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Stack direction="column" spacing={2}>
        <FormTextField
          name="username"
          label="Username"
          minLength={5}
          required
        />
        <FormTextField
          name="password"
          label="Password"
          minLength={5}
          required
        />
        <FormTextField
          name="organization_name"
          label="Organization Name"
          minLength={5}
          required
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          loading={isPending}
        >
          Register
        </Button>
      </Stack>
    </Form>
  );
};

export default RegisterPageForm;
