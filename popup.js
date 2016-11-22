
var background = chrome.extension.getBackgroundPage();
var tableRef = document.getElementById('mytable');

onLoad=getTabs();


function getTabs(){

//hmmmm have to keep pulling in tabmanager from background.  think of a nicer way of doing this
var tabmanager=background.tabmanager;


  console.log("initial tabmanager");
  console.log(tabmanager);

makeTable(tabmanager);
};



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
 	      console.log("check this");
        console.log(lastModified);
        console.log("aaaand check this");
        console.log(tab.id);
        //this is miliseconds cos its unix timestamps
        var timeAgo = new Date().getTime()-lastModified;
        var timeAgoSeconds=timeAgo/1000;
        var nowtime= new Date().getTime();
        console.log("now time-------");
        console.log(nowtime);
        console.log("modified time-------");
        console.log(lastModified);
 	      console.log(timeAgo);
 	      console.log("in minutes");
 	      var inminutes=secondsToMinutes(timeAgoSeconds);
 	      console.log(inminutes);
 	      var timeText  = document.createTextNode(Math.round(timeAgoSeconds));
 	      console.log(timeText);
	//var timerText  = document.createTextNode(tabs[i]);
	//var timerText  = timeAgo;
	//timerCell.appendChild(timeText);
  //timerCell.innerHtml="yooooo";
  	//timerCell.innerHtml="booooo";

        var seconds=Math.round(timeAgoSeconds);
        timerCell.innerHTML=seconds;
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
        console.log('tab id isssssss');
        console.log(test);
        var lastModified = tabmanager.tabTimes[test];
        console.log("last lastModified");
        console.log(lastModified);
        var timeAgo = new Date().getTime()-lastModified;
        var timeAgoSeconds=timeAgo/1000;
        var seconds=Math.round(timeAgoSeconds);
        cell.innerHTML=seconds;
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






function secondsToMinutes(seconds) {
  var s = seconds % 60;
  s = s > 10 ? String(s) : "0" + String(s);
  return String(Math.floor(seconds / 60)) + ":" + s;
};


// function timeSinceActive(tab){

//  	var lastModified = tabmanager.tabTimes[tab.id];
//  	var timeAgo = new Date().getTime()-lastModified;
//  	var 

// }






