export const checkAuth = async () => {
  const res = await fetch('api/auth/check');

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Authorization error');
  }

  return res.json();
};