import { createSvgIcon } from '@mui/material/utils';
import theme from '~shared/config/muiTheme';

export const ArrowUpIcon = createSvgIcon(
  <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" />,
  'ArrowUp'
);

export const CreateIcon = createSvgIcon(
  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    <g id="File-New">
      <rect
        id="Rectangle"
        fillRule="nonzero"
        x="0"
        y="0"
        width="24"
        height="24"
      ></rect>
      <path
        d="M4,5 C4,3.89543 4.89543,3 6,3 L15.1716,3 C15.702,3 16.2107,3.21071 16.5858,3.58579 L19.4142,6.41421 C19.7893,6.78929 20,7.29799 20,7.82843 L20,19 C20,20.1046 19.1046,21 18,21 L6,21 C4.89543,21 4,20.1046 4,19 L4,5 Z"
        id="Path"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      ></path>
      <path
        d="M15,4 L15,6 C15,7.10457 15.8954,8 17,8 L19,8"
        id="Path"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      ></path>
      <line
        x1="12"
        y1="9"
        x2="12"
        y2="15"
        id="Path"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      ></line>
      <line
        x1="9"
        y1="12"
        x2="15"
        y2="12"
        id="Path"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      ></line>
    </g>
  </g>,
  'Create'
);

export const CrossIcon = createSvgIcon(
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L6.53035 18.5303C6.23745 18.8232 5.76258 18.8232 5.46969 18.5303C5.17679 18.2374 5.17679 17.7626 5.46968 17.4697L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967Z"
    ></path>
  </>,
  'Cross'
);

export const DownloadFileIcon = createSvgIcon(
  <path d="M5.625 15C5.625 14.5858 5.28921 14.25 4.875 14.25C4.46079 14.25 4.125 14.5858 4.125 15H5.625ZM4.875 16H4.125H4.875ZM19.275 15C19.275 14.5858 18.9392 14.25 18.525 14.25C18.1108 14.25 17.775 14.5858 17.775 15H19.275ZM11.1086 15.5387C10.8539 15.8653 10.9121 16.3366 11.2387 16.5914C11.5653 16.8461 12.0366 16.7879 12.2914 16.4613L11.1086 15.5387ZM16.1914 11.4613C16.4461 11.1347 16.3879 10.6634 16.0613 10.4086C15.7347 10.1539 15.2634 10.2121 15.0086 10.5387L16.1914 11.4613ZM11.1086 16.4613C11.3634 16.7879 11.8347 16.8461 12.1613 16.5914C12.4879 16.3366 12.5461 15.8653 12.2914 15.5387L11.1086 16.4613ZM8.39138 10.5387C8.13662 10.2121 7.66533 10.1539 7.33873 10.4086C7.01212 10.6634 6.95387 11.1347 7.20862 11.4613L8.39138 10.5387ZM10.95 16C10.95 16.4142 11.2858 16.75 11.7 16.75C12.1142 16.75 12.45 16.4142 12.45 16H10.95ZM12.45 5C12.45 4.58579 12.1142 4.25 11.7 4.25C11.2858 4.25 10.95 4.58579 10.95 5H12.45ZM4.125 15V16H5.625V15H4.125ZM4.125 16C4.125 18.0531 5.75257 19.75 7.8 19.75V18.25C6.61657 18.25 5.625 17.2607 5.625 16H4.125ZM7.8 19.75H15.6V18.25H7.8V19.75ZM15.6 19.75C17.6474 19.75 19.275 18.0531 19.275 16H17.775C17.775 17.2607 16.7834 18.25 15.6 18.25V19.75ZM19.275 16V15H17.775V16H19.275ZM12.2914 16.4613L16.1914 11.4613L15.0086 10.5387L11.1086 15.5387L12.2914 16.4613ZM12.2914 15.5387L8.39138 10.5387L7.20862 11.4613L11.1086 16.4613L12.2914 15.5387ZM12.45 16V5H10.95V16H12.45Z" />,
  'DownloadFile'
);

export const RefreshIcon = createSvgIcon(
  <g data-name="refresh">
    <rect width="24" height="24" opacity="0" />
    <path d="M20.3 13.43a1 1 0 0 0-1.25.65A7.14 7.14 0 0 1 12.18 19 7.1 7.1 0 0 1 5 12a7.1 7.1 0 0 1 7.18-7 7.26 7.26 0 0 1 4.65 1.67l-2.17-.36a1 1 0 0 0-1.15.83 1 1 0 0 0 .83 1.15l4.24.7h.17a1 1 0 0 0 .34-.06.33.33 0 0 0 .1-.06.78.78 0 0 0 .2-.11l.09-.11c0-.05.09-.09.13-.15s0-.1.05-.14a1.34 1.34 0 0 0 .07-.18l.75-4a1 1 0 0 0-2-.38l-.27 1.45A9.21 9.21 0 0 0 12.18 3 9.1 9.1 0 0 0 3 12a9.1 9.1 0 0 0 9.18 9A9.12 9.12 0 0 0 21 14.68a1 1 0 0 0-.7-1.25z" />
  </g>,
  'Refresh'
);

export const SearchIcon = createSvgIcon(
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z"
  />,
  'Search'
);

//* Status Icons
export const NewStatusIcon = createSvgIcon(
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="NewStatus" data-name="NewStatus">
      <g id="invisible_box" data-name="invisible box">
        <rect width="48" height="48" fill="none" />
      </g>
      <g id="icons_Q2" data-name="icons Q2">
        <path
          d="M44,14H4a2,2,0,0,0-2,2V32a2,2,0,0,0,2,2H44a2,2,0,0,0,2-2V16A2,2,0,0,0,44,14ZM17.3,29H14.8l-3-5-.7-1.3h0V29H8.7V19h2.5l3,5,.6,1.3h.1s-.1-1.2-.1-1.6V19h2.5Zm9.1,0H18.7V19h7.6v2H21.2v1.8h4.4v2H21.2v2.1h5.2Zm10.9,0H34.8l-1-4.8c-.2-.8-.4-1.9-.4-1.9h0s-.2,1.1-.3,1.9L32,29H29.6L26.8,19h2.5l1,4.2a20.1,20.1,0,0,1,.5,2.5h0l.5-2.4,1-4.3h2.3l.9,4.3.5,2.4h0l.5-2.5,1-4.2H40Z"
          fill={theme.palette.success.main}
        />
      </g>
    </g>
  </svg>,
  'NewStatus'
);

export const InProcessStatusIcon = createSvgIcon(
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.25 19.25H17.59C17.21 17.89 16.04 14.51 13.19 12C16.04 9.49 17.21 6.11 17.59 4.75H18.25C18.66 4.75 19 4.41 19 4C19 3.59 18.66 3.25 18.25 3.25H5.75C5.34 3.25 5 3.59 5 4C5 4.41 5.34 4.75 5.75 4.75H6.41C6.79 6.11 7.96 9.49 10.81 12C7.96 14.51 6.79 17.89 6.41 19.25H5.75C5.34 19.25 5 19.59 5 20C5 20.41 5.34 20.75 5.75 20.75H18.25C18.66 20.75 19 20.41 19 20C19 19.59 18.66 19.25 18.25 19.25ZM7.98 4.75H16.01C15.56 6.17 14.41 9 11.99 11.03C9.57 8.99 8.42 6.17 7.97 4.75H7.98ZM12 12.97C14.42 15.01 15.57 17.83 16.02 19.25H7.98C8.43 17.83 9.58 15 12 12.97Z"
      fill={theme.palette.secondary.main}
    />
  </svg>,
  'InProcessStatus'
);

export const RejectedStatusIcon = createSvgIcon(
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 5L5 19M5.00001 5L19 19"
      stroke={theme.palette.error.main}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  'RejectedStatus'
);

export const FinishedStatusIcon = createSvgIcon(
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.5163 8.93451L11.0597 14.7023L8.0959 11.8984"
      stroke={theme.palette.primary.main}
      strokeWidth="2"
    />
    <path
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
      stroke={theme.palette.primary.main}
      strokeWidth="2"
    />
  </svg>,
  'FinishedStatus'
);
