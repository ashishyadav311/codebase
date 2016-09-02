var iframe_url = "www.priceblink.com/iframe/";
//var iframe_url = "local.invisiblehandlabs.com/iframe/";

if(document.location.protocol == "https:")
  iframe_url = "https://" + iframe_url;
else
  iframe_url = "http://" + iframe_url;

var interval = setInterval(function() {
  if(document.body != null) {
    chrome.extension.sendRequest({action: 'getRetailer', url: document.location.href, caller: 'early'}, injectBlankSpace);
    // Entry point for push notifications
    //chrome.extension.sendRequest({action: 'getPushCoupons', url: document.location.href}, injectPushCoupons);
    clearInterval(interval);
  }
}, 10);

function injectBlankSpace(response) {
  // if(response.coupons[0].coupons.length > 0 && response.disabled_status == 0) {
  //   var css = document.createElement("link");
  //   css.type = "text/css";
  //   css.rel = "stylesheet";
  //   css.href = css.href = iframe_url + "css/injected_early.css";
  //   document.getElementsByTagName("head").item(0).appendChild(css);
  //   //document.body.className += " priceblink-body";
  // }
}

/*
function injectPushCoupons(response) {
  
  if (! response.hasPushCoupons){
    //No need to show the coupons popup
    return;
  }


  //First inject script to handle messages from the iframe
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.text = "window.addEventListener('message', push_receiveMessage, false);function push_receiveMessage(e){var pb_push_div=document.getElementById('pb-push-div');var message=e.data.message||e.data;if (message=='push_close') {pb_push_div.remove();} }";
  document.getElementsByTagName("head").item(0).appendChild(script);
  




  //Then inject the iframe
  var iframe = document.createElement("iframe");
  var div = document.createElement("div");
  
  div.id = "pb-push-div";
  div.style.height = "560px";
  div.style.width = "730px";
  div.style.position = "fixed";
  div.style.top = "45px";
  div.style.left = "-365px";
  div.style["margin-left"] = "50%";
  div.style.zIndex = "1100000";

  iframe.height = "560px";
  iframe.width = "100%";
  iframe.id = "pb-push-iframe";
  iframe.border = "none";
  iframe.frameBorder = "0";
  iframe.scrolling = "no";
  //iframe.style.position = "fixed";
  iframe.style.height = "560px";
  iframe.style.width = "100%";
  //iframe.style.top = 0;
  //iframe.style.right = 0;
  iframe.style.border = "none";
  //iframe.style.zIndex = "1000000";
  iframe.src = iframe_url+'push_coupons.html#'+response.uid;

  div.appendChild(iframe);  
    
  document.body.insertBefore(div, document.body.firstChild);
  
}
*/