export const omitFalsy = (obj: {
  [key: string]: number | string | null | undefined;
}) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => Boolean(value))
  ) as { [key: string]: number | string };
