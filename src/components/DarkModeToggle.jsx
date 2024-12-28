import PropTypes from "prop-types";
import { useEffect } from "react";

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
    useEffect(() => {
        // Check localStorage to see if dark mode is enabled
        const darkModeState = localStorage.getItem("darkMode");
        if (darkModeState === "true") {
            window.document.documentElement.classList.add("dark");
        } else {
            window.document.documentElement.classList.remove("dark");
        }
    }, []);
    const toggleDarkMode = () => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.remove("dark");
            localStorage.setItem("darkMode", "false"); // Save state as false
        } else {
            root.classList.add("dark");
            localStorage.setItem("darkMode", "true"); // Save state as true
        }
        onToggle();
    };

    return (
        <button
            className={`relative inline-flex items-center rounded-full ${isDarkMode ? "bg-slate-700" : "bg-gradient-to-l from-red-600 via-orange-500 to-yellow-400"} px-2 py-1.5 text-slate-400 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
            id="dark-mode-toggle"
            role="switch"
            type="button"
            tabIndex="0"
            aria-checked={isDarkMode}
            onClick={toggleDarkMode}
            data-headlessui-state={isDarkMode ? "checked" : ""}
            data-checked={isDarkMode ? "true" : "false"}
        >
            <span className="sr-only">Enable dark mode</span>

            {/* Icon: Sun */}
            <svg
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
                className={`scale-${isDarkMode ? "100" : "0"} transform transition-transform duration-300`}
            >
                <path
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
                <path
                    d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7l-1-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </svg>

            {/* Icon: Moon */}
            <svg
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
                className={`scale-${isDarkMode ? "0" : "100"} ${isDarkMode ? "" : "text-orange-200"} ml-3.5 transform transition-transform duration-500`}
            >
                <path
                    d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </svg>

            {/* Toggle knob */}
            <span
                className={`${isDarkMode ? "translate-x-[2.625rem]" : "translate-x-0"} absolute left-0.5 top-0.5 flex h-8 w-8 transform items-center justify-center rounded-full bg-white transition duration-500`}
            >
                <svg
                    width="24"
                    height="24"
                    fill="none"
                    aria-hidden="true"
                    className={`${isDarkMode ? "opacity-0" : "opacity-100"} scale-${isDarkMode ? "scale-0" : "scale-100"} flex-none transform text-orange-500 transition duration-500`}
                >
                    <path
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                    <path
                        d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7l-1-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                </svg>
                <svg
                    width="24"
                    height="24"
                    fill="none"
                    aria-hidden="true"
                    className={`opacity-${isDarkMode ? "100" : "0"} scale-${isDarkMode ? "100" : "0"} -ml-6 flex-none transform text-slate-700 transition duration-500`}
                >
                    <path
                        d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                </svg>
            </span>
        </button>
    );
};

DarkModeToggle.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default DarkModeToggle;
