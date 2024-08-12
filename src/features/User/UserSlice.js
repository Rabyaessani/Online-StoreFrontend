import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";



const themes = {
    light: "winter",
    dark: "night",
  };
  
  const getThemeFromLocalStorage = () =>{
    const theme = localStorage.getItem('theme') || themes.light
    document.documentElement.setAttribute("data-theme", theme);
    return theme;
  }

  const getUserFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('user')) || null
  }

  
const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage()
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user= {...action.payload.user, token:action.payload.jwt};
      state.user = user
      // console.log(state.user)
      localStorage.setItem('user',JSON.stringify(user))
    },
    logoutUser: (state) => {
      state.user=null;
      localStorage.removeItem('user')
    },
    toggleTheme: (state) => {
        const {light,dark}=themes
        state.theme = state.theme === light ? dark : light;
        document.documentElement.setAttribute("data-theme", state.theme);
        localStorage.setItem('theme',state.theme)
    },
  },
});

export const {loginUser,logoutUser,toggleTheme} = UserSlice.actions;

export default UserSlice.reducer
