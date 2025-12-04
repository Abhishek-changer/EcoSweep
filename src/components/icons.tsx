import type { SVGProps } from "react";

export function EcoSweepLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c-5 0-8-2.5-8-6s3-6 8-6 8 2.5 8 6-3 6-8 6Z" />
      <path d="M12 2a4 4 0 0 0-4 4v2" />
      <path d="M16 2a4 4 0 0 1 4 4v2" />
      <path d="M12 10a4 4 0 0 0-4-4" />
      <path d="M12 10a4 4 0 0 1 4-4" />
    </svg>
  );
}
