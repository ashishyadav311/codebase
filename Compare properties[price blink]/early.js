
var interval = setInterval(function() {
  if(document.body != null) {
    _loadFonts();
    clearInterval(interval);
  }
}, 10);

function _loadFonts(){
  document.createElement("style");
  var css = "@font-face {font-family: 'comfortaalight';" + 
      "src: url('https://cdn-buyer1.makaan.com/iq/fonts/fonts/comfortaa-light.eot');" + 
      "src: url('https://cdn-buyer1.makaan.com/iq/fonts/comfortaa-light.eot?#iefix') format('embedded-opentype')," +
           "url('https://cdn-buyer1.makaan.com/iq/fonts/comfortaa-light.woff2') format('woff2')," + 
           "url('https://cdn-buyer1.makaan.com/iq/fonts/comfortaa-light.woff') format('woff')," + 
           "url('https://cdn-buyer1.makaan.com/iq/fonts/comfortaa-light.ttf') format('truetype')," + 
           "url('https://cdn-buyer1.makaan.com/iq/fonts/comfortaa-light.svg#comfortaalight') format('svg');" + 
      "font-weight: normal;" +
      "font-style: normal;" +
      "-webkit-font-smoothing: antialiased;}",
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}