export default function Icon({ name = "arrow", ...props }) {
  const paths = {
    arrow: "M5 12h14m-6-6 6 6-6 6",
    search: "m21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    compass: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM16 8l-3 5-5 3 3-5 5-3",
    home: "m3 10 9-7 9 7v11H3V10Zm6 11v-8h6v8",
    grid: "M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM14 14h7v7h-7Z",
    sun: "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2",
    wave: "M2 8c4-6 6 6 10 0s6 6 10 0M2 16c4-6 6 6 10 0s6 6 10 0",
    mountain: "m2 21 8-17 12 17H2Zm5-11 3 3 3-4",
    culture: "M5 21V10h14v11M3 10h18L12 2 3 10Zm6 11v-7h6v7",
    sound: "M11 4 5 9H2v6h3l6 5V4Zm4 4c3 2 3 6 0 8m3-11c5 4 5 10 0 14",
    menu: "M4 7h16M4 17h16",
    close: "m6 6 12 12M6 18 18 6",
    heart: "M20 4c-3-2-6 0-8 2-2-2-5-4-8-2-5 5 0 10 8 17 8-7 13-12 8-17Z",
  };
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}
