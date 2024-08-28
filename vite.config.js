import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Vite 설정
export default defineConfig({
    base: '/', // 빌드된 파일의 기본 경로 설정
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: path.resolve(__dirname, 'dist'), // Spring 프로젝트의 정적 리소스 폴더로 설정
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
            '@api': path.resolve(__dirname, '/src/api'),
            '@hooks': path.resolve(__dirname, '/src/hooks'),
            '@components': path.resolve(__dirname, '/src/components'),
            '@layout': path.resolve(__dirname, '/src/layout'),
            '@pages': path.resolve(__dirname, '/src/pages'),
            '@routes': path.resolve(__dirname, '/src/routes'),
            '@themes': path.resolve(__dirname, '/src/themes'),
            '@utils': path.resolve(__dirname, '/src/utils'),
        },
    },
});
