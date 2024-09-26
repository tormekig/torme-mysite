import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollTop() {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
    
}

export function shuffleArray<T>(array: T[]) {
	const bool = [1, -1];
	return array.concat().sort(function () {
		return bool[Math.floor(Math.random() * bool.length)];
	})
}

export function isWithinRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}