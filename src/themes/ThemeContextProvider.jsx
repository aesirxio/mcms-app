import React from "react";
export const ThemesContext = React.createContext();

export class ThemesContextProvider extends React.Component {
  render() {
    return (
      <ThemesContext.Provider value={{ ...this.props.value }}>
        {this.props.children}
      </ThemesContext.Provider>
    );
  }
}
