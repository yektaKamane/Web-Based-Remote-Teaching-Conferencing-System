var msgID = 1;
groupChat = {
  mesgs: [
    { user: "reza", text: "avali", score: null, isTrue: null, ID: msgID++ },
    { user: "ali", text: "dovomi", score: null, isTrue: null, ID: msgID++ },
    { user: "reza", text: "sevomi", score: null, isTrue: null, ID: msgID++ },
    { user: "mmd", text: "char", score: null, isTrue: null, ID: msgID++ },
    { user: "reza", text: "panj", score: null, isTrue: null, ID: msgID++ },
  ],

  chat_box: "",
  username: "",

  init: function () {
    this.msgID = 1;
    this.chat_box = document.getElementById("chatbox");
    this.username = attendees.user_name;
    for (var i in this.mesgs) {
      var node = document.createElement("p");
      var textnode = document.createTextNode(
        `${this.mesgs[i].user}: ${this.mesgs[i].text}`
      );
      node.appendChild(textnode);
      this.chat_box.appendChild(node);
    }
    document
      .getElementById("export-chat")
      .addEventListener("click", this.export);
    document.getElementById("submsg").addEventListener("click", this.send);
    document.getElementById("msg").addEventListener("keypress", function (e) {
      if (e.keyCode == 13) {
        e.preventDefault();
        groupChat.send();
      }
    });
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

  send: function () {
    var msg = document.getElementById("msg");
    if (msg.value.length > 0) {
      var newmsg = {
        user: this.username,
        text: msg.value,
        score: null,
        isTrue: null,
        ID: msgID++,
      };
      //this.mesgs.push(newmsg); // get a newmsg and push it
      groupChat.pushMssg(newmsg);
    }
  },

  pushMssg: function (newMssg) {
    this.mesgs.push(newMssg);
    var msg = document.getElementById("msg");
    msg.value = "";
    this.chat_box.value = "";
    const html = `<div class="message"><div 
        class="msg-text">${newMssg.user} : ${newMssg.text}</div>
       <form action="" name='message'>
        <input type="text" class="scoresize" name='score' id="score-${newMssg.ID}" />
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
};
