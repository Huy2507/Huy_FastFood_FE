/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}", // Quét các file trong src folder
    ],
    theme: {
        extend: {}, // Tùy chỉnh theme ở đây
    },
    plugins: [], // Có thể thêm plugin nếu cần
};
