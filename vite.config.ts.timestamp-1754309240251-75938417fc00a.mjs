// vite.config.ts
import { defineConfig } from "file:///C:/Users/royni/OneDrive/Desktop/Matson%20offical/clone/matson-celebration-studio/node_modules/.pnpm/vite@5.4.19_@types+node@22.16.5_terser@5.43.1/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/royni/OneDrive/Desktop/Matson%20offical/clone/matson-celebration-studio/node_modules/.pnpm/@vitejs+plugin-react-swc@3._a60ed6b3d03d63842f3eb61af6132c2f/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/royni/OneDrive/Desktop/Matson%20offical/clone/matson-celebration-studio/node_modules/.pnpm/lovable-tagger@1.1.8_vite@5_6b5d828064f82d5bbb2600299217cab5/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\royni\\OneDrive\\Desktop\\Matson offical\\clone\\matson-celebration-studio";
var excludeImagesPlugin = () => {
  return {
    name: "exclude-images",
    generateBundle(options, bundle) {
      const keepFiles = [
        "matson-icon-qY7ypm7U.png",
        "hero-wedding-DuoSUXYL.jpg",
        "index-um8msJ26.css",
        "index-BZ0xK0Hf.js"
      ];
      Object.keys(bundle).forEach((fileName) => {
        if (fileName.includes(".jpg") || fileName.includes(".png")) {
          const shouldKeep = keepFiles.some((keepFile) => fileName.includes(keepFile.replace(/[-_][a-zA-Z0-9]+\.(jpg|png)/, "")));
          if (!shouldKeep) {
            delete bundle[fileName];
          }
        }
      });
    }
  };
};
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    excludeImagesPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/react-router-dom")) {
            return "router";
          }
          if (id.includes("node_modules/react-hook-form") || id.includes("node_modules/@hookform/resolvers") || id.includes("node_modules/zod")) {
            return "form";
          }
          if (id.includes("node_modules/@supabase/supabase-js")) {
            return "supabase";
          }
          if (id.includes("node_modules/@tanstack/react-query")) {
            return "query";
          }
          if (id.includes("node_modules/clsx") || id.includes("node_modules/class-variance-authority") || id.includes("node_modules/tailwind-merge")) {
            return "utils";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
          if (id.includes("node_modules/framer-motion")) {
            return "animations";
          }
          if (id.includes("node_modules/@radix-ui")) {
            return "ui-components";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        }
      }
    },
    chunkSizeWarningLimit: 500,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"]
      }
    }
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "sonner"
    ],
    exclude: [
      // Exclude heavy unused dependencies
      "recharts",
      "embla-carousel-react",
      "vaul",
      "cmdk",
      "date-fns",
      "react-day-picker",
      "react-resizable-panels",
      "input-otp",
      "next-themes"
    ]
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxyb3luaVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXE1hdHNvbiBvZmZpY2FsXFxcXGNsb25lXFxcXG1hdHNvbi1jZWxlYnJhdGlvbi1zdHVkaW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHJveW5pXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcTWF0c29uIG9mZmljYWxcXFxcY2xvbmVcXFxcbWF0c29uLWNlbGVicmF0aW9uLXN0dWRpb1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcm95bmkvT25lRHJpdmUvRGVza3RvcC9NYXRzb24lMjBvZmZpY2FsL2Nsb25lL21hdHNvbi1jZWxlYnJhdGlvbi1zdHVkaW8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcclxuXHJcbi8vIEN1c3RvbSBwbHVnaW4gdG8gZXhjbHVkZSB1bndhbnRlZCBpbWFnZXMgZHVyaW5nIGJ1aWxkXHJcbmNvbnN0IGV4Y2x1ZGVJbWFnZXNQbHVnaW4gPSAoKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICdleGNsdWRlLWltYWdlcycsXHJcbiAgICBnZW5lcmF0ZUJ1bmRsZShvcHRpb25zOiBhbnksIGJ1bmRsZTogYW55KSB7XHJcbiAgICAgIC8vIExpc3Qgb2YgZmlsZXMgdG8ga2VlcFxyXG4gICAgICBjb25zdCBrZWVwRmlsZXMgPSBbXHJcbiAgICAgICAgJ21hdHNvbi1pY29uLXFZN3lwbTdVLnBuZycsXHJcbiAgICAgICAgJ2hlcm8td2VkZGluZy1EdW9TVVhZTC5qcGcnLFxyXG4gICAgICAgICdpbmRleC11bThtc0oyNi5jc3MnLFxyXG4gICAgICAgICdpbmRleC1CWjB4SzBIZi5qcydcclxuICAgICAgXTtcclxuICAgICAgXHJcbiAgICAgIC8vIFJlbW92ZSB1bndhbnRlZCBpbWFnZSBmaWxlcyBmcm9tIHRoZSBidW5kbGVcclxuICAgICAgT2JqZWN0LmtleXMoYnVuZGxlKS5mb3JFYWNoKGZpbGVOYW1lID0+IHtcclxuICAgICAgICBpZiAoZmlsZU5hbWUuaW5jbHVkZXMoJy5qcGcnKSB8fCBmaWxlTmFtZS5pbmNsdWRlcygnLnBuZycpKSB7XHJcbiAgICAgICAgICBjb25zdCBzaG91bGRLZWVwID0ga2VlcEZpbGVzLnNvbWUoa2VlcEZpbGUgPT4gZmlsZU5hbWUuaW5jbHVkZXMoa2VlcEZpbGUucmVwbGFjZSgvWy1fXVthLXpBLVowLTldK1xcLihqcGd8cG5nKS8sICcnKSkpO1xyXG4gICAgICAgICAgaWYgKCFzaG91bGRLZWVwKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBidW5kbGVbZmlsZU5hbWVdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjo6XCIsXHJcbiAgICBwb3J0OiA4MDgwLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiYgY29tcG9uZW50VGFnZ2VyKCksXHJcbiAgICBleGNsdWRlSW1hZ2VzUGx1Z2luKCksXHJcbiAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcclxuICAgICAgICAgIC8vIENvcmUgUmVhY3RcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3JlYWN0JykgfHwgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWFjdC1kb20nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3JlYWN0LXZlbmRvcic7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIFJvdXRlclxyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAncm91dGVyJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gRm9ybSBoYW5kbGluZ1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3QtaG9vay1mb3JtJykgfHwgXHJcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9AaG9va2Zvcm0vcmVzb2x2ZXJzJykgfHwgXHJcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy96b2QnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2Zvcm0nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBCYWNrZW5kXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3VwYWJhc2UtanMnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3N1cGFiYXNlJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9yZWFjdC1xdWVyeScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAncXVlcnknO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBVdGlsaXRpZXNcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2Nsc3gnKSB8fCBcclxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2NsYXNzLXZhcmlhbmNlLWF1dGhvcml0eScpIHx8IFxyXG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvdGFpbHdpbmQtbWVyZ2UnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3V0aWxzJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gSWNvbnNcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnaWNvbnMnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBBbmltYXRpb25zXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9mcmFtZXItbW90aW9uJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdhbmltYXRpb25zJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gUmFkaXggVUkgY29tcG9uZW50c1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvQHJhZGl4LXVpJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICd1aS1jb21wb25lbnRzJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gVmVuZG9yIGNodW5rIGZvciBvdGhlciBkZXBlbmRlbmNpZXNcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAsXHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxyXG4gICAgICAgIHB1cmVfZnVuY3M6IFsnY29uc29sZS5sb2cnLCAnY29uc29sZS5pbmZvJywgJ2NvbnNvbGUuZGVidWcnXSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGluY2x1ZGU6IFtcclxuICAgICAgJ3JlYWN0JyxcclxuICAgICAgJ3JlYWN0LWRvbScsXHJcbiAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcclxuICAgICAgJ3Nvbm5lcicsXHJcbiAgICBdLFxyXG4gICAgZXhjbHVkZTogW1xyXG4gICAgICAvLyBFeGNsdWRlIGhlYXZ5IHVudXNlZCBkZXBlbmRlbmNpZXNcclxuICAgICAgJ3JlY2hhcnRzJyxcclxuICAgICAgJ2VtYmxhLWNhcm91c2VsLXJlYWN0JyxcclxuICAgICAgJ3ZhdWwnLFxyXG4gICAgICAnY21kaycsXHJcbiAgICAgICdkYXRlLWZucycsXHJcbiAgICAgICdyZWFjdC1kYXktcGlja2VyJyxcclxuICAgICAgJ3JlYWN0LXJlc2l6YWJsZS1wYW5lbHMnLFxyXG4gICAgICAnaW5wdXQtb3RwJyxcclxuICAgICAgJ25leHQtdGhlbWVzJyxcclxuICAgIF0sXHJcbiAgfSxcclxufSkpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThhLFNBQVMsb0JBQW9CO0FBQzNjLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFIaEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxzQkFBc0IsTUFBTTtBQUNoQyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixlQUFlLFNBQWMsUUFBYTtBQUV4QyxZQUFNLFlBQVk7QUFBQSxRQUNoQjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFHQSxhQUFPLEtBQUssTUFBTSxFQUFFLFFBQVEsY0FBWTtBQUN0QyxZQUFJLFNBQVMsU0FBUyxNQUFNLEtBQUssU0FBUyxTQUFTLE1BQU0sR0FBRztBQUMxRCxnQkFBTSxhQUFhLFVBQVUsS0FBSyxjQUFZLFNBQVMsU0FBUyxTQUFTLFFBQVEsK0JBQStCLEVBQUUsQ0FBQyxDQUFDO0FBQ3BILGNBQUksQ0FBQyxZQUFZO0FBQ2YsbUJBQU8sT0FBTyxRQUFRO0FBQUEsVUFDeEI7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjtBQUdBLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVMsaUJBQWlCLGdCQUFnQjtBQUFBLElBQzFDLG9CQUFvQjtBQUFBLEVBQ3RCLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYyxDQUFDLE9BQU87QUFFcEIsY0FBSSxHQUFHLFNBQVMsb0JBQW9CLEtBQUssR0FBRyxTQUFTLHdCQUF3QixHQUFHO0FBQzlFLG1CQUFPO0FBQUEsVUFDVDtBQUdBLGNBQUksR0FBRyxTQUFTLCtCQUErQixHQUFHO0FBQ2hELG1CQUFPO0FBQUEsVUFDVDtBQUdBLGNBQUksR0FBRyxTQUFTLDhCQUE4QixLQUMxQyxHQUFHLFNBQVMsa0NBQWtDLEtBQzlDLEdBQUcsU0FBUyxrQkFBa0IsR0FBRztBQUNuQyxtQkFBTztBQUFBLFVBQ1Q7QUFHQSxjQUFJLEdBQUcsU0FBUyxvQ0FBb0MsR0FBRztBQUNyRCxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxjQUFJLEdBQUcsU0FBUyxvQ0FBb0MsR0FBRztBQUNyRCxtQkFBTztBQUFBLFVBQ1Q7QUFHQSxjQUFJLEdBQUcsU0FBUyxtQkFBbUIsS0FDL0IsR0FBRyxTQUFTLHVDQUF1QyxLQUNuRCxHQUFHLFNBQVMsNkJBQTZCLEdBQUc7QUFDOUMsbUJBQU87QUFBQSxVQUNUO0FBR0EsY0FBSSxHQUFHLFNBQVMsMkJBQTJCLEdBQUc7QUFDNUMsbUJBQU87QUFBQSxVQUNUO0FBR0EsY0FBSSxHQUFHLFNBQVMsNEJBQTRCLEdBQUc7QUFDN0MsbUJBQU87QUFBQSxVQUNUO0FBR0EsY0FBSSxHQUFHLFNBQVMsd0JBQXdCLEdBQUc7QUFDekMsbUJBQU87QUFBQSxVQUNUO0FBR0EsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsSUFDdkIsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLFFBQ2YsWUFBWSxDQUFDLGVBQWUsZ0JBQWdCLGVBQWU7QUFBQSxNQUM3RDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQTtBQUFBLE1BRVA7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
