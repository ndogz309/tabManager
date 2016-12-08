
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

//maxAgeInput.value=background.maxAge/(1000*60);
//background.maxAge;
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

// var background = chrome.extension.getBackgroundPage();

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
 	

        //this is miliseconds cos its unix timestamps
        var timeAgo = new Date().getTime()-lastModified;
        //var timeAgoSeconds=timeAgo/1000;
        var nowtime= new Date().getTime();
      

 	     // var inminutes=secondsToMinutes(timeAgoSeconds);
 	      //console.log(inminutes);

        //var timeText  = document.createTextNode(Math.round(timeAgoSeconds));
 	    //  var timeText  = document.createTextNode(milisecondsToTime(timeAgo));
 	     // console.log(timeText);
	//var timerText  = document.createTextNode(tabs[i]);
	//var timerText  = timeAgo;
	//timerCell.appendChild(timeText);
  //timerCell.innerHtml="yooooo";
  	//timerCell.innerHtml="booooo";

      //  var seconds=Math.round(timeAgoSeconds);
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


 // tableRef('.timer-cell').each(function() {
 //  console.log("calling this");
 // });


// updateCountdown = function() {
//   var self = this;
//   $('.time-left').each(function() {
//     var t = null;
//     var myElem = $(this);
//     var tabId = myElem.parent().data('tabid');
//     if (settings.get('paused')) {
//       myElem.html('paused');
//     } else {
//       var lastModified = tabmanager.tabTimes[tabId];
//       var cutOff = new Date().getTime() - settings.get('stayOpen');
//       var timeLeft = -1 * (Math.round((cutOff - lastModified) / 1000)).toString();
//       myElem.html(Popup.Util.secondsToMinutes(timeLeft));
//     }
//   });
// };




var milisecondsToTime = function(miliseconds) {
console.log("miliseconds");
console.log(miliseconds);


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





function secondsToMinutes(seconds) {
  var s = seconds % 60;
  s = s > 10 ? String(s) : "0" + String(s);
  return String(Math.floor(seconds / 60)) + ":" + s;
};


function minutesToMiliseconds(minutes){

  return minutes*60*1000;

}

function milisecondsToMinutes(miliseconds){

return miliseconds/(60*1000);

}



// function timeSinceActive(tab){

//  	var lastModified = tabmanager.tabTimes[tab.id];
//  	var timeAgo = new Date().getTime()-lastModified;
//  	var 

// }






