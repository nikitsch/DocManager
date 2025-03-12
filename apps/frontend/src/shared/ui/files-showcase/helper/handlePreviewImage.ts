export const handlePreviewImage = (file: File) => {
  if (!file.type.startsWith('image/')) {
    return console.error('Preview is available for images only');
  }

  const url = URL.createObjectURL(file);
  window.open(url, '_blank');
};
