
var background = chrome.extension.getBackgroundPage();
var tableRef = document.getElementById('mytable');
var maxAgeInput=document.getElementById("maxAgeInput");
var minTabsInput=document.getElementById("minTabsInput");




onLoad=getTabs();

document.addEventListener('DOMContentLoaded', function () {
      maxAgeInput.addEventListener('change', maxAgeChanged);
      minTabsInput.addEventListener('change', minTabsChanged);

});


function getTabs(){

//hmmmm have to keep pulling in tabmanager from background.  think of a nicer way of doing this
var tabmanager=background.tabmanager;


  console.log("initial tabmanager");
  console.log(tabmanager);

makeTable(tabmanager);

console.log("background max age input");
console.log(background.maxAge);




maxAgeInput.value=milisecondsToMinutes(background.maxAge);
minTabsInput.value=background.minTabs;

};

function maxAgeChanged(){
 chrome.storage.sync.set({'maxTabAge': minutesToMiliseconds(maxAgeInput.value)}, function() {
        background.maxAge=minutesToMiliseconds(maxAgeInput.value);
          });
}


function minTabsChanged(){
 chrome.storage.sync.set({'minTabs': minTabsInput.value}, function() {
        background.minTabs=minTabsInput.value;
          });
}







function makeTable(tabmanager){

var tabmanager=background.tabmanager;

  chrome.tabs.query({windowType: 'normal'}, function(tabs) {
		var tabNum = tabs.length;
		console.log("number of tabs opennnnn");
		console.log(tabNum);
      
      for (var i = 0; i < tabNum; i++) {
        var tab=tabs[i];
  			// Insert a row in the table at row index 0
  			var newRow   = tableRef.insertRow(tableRef.rows.length);
        newRow.setAttribute('tabid',tab.id);

			 // Insert a cell in the row at index 0
  			var newCell  = newRow.insertCell(0);
			// Append a text node to the cell
  			var newText  = document.createTextNode(tab.title);
  			newCell.appendChild(newText);

   			var timerCell  = newRow.insertCell(1);
        timerCell.className = 'timer-cell';
        var lastModified = tabmanager.tabTimes[tab.id];
        var timeAgo = new Date().getTime()-lastModified;
        timerCell.innerHTML=milisecondsToTime(timeAgo);
 	};
 });

    updateAge();
    setInterval(updateAge, 1000);

   	
};


function updateAge(){


var tabmanager=background.tabmanager;


    var cells = document.getElementsByClassName("timer-cell");

console.log("tab manager from updateAge");
    console.log(tabmanager);
      

      for(var i=0; i<cells.length; i++) {
        var cell=cells[i];
        var test= cell.parentNode.getAttribute('tabId');
       // console.log('tab id isssssss');
        //console.log(test);
        var lastModified = tabmanager.tabTimes[test];
        //console.log("last lastModified");
        //console.log(lastModified);
        var timeAgo = new Date().getTime()-lastModified;
        var timeText  = document.createTextNode(milisecondsToTime(timeAgo));

       // var timeAgoSeconds=timeAgo/1000;
        //var seconds=Math.round(timeAgoSeconds);
        cell.innerHTML=milisecondsToTime(timeAgo);
        };  
};






var milisecondsToTime = function(miliseconds) {

  var totalSeconds=miliseconds/1000;
  var hours   = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  // round seconds
  seconds = Math.round(seconds);

  console.log("rounded seconds");
  console.log(seconds);

  var result = (hours < 10 ? "0" + hours : hours);
      result += ":" + (minutes < 10 ? "0" + minutes : minutes);
      result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
  return result;
}


function minutesToMiliseconds(minutes){

  return minutes*60*1000;

}

function milisecondsToMinutes(miliseconds){

return miliseconds/(60*1000);

}






