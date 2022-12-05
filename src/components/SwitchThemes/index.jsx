import React from "react";
import "./index.scss";
// import listThemes from "./index.module.scss";
import { ThemesContext } from "themes/ThemeContextProvider";
import ComponentImage from "components/ComponentImage";

class SwitchThemes extends React.Component {
  render() {
    const { theme, changeTheme } = this.context;
    return (
      <div className="cursor-pointer">
        <ComponentImage
          src={
            theme === "light"
              ? "/assets/images/night_mode.svg"
              : "/assets/images/light_mode.svg"
          }
          alt={
            theme === "light"
              ? "/assets/images/night_mode.svg"
              : "/assets/images/light_mode.svg"
          }
          className="py-2 ps-2 color-white"
          value={theme}
          onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
        />
      </div>
    );
  }
}
SwitchThemes.contextType = ThemesContext;
export default SwitchThemes;
