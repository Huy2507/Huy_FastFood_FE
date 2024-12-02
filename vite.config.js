import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://localhost:7290",
                changeOrigin: true, // Cho phép thay đổi Origin để tránh lỗi CORS
                secure: false, // Vì sử dụng HTTPS với localhost
            },
        },
    },
    esbuild: {
        loader: "jsx", // Sử dụng JSX loader
        include: /src\/.*\.js$/, // Chỉ định các file `.js` trong thư mục `src`
    },
});
