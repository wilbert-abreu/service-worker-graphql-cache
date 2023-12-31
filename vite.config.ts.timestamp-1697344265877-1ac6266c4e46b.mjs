// vite.config.ts
import { defineConfig } from "file:///Users/wilbertabreu/Desktop/projects/bun/vite-app-sw/node_modules/vite/dist/node/index.js";
import react from "file:///Users/wilbertabreu/Desktop/projects/bun/vite-app-sw/node_modules/@vitejs/plugin-react-swc/index.mjs";
import federation from "file:///Users/wilbertabreu/Desktop/projects/bun/vite-app-sw/node_modules/@originjs/vite-plugin-federation/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    federation({
      name: "app",
      remotes: {
        remoteApp: "http://localhost:5001/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom"]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2lsYmVydGFicmV1L0Rlc2t0b3AvcHJvamVjdHMvYnVuL3ZpdGUtYXBwLXN3XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvd2lsYmVydGFicmV1L0Rlc2t0b3AvcHJvamVjdHMvYnVuL3ZpdGUtYXBwLXN3L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy93aWxiZXJ0YWJyZXUvRGVza3RvcC9wcm9qZWN0cy9idW4vdml0ZS1hcHAtc3cvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCBmZWRlcmF0aW9uIGZyb20gJ0BvcmlnaW5qcy92aXRlLXBsdWdpbi1mZWRlcmF0aW9uJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgZmVkZXJhdGlvbih7XG4gICAgICBuYW1lOiAnYXBwJyxcbiAgICAgIHJlbW90ZXM6IHtcbiAgICAgICAgcmVtb3RlQXBwOiAnaHR0cDovL2xvY2FsaG9zdDo1MDAxL2Fzc2V0cy9yZW1vdGVFbnRyeS5qcycsXG4gICAgICB9LFxuICAgICAgc2hhcmVkOiBbJ3JlYWN0JywncmVhY3QtZG9tJ11cbiAgICB9KVxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFUsU0FBUyxvQkFBb0I7QUFDM1csT0FBTyxXQUFXO0FBQ2xCLE9BQU8sZ0JBQWdCO0FBR3ZCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxRQUNQLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQSxRQUFRLENBQUMsU0FBUSxXQUFXO0FBQUEsSUFDOUIsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
