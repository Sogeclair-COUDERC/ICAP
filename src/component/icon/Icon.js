import React from "react";
import "./style.css";

const Icon = ({ id, name, color, size, onClick }) => {
  const icon_add = (
    <g>
      <path
        d="M256.108,3.02c-139.743,0-253,113.257-253,253s113.257,252.995,253,252.995c139.743,0,253-113.252,253-252.995S395.852,3.02,256.108,3.02z M256.108,488.775c-128.338,0-232.76-104.417-232.76-232.755   c0-128.339,104.422-232.76,232.76-232.76c128.338,0,232.76,104.421,232.76,232.76C488.868,384.358,384.446,488.775,256.108,488.775   z"
        fill="#37404D"
        stroke-width="3"
      />
      <polygon
        //   fill="#37404D"
        points="266.228,104.22 245.988,104.22 245.988,245.9 104.98,245.9 104.98,266.14 245.988,266.14 245.988,407.148 266.228,407.148 266.228,266.14 407.908,266.14 407.908,245.9 266.228,245.9  "
      />
    </g>
  );

  const icon_pen = (
    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
  );

  const icon_trash = (
    <path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" />
  );

  const icon_copy = (
    <path d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z" />
  );

  let path;
  switch (name) {
    case "add":
      path = icon_add;
      break;
    case "pen":
      path = icon_pen;
      break;
    case "trash":
      path = icon_trash;
      break;
    case "copy":
      path = icon_copy;
      break;
    default:
      path = <path />;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size || "1.2rem"}
      height={size || "1.2rem"}
      fill={color || "#37404D"}
      className="icon"
      id={id}
      onClick={onClick && ((e) => onClick(e))}
    >
      {path}
    </svg>
  );
};

export default Icon;