// import { socket } from './socket.js';
var msgID = 1;
var groupChat = {

  mesgs : [],

  chat_box : "",
  username : "",
  user_id: 0,

  init : function(user_id, socket){
    this.user_id = user_id;
      this.chat_box = document.getElementById("chatbox");
      this.username = attendees.user_name;
      for (var i in this.mesgs) {
          var node = document.createElement("p");
          var textnode = document.createTextNode(`${this.mesgs[i].user}: ${this.mesgs[i].text}`); 
          node.appendChild(textnode);
          this.chat_box.appendChild(node);
      }
      document.getElementById("export-chat").addEventListener("click", this.export);
      document.getElementById("clear-chat").addEventListener("click", this.clear);
      document.getElementById("submsg").addEventListener("click", this.send);
      document.getElementById("msg").addEventListener("keypress",function(e){
          if (e.keyCode == 13) {
              e.preventDefault();
              groupChat.send(socket);
          }
      })
  },


  export: function () {
    groupChat.CreateReport();
  },

  CreateReport: function (ReportName = "") {
    // Export to excel
    var downloadLink;
    var dataType = "application/vnd.ms-excel";
    ReportName = ReportName ? ReportName + ".xls" : "" + "Chatlist.xls"; //modify excle sheet name here
    downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(["\ufeff"], {
        type: dataType,
      });
      navigator.msSaveOrOpenBlob(blob, ReportName);
    } else {
      downloadLink.href = "data:" + dataType + ", ";
      downloadLink.href += `<table><tbody>
          <tr><th>Name</th><th>Message</th><th>Score</th><th>Correctness</th></tr>`;
      for (i = 0; i < this.mesgs.length; i++) {
        downloadLink.href += "<tr><td>" + this.mesgs[i].user + "</td>";
        downloadLink.href += "<td>" + this.mesgs[i].text + "</td>";
        downloadLink.href += "<td>" + this.mesgs[i].score + "</td>";
        downloadLink.href += "<td>" + this.mesgs[i].isTrue + "</td></tr>";
      }
      downloadLink.href += `</tbody><table>`;
      downloadLink.download = ReportName;
      downloadLink.click();
    }
  },

  send : function(socket){
    //var msg = document.getElementById("msg");
    if (msg.value.length > 0) {
      var newmsg = { user: this.user_id , text: msg.value };
      //this.mesgs.push(newmsg); // get a newmsg and push it
      // groupChat.pushMssg(newmsg);
      // import { socket } from './socket.js';
      // Tarp.require({main: "./socket.js"});
      // import './socket';
      // console.log(socket);
      socket.emit('chat', newmsg);
    }

  },

  pushMssg : function(name, msssg){
    var newMssg = {user: name, text: msssg, score:null, isTrue:null, ID: msgID++};
    this.mesgs.push(newMssg);
    var msg = document.getElementById("msg");
    msg.value = "";
    this.chat_box.value = "";
    const html = `<div class="message">
        <p class="msg-text">${newMssg.user} : ${newMssg.text}</p>
       <form action="" name='message'>
        <input type="text" name='score' id="score-${newMssg.ID}" />
        <input type="checkbox" class="IsTrue" name='accept' id="isTrue-${newMssg.ID}">
       </form>
        </div>`;

    this.chat_box.insertAdjacentHTML("beforeend", html);
    document
      .getElementById(`isTrue-${newMssg.ID}`)
      .addEventListener("change", this.checkTrue);
    document
      .getElementById(`score-${newMssg.ID}`)
      .addEventListener("keyup", this.giveScore);
  },

  checkTrue: function () {
    //         ********          in bayad ezafe she
    let id = Number(this.id.slice(this.id.indexOf("-") + 1));
    let hoof = groupChat.mesgs.find((m) => m.ID == id);
    if (this.checked) {
      hoof.isTrue = true;
    } else {
      hoof.isTrue = null;
    }
  },

  giveScore: function () {
    //         ********          in  bayad ezafe she
    let id = Number(this.id.slice(this.id.indexOf("-") + 1));
    let hoof = groupChat.mesgs.find((m) => m.ID == id);
    hoof.score = Number(this.value);
  },

  clear : function () {
    //console.log("del");
    msgID = 0 // hatman ezafe she
    this.chat_box = document.getElementById("chatbox");
    while (this.chat_box.hasChildNodes()) {
        this.chat_box.removeChild(this.chat_box.firstChild);
    }
    groupChat.mesgs.length = 0
        // clear list of msg from server
  }


}