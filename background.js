//lets make a tabmanager that can be accessed from popupjs

var tabmanager = {
  tabTimes: {} // An array of tabId => timestamp

};


//check for old tabs every 10 seconds
checkForOldTabs();
setInterval(checkForOldTabs, 10000);


function checkForOldTabs(){
    //need to seperate this into some kind of setting thing
  var maxAge=30000;
  chrome.tabs.query({windowType: 'normal'}, function(tabs) {
    var tabNum = tabs.length;
      for (var i = 0; i < tabNum; i++) {
        var tab=tabs[i];
        var lastModified = tabmanager.tabTimes[tab.id];
        var timeAgo = new Date().getTime()-lastModified;

        if (timeAgo > maxAge) {
          console.log("kill this one");
          chrome.tabs.remove(tab.id);

           };



};
});

console.log("check for old tabs");

};





chrome.runtime.onStartup.addListener(function () {
    /* Do some initialization */

 
chrome.tabs.query({windowType: 'normal'}, function(tabs) {

  console.log("call this one");
var tabNum = tabs.length;
console.log("number of tabs opennnnn");
console.log(tabNum);
 for (i = 0; i < tabs.length; i++) {
          tabmanager.updateLastAccessed(tabs[i].id);
        }
 console.log("chrome runtime tabmanager");  
console.log(tabmanager);
  });

});





chrome.tabs.onCreated.addListener(function(tab){
	console.log("new tab opened");
  tabmanager.updateLastAccessed(tab.id);

  console.log(tabmanager);

});


chrome.tabs.onUpdated.addListener(function(tab){
	console.log("tab updated");
	//tabmanager.updateLastAccessed;


});



chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	console.log("tab closed");
	console.log(tabId);
  delete tabmanager.tabTimes[tabId];
console.log(tabmanager);


});



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	console.log("tab updated");
	//tabmanager.updateLastAccessed;

});





tabmanager.updateLastAccessed = function (tabId) {
  if (typeof tabId == "object") {
    tabId = tabId.id;
  }

  if (typeof tabId != 'number') {
    console.log('Error: ' + tabId.toString() + ' is not an number', tabId);
    return;
  }
  tabmanager.tabTimes[tabId] = new Date().getTime();
};



