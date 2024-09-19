import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollTop() {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
    
}

export function shuffleArray(array: any[]) {
	var bool = [1, -1];
	return array.concat().sort(function (a, b) {
		return bool[Math.floor(Math.random() * bool.length)];
	})
}