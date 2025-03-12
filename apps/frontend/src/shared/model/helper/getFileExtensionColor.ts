export function getFileExtensionColor(extension: string) {
  return fileExtensionColors[extension] ?? '#00A850';
}

const fileExtensionColors: Record<string, string> = {
  txt: '#4D4D4D', // Gray
  pdf: '#D32F2F', // Red
  doc: '#2A5699', // Blue (Word)
  docx: '#2A5699', // Blue (Word)
  xls: '#217346', // Green (Excel)
  xlsx: '#217346', // Green (Excel)
  ppt: '#D24726', // Orange (PowerPoint)
  pptx: '#D24726', // Orange (PowerPoint)
  csv: '#B5BD00', // Yellow-green
  jpg: '#F7A80D', // Orange
  jpeg: '#F7A80D', // Orange
  png: '#29B6F6', // Light Blue
  gif: '#FF4081', // Pink
  svg: '#FFB300', // Yellow
  zip: '#9E9E9E', // Gray
  rar: '#616161', // Dark Gray
  '7z': '#795548', // Brown
  mp3: '#E91E63', // Pink (Audio)
  wav: '#9C27B0', // Purple (Audio)
  mp4: '#2196F3', // Blue (Video)
  avi: '#3F51B5', // Dark Blue (Video)
  mov: '#009688', // Teal (Video)
  html: '#E44D26', // Reddish Orange
  css: '#1572B6', // Blue
  js: '#F7DF1E', // Yellow
  ts: '#3178C6', // Light Blue
  json: '#000000', // Black
  xml: '#F77B00', // Orange
  exe: '#333333', // Dark Gray
  dll: '#607D8B', // Grayish Blue
};
