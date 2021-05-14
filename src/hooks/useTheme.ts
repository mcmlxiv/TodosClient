//Dark/light theme

import { useState } from "react";
import { PaletteType } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const useTheme = (initial: string) => {
  const [theme, setTheme] = useState({
    palette: { type: initial as PaletteType },
  });

  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    localStorage.setItem("theme", newPaletteType);
    setTheme({ palette: { type: newPaletteType as PaletteType } });
  };
  //@typescript-eslint/no-unused-vars
  const muiTheme = createMuiTheme(theme);
  const newTheme = theme;
  return { toggleDarkTheme, muiTheme, newTheme };
};
export { useTheme };
