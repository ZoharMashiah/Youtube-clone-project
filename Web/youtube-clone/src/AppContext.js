import React from "react";

const AppContext = React.createContext({
  currentUser: null,
  darkMode: false,
  setCurrentUser: () => {},
  toggleDarkMode: () => {},
});

export default AppContext;
