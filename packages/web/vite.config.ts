import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite"
import path from "path";

import honoDevPlugin from "./vite/plugins/hono-dev-plugin";

const root = path.resolve(__dirname, "../..");

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, root, '');
	Object.assign(process.env, env);

	return {
		plugins: [honoDevPlugin(), react(),  tailwind()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src/web"),
			},
		},
		build: {
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes('node_modules/@runablehq/website-runtime')) return 'runtime';
						if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) return 'motion';
						if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) return 'icons';
						if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/zod')) return 'forms';
						if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/scheduler')) return 'react';
					}
				}
			},
			chunkSizeWarningLimit: 600,
		},
		server: {
			port: 4200,
			allowedHosts: true,
			hmr: { overlay: false }
		}
	};
});
