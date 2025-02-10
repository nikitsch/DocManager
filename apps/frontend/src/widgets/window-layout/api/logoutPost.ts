export const logoutPost = async () => {
  await fetch('api/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
};
