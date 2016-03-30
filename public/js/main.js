var ws = new WebSocket('ws://' + window.document.location.host);

var name = prompt("Enter name");

ws.onmessage = function(message) {
  var data = JSON.parse(message.data);
  /*With an open WebSocket, the browser will receive messages. These messages are structured as a JSON response with two keys: name (name’s name) and text (name’s message). When the message is received, it’s inserted as a new entry in the page.*/
  var al = '';
  var resText = '';
  if (data.name === name) {
  	al = 'u-pull-left';
  } else {
  	al = 'u-pull-right';
  	resText = ' resText';
  }
  $('#chat').append("<div class='row'><div class='" + al + resText +" response'><strong>" + data.name + "</strong id='resName'><p>" + data.text + '</p></div></div>');
};

$('form').on('submit', function(event) {
  /* override the form submit button to grab the the values from the form and send them as a JSON message over the WebSocket to the server.*/	
  event.preventDefault();
  var text = $('#message')[0].value;
  ws.send(JSON.stringify({ name: name, text: text }));
  $('#message')[0].value = '';
});