import { IconBulb, IconBulbFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { isMobile } from "../../util/screen";

type Theme = 'light' | 'dark';

export default function DarkModeButton() {
    const [theme, setTheme] = useState<Theme>(getBrowserTheme());
    const toggleTheme = () => {
        setTheme(theme => theme === 'light' ? 'dark' : 'light');
    }

    const [isButtonHover, setButtonHover] = useState<boolean>(false);

    useEffect(() => {
        setBrowserTheme(theme);
    }, [theme])
    
    return (
        <div>
            <button 
                className="bg-transparent hover:bg-none outline-none hover:outline-none focus:outline-none border-transparent focus:border-transparent"
                onClick={toggleTheme}
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}>
                {(!isMobile() && !isButtonHover) && <IconBulb {... theme == 'dark' && {color: "white"}} />}
                {(isMobile() || isButtonHover) && <IconBulbFilled {... theme == 'dark' && {color: "white"}} />}
            </button>
        </div>
    )
}

function getBrowserTheme(): Theme {
    if (localStorage.getItem('theme') !== 'null') {
        return localStorage.getItem('theme') as Theme;
    }
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        localStorage.setItem('theme', 'light');
        return 'light';
    }
    localStorage.setItem('theme', 'dark');
    return 'dark';
}

function setBrowserTheme(theme: Theme) {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
        document.querySelector('html')?.classList.remove('dark');
    } else {
        document.querySelector('html')?.classList.add('dark');
    }
}