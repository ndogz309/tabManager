//Stores the tabs in a separate variable to log Last Accessed time.


define(function(require, exports, modules) {

TabManager = {
  tabTimes: {} // An array of tabId => timestamp

};

TabManager.initTabs = function (tabs) {
  for (var i=0; i < tabs.length; i++) {
    TabManager.updateLastAccessed(tabs[i]);
  }
};

TabManager.updateLastAccessed = function (tabId) {
  if (typeof tabId == "object") {
    tabId = tabId.id;
  }

  if (typeof tabId != 'number') {
    console.log('Error: ' + tabId.toString() + ' is not an number', tabId);
    return;
  }
  TabManager.tabTimes[tabId] = new Date().getTime();
};

return TabManager;

});