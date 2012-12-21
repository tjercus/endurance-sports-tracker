var http = require('http');

/* Simpel light-weight REST service used for testing */

var aArr = [
	{id: 1, type: "running", date: "10112012", duration: 2200, distance: 12000, notes: "a nice run"},
	{id: 2, type: "swimming", date: "09112012", duration: 1345, distance: 2700, notes: "a decent swim"},
	{id: 3, type: "swimming", date: "23082012", duration: 1234, distance: 4321, notes: "a nice swim"},
	{id: 4, type: "cycling", date: "23082012", duration: 76531, distance: 9500, notes: "a nice cycle ride"},
	{id: 5, type: "running", date: "10102012", duration: 2200, distance: 12000, notes: "a nice run 2"},
	{id: 6, type: "swimming", date: "09102012", duration: 1345, distance: 2700, notes: "a decent swim 2"},
	{id: 7, type: "swimming", date: "23072012", duration: 1234, distance: 4321, notes: "a nice swim 2"},
	{id: 8, type: "cycling", date: "23092012", duration: 76531, distance: 9500, notes: "a nice cycle ride 2"}
];

var server = http.createServer(function(req, res) {
  res.writeHead(200);//, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(aArr));
});
server.listen(6666);
