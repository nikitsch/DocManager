const DEFAULT_EXTENSION_PLACEHOLDER = '?¿';

export function getFileExtension(fileName: string) {
  return fileName.split('.').pop() ?? DEFAULT_EXTENSION_PLACEHOLDER;
}
