# CSS Origin Tracing Demo

This repository contains a small frontend project built with **Vite** and **React** that demonstrates how authored CSS is transformed into the final CSS served to the browser. It contains a simple UI with a `Card` component and a `Button` component, each with their own CSS modules, as well as global styles.

---

## Setup and Run Instructions

### 1. Clone the repository

```bash
git clone https://github.com/pasha-matveev/css-origin-tracing-demo.git
cd css-origin-tracing-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The application will start locally and will be accessible at:

```
http://localhost:5173
```

### 4. Build the production bundle

```bash
npm run build
```

This generates the production build in the `dist/` directory, including the compiled CSS and source maps.

---
## CSS Transformation Overview

1. **Authored CSS**  
   Styles are written in three places:
   - Global styles in `src/styles/globals.css`
   - Card component styles in `src/components/Card/Card.module.css`
   - Button component styles in `src/components/Button/Button.module.css`

2. **CSS Modules**  
   The `Card` and `Button` styles use CSS Modules. During build, their class names are transformed into unique hashed selectors to avoid collisions.

3. **PostCSS Transformations**  
   The CSS is processed by PostCSS plugins:
   - `postcss-nesting` expands nested rules into standard flat selectors
   - `autoprefixer` adds vendor-prefixed properties based on target browser support

4. **Vite Bundling**  
   Vite collects CSS from all modules, applies the transformations above, and bundles it into generated CSS files. It also generates source maps that link the final CSS back to the original authored CSS.
   