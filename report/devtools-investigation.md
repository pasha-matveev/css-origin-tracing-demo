# DevTools Investigation Report

This document describes an investigation of how computed CSS styles of a page element relate to the original authored CSS using Chrome DevTools.

The investigated element is the **Button component** rendered inside the `Card` component in the demo application. The button receives styles from multiple sources: global styles, `Card.module.css`, and `Button.module.css`.

Example DOM element:

```html
<button class="_button_685iz_1">Inspect Me</button>
```

The class `_button_685iz_1` is generated from the `.button` class defined in `Button.module.css` by the CSS Modules build process.

## Investigated Properties

### 1. `background-color`

**Computed value**

```
rgb(220, 38, 38)
```

**Corresponding rule (generated CSS)**

```css
._button_685iz_1 { background: var(--card-accent); }
```

**Generated CSS location**

```
index-cW62Ugu3.css:22
```

**Source-mapped authored location**

```
Card.module.css:11
```

**Notes**

The property `background` is declared in `Button.module.css`. However, the value comes from the CSS variable `--card-accent`, which is defined in `globals.css` and overridden in `Card.module.css`. DevTools links to the variable definition rather than the property declaration.


### 2. `color`

**Computed value**

```
rgb(255, 255, 255)
```

**Corresponding rule (generated CSS)**

```css
._button_685iz_1 { color: var(--color-accent-contrast); }
```

**Generated CSS location**

```
index-cW62Ugu3.css:23
```

**Source-mapped authored location**

```
Card.module.css:11
```

**Notes**

The `color` property is declared in `Button.module.css`, while the value is provided through the CSS variable `--color-accent-contrast`. DevTools navigates to the location where the variable is resolved instead of the location where the property was declared.


### 3. `padding-left`

**Computed value**

```
16px
```

**Corresponding rule (generated CSS)**

```css
._button_685iz_1 { padding: 8px 16px; }
```

**Generated CSS location**

```
index-cW62Ugu3.css:17
```

**Source-mapped authored location**

```
Card.module.css:11
```

**Notes**

The computed property `padding-left` originates from the shorthand declaration `padding: 8px 16px` in `Button.module.css`. DevTools displays the longhand computed property even though only the shorthand was written in the source CSS.


### 4. `border-top-left-radius`

**Computed value**

```
12px
```

**Corresponding rule (generated CSS)**

```css
._button_685iz_1 { border-radius: var(--radius-md); }
```

**Generated CSS location**

```
index-cW62Ugu3.css:20
```

**Source-mapped authored location**

```
Card.module.css:11
```

**Notes**

The computed property `border-top-left-radius` is derived from the shorthand declaration `border-radius`. The value is provided through the CSS variable `--radius-md`, which is defined in the global stylesheet.


### 5. `display`

**Computed value**

```
inline-flex
```

**Corresponding rule (generated CSS)**

```css
._button_685iz_1 { display: inline-flex; }
```

**Generated CSS location**

```
index-cW62Ugu3.css:13
```

**Source-mapped authored location**

```
Card.module.css:11
```

**Notes**

The `display` property is defined in `Button.module.css`. The source map points to `Card.module.css:11`, which indicates that the mapping produced by the build pipeline is indirect.


## Cases Where CSS Mapping Becomes Indirect or Ambiguous

### 1. CSS Variables

Several properties depend on CSS variables (e.g. `--card-accent`, `--color-accent-contrast`, `--radius-md`). The property declaration may be located in one file while the variable value is defined or overridden in another stylesheet. DevTools may navigate to the variable definition instead of the property declaration.

### 2. Shorthand Properties

Computed properties such as `padding-left` and `border-top-left-radius` originate from shorthand declarations (`padding`, `border-radius`). DevTools displays longhand computed values even though the authored CSS contains only shorthand declarations.

### 3. Build Transformations and Bundling

During the build process, CSS Modules, PostCSS transformations, and bundling combine multiple CSS sources into a single generated stylesheet (`index-cW62Ugu3.css`). Because of these transformations, source maps may associate generated rules with approximate authored locations rather than the exact original declaration.

