@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  background: #0d0f14;
  color: #e2e8f0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

#__next, main {
  height: 100%;
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #252836; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #2a2d3a; }

/* Selection */
::selection { background: rgba(139,124,248,0.25); color: #e2e8f0; }

/* Remove input autofill bg */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px #181c26 inset;
  -webkit-text-fill-color: #e2e8f0;
  transition: background-color 5000s ease-in-out 0s;
}

/* Glass card utility */
.glass-card {
  background: rgba(19, 22, 30, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.06);
}

/* Numeric tabular */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}

/* Focus ring */
.focus-ring:focus-visible {
  outline: 2px solid rgba(139,124,248,0.6);
  outline-offset: 2px;
}
