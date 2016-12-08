//lets make a tabmanager that can be accessed from popupjs

var tabmanager = {
  tabTimes: {} // An array of tabId => timestamp

};
var maxAge;
//10 mins in ms
var defaultMaxAge=10*60*1000;

var minTabs;
var defaultMinTabs=5;

getSettings();


function getSettings(){

  chrome.storage.sync.get('maxTabAge',function(item){
    if(item["maxTabAge"]){
      console.log("maximum taaaabbbbbbb age");
      console.log(item["maxTabAge"]);
      maxAge=item["maxTabAge"];
       }
    else{
    //set to default max age
      chrome.storage.sync.set({'maxTabAge': defaultMaxAge}, function() {
      console.log("saved the default max age of tabs");
      maxAge=defaultMaxAge;


          });
        }
   });

  chrome.storage.sync.get('minTabs',function(item){
    if(item["minTabs"]){
      console.log("min NUMBER taaaabbbbbbb");
      console.log(item["minTabs"]);
      minTabs=item["minTabs"];
       }
    else{
    //set to default max age
      chrome.storage.sync.set({'minTabs': defaultMinTabs}, function() {
      console.log("saved the default min NUMBER of tabs");
      minTabs=defaultMinTabs;


          });
        }
   });


};





//check for old tabs every 1000 seconds
checkForOldTabs();
setInterval(checkForOldTabs, 1000000);


function checkForOldTabs(){
    //need to seperate this into some kind of setting thing


var tabsToKill =[];


  chrome.tabs.query({windowType: 'normal'}, function(tabs) {
    var tabNum = tabs.length;
     

      for (var i = 0; i < tabNum; i++) {
        var tab=tabs[i];
        var lastModified = tabmanager.tabTimes[tab.id];
        var timeAgo = new Date().getTime()-lastModified;

        if (timeAgo > maxAge) {
          console.log("kill this one");
         // chrome.tabs.remove(tab.id);
          tabsToKill.push(tab.id);
          console.log(tabsToKill);
 };


console.log("check for old tabs");
console.log("tabs to kill array");
console.log(tabsToKill.length);
killTabs(tabsToKill);

};
});
};


function killTabs(tabsArray){
   // we only want to close tabs if there are more than some minimum open
var minTabs = 2;

tabsToClose = tabsArray.splice(0, tabsArray.length - minTabs);

if(tabsToClose.length >0){
 for (var i = 0; i < tabsToClose.length; i++) {

console.log("this bitttttt");
 var tab=tabsToClose[i];
chrome.tabs.remove(tab);


  };

};

};





chrome.runtime.onStartup.addListener(function () {
    /* Do some initialization */
 // maxAge=30000;
 
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
  //tabmanager.updateLastAccessed(tab.id);

  console.log(tabmanager);

});


// chrome.tabs.onUpdated.addListener(function(tab){
// 	console.log("tab updated");
// console.log("tab id isssss");
// console.log(changeInfo.tab.id);

//   // updateLastAccessed(tab.id);
// 	//tabmanager.updateLastAccessed;


// });



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // alert(changeInfo.url);
   updateLastAccessed(tabId);
}); 




chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	console.log("tab closed");
	console.log(tabId);
  delete tabmanager.tabTimes[tabId];
console.log(tabmanager);


});



// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// 	console.log("tab updated");
// 	//tabmanager.updateLastAccessed;

// });





function updateLastAccessed(tabId) {
 

  console.log("here----------tab id ");
  console.log(tabId);
  tabmanager.tabTimes[tabId] = new Date().getTime();
};



