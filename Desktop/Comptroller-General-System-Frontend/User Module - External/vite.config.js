import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 80,
    proxy: {
      // Proxy for external API calls
      "/external": {
        target: "http://192.168.231.50",
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("External proxy error:", err);
          });
        },
      },
      // Proxy for internal API calls
      "/internal": {
        target: "http://192.168.231.50",
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("Internal proxy error:", err);
          });
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
      // Proxy for management API calls
      "/management": {
        target: "http://192.168.231.62",
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("Management proxy error:", err);
          });
        },
      },
      // Proxy for CGO basic airfield API calls
      "/cgobasicairfield": {
        target: "http://192.168.231.62",
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("CGO basic airfield proxy error:", err);
          });
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log(
              "Sending CGO Request to the Target:",
              req.method,
              req.url
            );
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log(
              "Received CGO Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
      // Proxy for reports API calls
      "/reports": {
        target: "http://192.168.231.62",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
