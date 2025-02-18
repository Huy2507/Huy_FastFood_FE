import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://kyozed-001-site1.mtempurl.com",
                changeOrigin: true, // Cho phép thay đổi Origin để tránh lỗi CORS
                secure: false // Vì sử dụng HTTPS với localhost
            }
        }
    }
});
