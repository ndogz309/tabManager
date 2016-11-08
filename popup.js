onLoad=getTabs();


document.getElementById('get-tabs').onclick = getTabs;

function getTabs() {


chrome.tabs.query({
windowType: 'normal'

}, function(tabs) {

var tableRef = document.getElementById('mytable');
var tabNum = tabs.length;
console.log("number of tabs opennnnn");
console.log(tabNum);

 for (var i = 0; i < tabNum; i++) {
  


console.log("this is a tab")

  // Insert a row in the table at row index 0
  var newRow   = tableRef.insertRow(tableRef.rows.length);

  // Insert a cell in the row at index 0
  var newCell  = newRow.insertCell(0);

  // Append a text node to the cell
  var newText  = document.createTextNode(tabs[i].title);
  newCell.appendChild(newText);
   	

  }


});

};


