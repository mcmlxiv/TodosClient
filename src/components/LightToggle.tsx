import React from "react";
import "./TodoList.css";
import { IconButton, PaletteType, Tooltip } from "@material-ui/core";

interface lights {
  language: boolean;
  newTheme: { palette: { type: PaletteType } };
  toggleDarkTheme: () => void;
}
const LightToggle: React.FC<lights> = ({
  language,
  newTheme,
  toggleDarkTheme,
}) => {
  return (
    <Tooltip
      title={`${
        language
          ? `${
              newTheme.palette.type === "dark"
                ? `Turn the lights on!`
                : "Lights Out!"
            }`
          : `${newTheme.palette.type === "dark" ? "打開燈" : "關燈"}`
      }`}
    >
      <IconButton
        color="inherit"
        aria-label={`${
          language
            ? `${
                newTheme.palette.type === "dark"
                  ? `Turn the lights on!`
                  : "Lights Out!"
              }`
            : `${newTheme.palette.type === "dark" ? "打開燈" : "關燈"}`
        }`}
        onClick={toggleDarkTheme}
        edge="start"
        //clsx constructing classname conditional
        //className={lights}
      >
        {newTheme.palette.type === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            display="block"
            id="Sun"
            style={{ color: "#fb8500" }}
          >
            <path d="M12 3V2m0 20v-1m9-9h1M2 12h1m16-7l1-1M4 20l1-1M4 4l1 1m14 14l1 1m-2-8a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            display="block"
            id="Moon"
            style={{ color: "#1d4e89" }}
          >
            <path d="M20.958 15.325c.204-.486-.379-.9-.868-.684a7.684 7.684 0 01-3.101.648c-4.185 0-7.577-3.324-7.577-7.425a7.28 7.28 0 011.134-3.91c.284-.448-.057-1.068-.577-.936C5.96 4.041 3 7.613 3 11.862 3 16.909 7.175 21 12.326 21c3.9 0 7.24-2.345 8.632-5.675z" />
            <path d="M15.611 3.103c-.53-.354-1.162.278-.809.808l.63.945a2.332 2.332 0 010 2.588l-.63.945c-.353.53.28 1.162.81.808l.944-.63a2.332 2.332 0 012.588 0l.945.63c.53.354 1.162-.278.808-.808l-.63-.945a2.332 2.332 0 010-2.588l.63-.945c.354-.53-.278-1.162-.809-.808l-.944.63a2.332 2.332 0 01-2.588 0l-.945-.63z" />
          </svg>
        )}
      </IconButton>
    </Tooltip>
  );
};

export default LightToggle;
