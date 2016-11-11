//lets make a tabmanager that can be accessed from popupjs

var tabmanager = {
  tabTimes: {} // An array of tabId => timestamp

};


chrome.tabs.query({windowType: 'normal'}, function(tabs) {

  console.log("call this one");
var tabNum = tabs.length;
console.log("number of tabs opennnnn");
console.log(tabNum);
 for (i = 0; i < tabs.length; i++) {
          tabmanager.updateLastAccessed(tabs[i].id);
        }
  
console.log(tabmanager);
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



