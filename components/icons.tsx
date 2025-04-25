import type React from "react"
export function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" {...props}>
      <path
        fill="currentColor"
        d="M12 22q-2.05 0-3.875-.788t-3.188-2.15-2.137-3.175T2 12q0-2.075.788-3.9t2.15-3.175 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.15 2.15 3.175T22 12q0 2.05-.788 3.875t-2.15 3.188-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8q-.825 0-1.413-.587T10 10q0-.825.588-1.413T12 8q.825 0 1.413.588T14 10q0 .825-.588 1.413T12 12Zm-4 4h8q0-.825-.425-1.5t-1.15-1.075q-.725.5-1.563.788T12 14.5q-.75 0-1.438-.25t-1.462-.75q-.8.35-1.3 1.037T7.05 16.001H8Zm4-2.5Z"
      />
    </svg>
  )
}

export function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" {...props}>
      <path
        fill="currentColor"
        d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"
      />
    </svg>
  )
}
