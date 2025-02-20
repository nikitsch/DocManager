import { SelectOption } from '~shared/model/type';

export function getSelectOptions<Option extends SelectOption>(
  obj: Record<string, unknown>,
  keyTransform?: boolean,
  keyValue?: string
) {
  if (keyTransform) {
    return Object.keys(obj).map((key) => {
      return {
        [keyValue ? keyValue : 'value']: key,
        label: obj[key as keyof typeof obj],
      };
    }) as Option[];
  }

  return Object.values(obj).map((value) => {
    return {
      [keyValue ? keyValue : 'value']: value,
      label: value,
    };
  }) as Option[];
}
