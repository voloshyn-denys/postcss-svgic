# postcss-svgic

#### Installation
```bash
npm i postcss-svgic
```

#### Gulp
```javascript
const svgic = require('postcss-svgic');

const styles = () => {
    const processors = [
        svgic(SVG_PATH)
    ]
    return src(MAIN_SRC)
        .pipe(postcss(processors))
        .pipe(dest('priv/static/css'))
}
```

#### CSS usage example
```css
.icon-edit {
  svg-icon: i20_edit 28px
}
```
