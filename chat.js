
groupChat = {

    mesgs : [
      { user: "reza", text: "asfjhdjkfasaasfasfkadskfhadshfjkasl", inchat: false },
      { user: "ali", text: "hello", inchat: false },
      { user: "reza", text: "asffaf", inchat: false },
      { user: "mmd", text: "asfjhdjkfkadskfhadshfjkasl", inchat: false },
      { user: "reza", text: "asfjhdjkfkadskfhadshfjkasl", inchat: false },
    ],
  
    chat_box : "",
    username : "",

    init : function(){
        this.chat_box = document.getElementById("chatbox");
        this.username = attendees.user_name;
        for (var i in this.mesgs) {
            var node = document.createElement("p");
            var textnode = document.createTextNode(`${this.mesgs[i].user}: ${this.mesgs[i].text}`); 
            node.appendChild(textnode);
            this.chat_box.appendChild(node);
        }
        document.getElementById("export-chat").addEventListener("click", this.export);
        document.getElementById("submsg").addEventListener("click", this.send);
        document.getElementById("msg").addEventListener("keypress",function(e){
            if (e.keyCode == 13) {
                e.preventDefault();
                groupChat.send();
            }
        })
    },

    export : function(){
      groupChat.CreateReport();
    },

    CreateReport : function (ReportName = ''){
      var downloadLink;
      var dataType = 'application/vnd.ms-excel';
      ReportName = ReportName?ReportName+'.xls':''+'Chatlist.xls';//modify excle sheet name here 
      downloadLink = document.createElement("a");
      document.body.appendChild(downloadLink);
      if(navigator.msSaveOrOpenBlob){
          var blob = new Blob(['\ufeff'], {
              type: dataType
          });
          navigator.msSaveOrOpenBlob( blob, ReportName);
      }else{
          downloadLink.href = 'data:' + dataType + ', ' ;
          downloadLink.href += `<table><tbody>
          <tr><th>Name</th><th>Message</th></tr>`;
          for (i=0; i<this.mesgs.length; i++){
            downloadLink.href += '<tr><td>' + this.mesgs[i].user + '</td>';
            downloadLink.href += '<td>' + this.mesgs[i].text + '</td></tr>';
          }
          downloadLink.href += `</tbody><table>`;
          downloadLink.download = ReportName;
          downloadLink.click();
      }
  },
  
    send : function(){
      var msg = document.getElementById("msg");
      if (msg.value.length > 0) {
        var newmsg = { user: this.username , text: msg.value };
        //this.mesgs.push(newmsg); // get a newmsg and push it
        groupChat.pushMssg(newmsg);
      }

    },

    pushMssg : function(newMssg){
        this.mesgs.push(newMssg);
        var msg = document.getElementById("msg");
        msg.value = "";
        this.chat_box.value = "";
        var node = document.createElement("p");
        var textnode = document.createTextNode(`${newMssg.user}: ${newMssg.text}`);
        node.appendChild(textnode);
        this.chat_box.appendChild(node);
        
    }
  
  }