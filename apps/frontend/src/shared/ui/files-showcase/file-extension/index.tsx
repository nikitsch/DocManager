import { getFileExtensionColor } from '~shared/model/helper/getFileExtensionColor';

import type { FC } from 'react';

interface IFileExtensionProps {
  extension: string;
}

const FileExtension: FC<IFileExtensionProps> = (props) => {
  const { extension } = props;

  const color = getFileExtensionColor(extension);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="88"
      height="104"
      fill="none"
    >
      <path
        d="M10 38V44H38V38"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 20V14L30 4H10V20"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 4V14H38"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 12H20"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="20"
        width="40"
        height="18"
        rx="2"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <text
        x="50%"
        y="33"
        fontSize="11"
        fill={color}
        fontFamily="Arial Black"
        fontWeight="bold"
        textAnchor="middle"
      >
        {extension.toUpperCase()}
      </text>
    </svg>
  );
};

export default FileExtension;
