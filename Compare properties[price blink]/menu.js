var NOT_DISABLED = 0;
var PERM_DISABLED = 2;
var currently_active_tab_retailer_id;
var bg;

function init() {
  var country = localStorage.country;
  bg = chrome.extension.getBackgroundPage();
  currently_active_tab_retailer_id = bg.currently_active_tab_retailer_id;
  
  // UK users don't get the wishlist just yet
  if(country == "uk") {
    document.getElementById("add-to-wishlist").className = "hide";
    document.getElementById("go-to-wishlist").className = "hide";
  // Show add/go to wishlist
  } else {
    document.getElementById("add-to-wishlist").style.className = "show";
    document.getElementById("go-to-wishlist").style.className = "show";
    document.getElementById("go-to-wishlist").addEventListener('click', function() {
      chrome.tabs.create({url: "http://www.priceblink.com/webcpns/wishlist.php"});
    });
    chrome.extension.sendRequest({action: 'getWishListURL'}, setWishListLink);
  }
  
  // Setup suggest a coupon link
  var suggest_link = null;
  
  if(currently_active_tab_retailer_id != null)
    suggest_link = "http://www.priceblink.com/coupons-codes/suggest/" + currently_active_tab_retailer_id + "?utm_source=icon&submit_coupon=true&uid=" + bg.uid;
    
  document.getElementById("suggest-a-coupon").addEventListener('click', function() {
    // Existing merchant
    if(suggest_link != null) {
      chrome.tabs.create({url: suggest_link});
    // New merchant
    } else {
      chrome.tabs.getSelected(null,function(tab) {
        var url = "http://www.priceblink.com/coupons-codes/new_retailer/?utm_source=icon&submit_coupon=true&uid=" + bg.uid + "&domain=" + tab.url;
        chrome.tabs.create({url: url});
      });
    }
  });
  
  // Coupons toggling - only do on merchants where we have coupons
  var toggle_coupons = document.querySelector("#toggle-coupons");
  if(currently_active_tab_retailer_id != null) {
    toggle_coupons.className = "show";
    if(bg.disabled_status == PERM_DISABLED) {
      document.querySelector("#toggle-coupons-text").innerHTML = "on";
      toggle_coupons.addEventListener('click', enableCoupons);
    } else {
      document.querySelector("#toggle-coupons-text").innerHTML = "off";
      toggle_coupons.addEventListener('click', disableCoupons);
    }
  } else {
    toggle_coupons.className = "hide";
  }
  
  document.getElementById("need-help").addEventListener('click', function() {
    chrome.tabs.create({url: "http://www.priceblink.com/webcpns/page.php?sp_id=4"});
  });
  
  // Product search
  document.getElementById("submit-product-search").addEventListener('click', function() {
    var q = document.getElementById("product-search").value;
    chrome.tabs.create({url: "http://www.priceblink.com/webcpns/search_products.php?q="+q+"&uid="+bg.uid});
  });
  
  // Maybe use in the future
  //chrome.extension.sendRequest({action: 'getCouponsForSelected'}, setViewAllLink);  
}

function setViewAllLink(obj) {
  var url1 = '<a href="' + obj.url + '" target="_blank">' + str1 + '</a>';
  document.getElementById("priceblink-popup-view").innerHTML = url1;
}

function setWishListLink(obj) {
  // No wishlist URL is available
  if(obj.url == undefined) return;
  var wishlist = document.querySelector("#add-to-wishlist");
  wishlist.addEventListener('click', function() {
    chrome.tabs.create({url: obj.url});
  });
}

// If coupons are enabled for a merchant let's turn them off
function disableCoupons() {
  var current_retailer = bg.getRetailerByID(currently_active_tab_retailer_id);
  chrome.extension.sendRequest({action: "disableCoupons", retailer: current_retailer});
  window.close();
  chrome.tabs.reload();
}

// If coupons are disabled for a merchant let's turn them on
function enableCoupons() {
  bg.enableCouponsForRetailer();
  window.close();
}

window.onload = function() {
  init();
}