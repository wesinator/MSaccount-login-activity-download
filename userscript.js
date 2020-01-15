// ==UserScript==
// @name     Microsoft account login activity downloader
// @version  0.1
// @grant    none
// @match    https://account.live.com/Activity*
// @run-at   document-end
// ==/UserScript==

setTimeout(function() {
  // JSON dump report url data to file
  // https://stackoverflow.com/questions/34101871/save-data-using-greasemonkey-tampermonkey-for-later-retrieval
  var a = document.createElement("a");

  // login data in jsonActivity var
  // requires unsafeWindow to access page vars in userscript - https://wiki.greasespot.net/UnsafeWindow
  var rawData = unsafeWindow.jsonActivity;
  console.log("activity json data:", rawData);

  a.href = "data:text/json;charset=utf-8," + decodeEscapedJson(rawData);

  // Get date UTC
  var utcDate = new Date().toJSON().slice(0,10);

  a.download = "microsoft_account_login_activity_" + utcDate + ".json";
  a.click();
}, 2000);

// decodes double '\' escaped json data
function decodeEscapedJson(json) {
  var jsonParsed = JSON.parse(json);
  var jsonStr = JSON.stringify(jsonParsed, null, indent=2);
  return encodeURIComponent(jsonStr);
}
