import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Or import reactSwc from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ['@babel/preset-flow'],
      },
    }),
  ],
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tsconfigPaths from 'vite-tsconfig-paths'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   base: '/mhstempc/'
// })
