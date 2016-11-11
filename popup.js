
var background = chrome.extension.getBackgroundPage();

var tabmanager=background.tabmanager;

onLoad=getTabs();


function getTabs(){
console.log("fiiiiiiiireeed");

//lets access the background js







makeTable(tabmanager);

//console.log(test);

};




function makeTable(tabmanager){


	chrome.tabs.query({windowType: 'normal'}, function(tabs) {
		var tableRef = document.getElementById('mytable');
		var tabNum = tabs.length;
		console.log("number of tabs opennnnn");
		console.log(tabNum);


		for (var i = 0; i < tabNum; i++) {

			var tab=tabs[i];
  			// Insert a row in the table at row index 0
  			var newRow   = tableRef.insertRow(tableRef.rows.length);
			 // Insert a cell in the row at index 0
  			var newCell  = newRow.insertCell(0);
			// Append a text node to the cell
  			var newText  = document.createTextNode(tab.title);
  			newCell.appendChild(newText);
   			var timerCell  = newRow.insertCell(1);

 	var lastModified = tabmanager.tabTimes[tab.id];
 	console.log(lastModified);
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
	timerCell.appendChild(timeText);
  	//timerCell.innerHtml="booooo";
  		}
  	});
};
   	

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






