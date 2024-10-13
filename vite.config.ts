import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    assetsInclude: ["./public/services.json"],
    plugins: [react({
        include: "**/*.tsx"
    })],
    server: {
        watch: {
            usePolling: true
        }
    }
})
