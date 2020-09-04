const fs = require('fs');
const postcss = require("postcss");
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = postcss.plugin("postcss-icon",  (path) => {
  const icons = {};

  fs.readdirSync(path)
    .filter((file) => file.match(/.*\.svg$/))
    .forEach((file) => {
      const svg_content = fs.readFileSync(`${path}/${file}`, 'utf8');
      const name = file.replace('.svg','');

      icons[name] = svgToMiniDataURI(svg_content)
    })

  return (css) => {
    css.walkDecls("svg-icon", (decl) => {
      const [ name, size = false] = postcss.list.space(decl.value);
      const rule = decl.parent;

      if (!icons[name]) { rule.remove(); return; }
      
      const backgroundImage = postcss.decl({ 
        prop: 'background-image', 
        value: `url("${icons[name]}")`
      });
      
      decl.remove();
      rule.prepend(backgroundImage);

      if (size) {
        const fontSize = postcss.decl({ prop: 'font-size', value: size });
        rule.prepend(fontSize);
      }
    });
  }
})