import { createContext, useContext, useEffect, useState } from "react";
import {useLocalStorageState} from '../hooks/useLocalStorageState'
const DarkModeContext=createContext();


function DarkModeProvider({children}){
    const[isDarkMode, setisDarkMode]=useLocalStorageState(false, "isDarkMode");

    function toggleDarkMode(){
        setisDarkMode((e)=>!e)
    }
   useEffect(()=>{
      if(isDarkMode) {
        document.documentElement.classList.add('dark-mode')
        document.documentElement.classList.remove('light-mode')
      }else{
          document.documentElement.classList.add('light-mode')
        document.documentElement.classList.remove('dark-mode')

      }
   }, [isDarkMode])
    return (<DarkModeContext.Provider value={
       { isDarkMode,
        toggleDarkMode}
    }> 
        {children}
    </DarkModeContext.Provider>
    )
}

function useDarkMode(){
    const context=useContext(DarkModeContext);
    if(context===undefined) throw new Error('DarkModeContext was use outside DarkModeProvider')
    return context;
}

export{DarkModeProvider, useDarkMode}