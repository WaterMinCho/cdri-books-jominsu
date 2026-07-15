type IconProps = {
  size?: number;
  color?: string;
};

export const SearchIcon = ({ size = 24, color = '#8D94A0' }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M15.5 15.5L20 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const BookIcon = ({ size = 80 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
    >
      <circle
        cx="40"
        cy="40"
        r="40"
        fill="#9DCFD9"
      />
      <path
        d="M25 27C25 25.9 25.9 25 27 25H51C53.2 25 55 26.8 55 29V51C55 53.2 53.2 55 51 55H27C25.9 55 25 54.1 25 53V27Z"
        fill="#374C77"
      />
      <path
        d="M29 51H55V51C55 53.2 53.2 55 51 55H31C29.9 55 29 54.1 29 53V51Z"
        fill="#FFD166"
      />
      <path
        d="M29 47H55V51H29V47Z"
        fill="#FFFFFF"
      />
      <rect
        x="32"
        y="31"
        width="16"
        height="3"
        rx="1.5"
        fill="#FFFFFF"
      />
    </svg>
  );
};

export const ChevronDownIcon = ({ size = 16, color = '#6D7582' }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6L8 10L12 6"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CloseIcon = ({ size = 20, color = '#222222' }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};
