import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/Theme";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";

function App() {

    const [themeMode, setThemeMode] = useState("light")

    const lightTheme = () => {
        setThemeMode("light")
    }
    const darkTheme = () => {
        setThemeMode("dark")
    }

    useEffect(() => {
        console.log("Theme mode changed to:", themeMode);
        const htmlElement = document.querySelector('html');
        console.log("Before class update:", htmlElement.className);
        htmlElement.classList.remove("light", "dark")
        htmlElement.classList.add(themeMode)
        console.log("After class update:", htmlElement.className);
    }, [themeMode])
    

    return (
        <>
        <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
            <div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                        <ThemeBtn/>
                    </div>
                    <div className="w-full max-w-sm mx-auto">
                        <Card/>
                    </div>
                </div>
            </div>
        </ThemeProvider>
        </>
    );
}

export default App;
