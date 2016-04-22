var ws = new WebSocket('ws://' + window.document.location.host);
var uid = parseInt((Math.random() * 9 + 1) * Math.pow(10, 4 - 1), 10);
var name = '';
while (!$.trim(name)) {
    name = prompt("Enter name", "Eobard Thawne");
}
var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    // Thank you mustache.js!
    return String(string).replace(/[&<>"'\/]/g, function(s) {
        return entityMap[s];
    });
}

function removeUid(string) {
    return string.substring(0, string.length - 4);
}
ws.onmessage = function(message) {
    var data = JSON.parse(message.data);
    var al = '';
    var resText = '';
    if (data.name === name + uid) {
        al = 'u-pull-left';
    } else {
        al = 'u-pull-right';
        resText = ' resText';
    }
    $('#chat').append("<div class='row'><div class='" + al + resText + " response'><strong>"
    + escapeHtml(removeUid(data.name)) + "</strong id='resName'><p>" + escapeHtml(data.text) + '</p></div></div>');
};
$('form').on('submit', function(event) {
    event.preventDefault();
    var text = $('#message')[0].value;
    if ($.trim(text)) {
        ws.send(JSON.stringify({
            name: name + uid,
            text: text
        }));
    } else {
        alert('Write a messege');
    }
    text = '';
});