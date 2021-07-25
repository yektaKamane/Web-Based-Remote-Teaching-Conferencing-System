
attendees = {
    //WhiteboardUi.init($("#canvas"));
    arrayVariable : ['ali hasani','mina nayernia','zahra sedaqat','mamad bastin','yekta kamane'],
    arrayLength : 0,
    arrayVariablerole : ['host','presenter','presenter','presenter','presenter'],
    user_role : "host",
    user_name : "ali",
    
    init : function(){
      this.arrayLength = this.arrayVariable.length;
      for (i = 0; i < this.arrayLength; i++) {
   
        var div = document.createElement('div');
        div.id = i;
        div.innerHTML = this.arrayVariable[i] + "        (" + this.arrayVariablerole[i] + ")";
        document.getElementById('chatmat').appendChild(div);
        // $("#" +i).prepend('<i class="fa fa-userp" style="margin : 5px;"></i>');
        $("#" + i ).css({"background-color": "#DBD7CB", "border": "none" , "border-radius" : "0px" , "margin" : "5px"  , "height" : "20px" , "padding" : "10px 20px", "vertical-align" : "middle" }); ;
        $("#" + i).prepend('<div class="dropdown" style="float : right; "> <button class="button-user"> <i class="fa fa-ellipsis-v" style="float : right;"></i> </button> <div class="dropdown-content" class="dropdoen-left" style="right: 4px;left: auto;width:50px;background-color:white;" ><button class="dropdown-userbt chng-host">change to host</button><button class="dropdown-userbt chng-pres" >change to presenter</button> <button class="dropdown-userbt chng-mic" id="chng-mic" onclick="allow_mic(this)" value="#000" >Disable/Enalble mic</button> </div></div>');
      }

      if (this.user_role == "host"){
        $(".presenter").show();
        $(".activate_mic").show();
        $(".leftslidebar").show();
        $(".button-user").show();
        $(".chng-host").show();
        $(".chng-pres").show();
        $(".chng-mic").show();
      }
    
      if(this.user_role == "presenter"){
        $(".presenter").show();
        $(".activate_mic").show();
        $(".leftslidebar").show();
        $(".button-user").show();
        $(".chng-mic").show();
      }

    },

    join : function(){
      arrayVariable = ['ali hasani','mina nayernia','zahra sedaqat','mamad bastin','yekta kamane'];
      arrayVariablerole = ['host','presenter','presenter','presenter','presenter'];
    },


    addUser : function(){
      this.arrayVariable = arrayVariable;
      this.arrayVariablerole = arrayVariablerole;
      var username = document.getElementById("enter_username");
      this.user_name = username;
      this.role = "ordinary";
      attendees.add_new_user(username, "ordinary");
      //this.arrayVariable.push(username.value);
      //this.arrayVariablerole.push('ordinary');
    },

    add_new_user : function(user_name, role){
      //console.log("jj");
      this.arrayVariable.push(user_name.value);
      this.arrayVariablerole.push(role);
      
    },

    remove_user : function(user_name){
      this.arrayLength = this.arrayVariable.length;
      for (i=0; i<this.arrayLength; i++){
        if (this.arrayVariable[i] == user_name){
          delete this.arrayVariable[i];
        }
      }
    },
 
          /* newly added function below */

    pushAttendee : function(username, role){
      var div = document.createElement('div');
      div.id = i;
      div.innerHTML = username + "        (" + role + ")";
      document.getElementById('chatmat').appendChild(div);
      // $("#" +i).prepend('<i class="fa fa-userp" style="margin : 5px;"></i>');
      $("#" + i ).css({"background-color": "#DBD7CB", "border": "none" , "border-radius" : "0px" , "margin" : "5px"  , "height" : "20px" , "padding" : "10px 20px", "vertical-align" : "middle" }); ;
      $("#" + i).prepend('<div class="dropdown" style="float : right; "> <button class="button-user"> <i class="fa fa-ellipsis-v" style="float : right;"></i> </button> <div class="dropdown-content" class="dropdoen-left" style="right: 4px;left: auto;width:50px;background-color:white;" ><button class="dropdown-userbt chng-host">change to host</button><button class="dropdown-userbt chng-pres" >change to presenter</button> <button class="dropdown-userbt chng-mic" id="chng-mic" onclick="allow_mic(this)" value="#000" >Disable/Enalble mic</button> </div></div>');
    
    },

    allow_mic : function(){
      alert("disable or enable mic");
    },
    
    des_en_mic : function(){
    
      var x = $("#activate_mic").val();
      alert(x);
    
      if ( x == "#009900"){
        $("#activate_mic").css({'background': '#e60000' , 'border-radius' : '30px' ,}) ; //red
        $("#activate_mic").val("#e60000");
      }
      else{
        $("#activate_mic").css({'background': '#009900', 'border-radius' : '30px' ,}) ; //green
        $("#activate_mic").val("#009900");
      }

    }

}
