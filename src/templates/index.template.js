module.exports = params => `<!DOCTYPE html>
<html class="no-js">
<head>
  <title>${params.htmlWebpackPlugin.options.title}</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta name="viewport" content="width=device-width,user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimal-ui"/>
</head>
<body>
<div id="application"></div>
<script>
  if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement /*, fromIndex*/) {
      'use strict';
      var O = Object(this);
      var len = parseInt(O.length) || 0;
      if (len === 0) {
        return false;
      }
      var n = parseInt(arguments[1]) || 0;
      var k;
      if (n >= 0) {
        k = n;
      } else {
        k = len + n;
        if (k < 0) {
          k = 0;
        }
      }
      var currentElement;
      while (k < len) {
        currentElement = O[k];
        if (searchElement === currentElement ||
          (searchElement !== searchElement && currentElement !== currentElement)) {
          return true;
        }
        k++;
      }
      return false;
    };
  }
</script>
${params.htmlWebpackPlugin.options.debug ? '' : '<script type="text/javascript" src="js/react.min.js"></script>'}
${params.htmlWebpackPlugin.options.debug ? '' : '<script type="text/javascript" src="js/react-dom.min.js"></script>'}
</body>
</html>`;
