import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import electron from "vite-plugin-electron"
import electronRenderer from "vite-plugin-electron-renderer" 
import polyfillExports from "vite-plugin-electron-renderer"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    electron([{
      entry: "electron-main/index.ts", // 主进程文件
    },
    {
      entry: 'electron-preload/preload.ts'
    }
  ]),
    electronRenderer(),
    polyfillExports(),
  ],
  resolve: {
    // 配置别名
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
  },
  
})
