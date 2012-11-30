function MusuWriter(app) {
  this.appContext = app;
}

var start_obj;
var musu;

Musubi.ready(function(context) {
    musu = new MusuWriter(context);
    start_obj = musu.appContext.obj;
    
    if (start_obj == null) {
		// Need a few seconds of initialization time,
		// so prevent users from clicking the nose.
		$("#pressme").hide();
		$("#the_nose").hide();
		$("body").append("<div id='temp'>Please wait 5 seconds while Nose Goes loads...</div>");
      	
    	var gameStartText = "Started a Nose Goes. Hurry and join in if you don't want to lose!";
    	var gameIcon = "<img src='http://lisayan.github.com/Nose_Goes/musubi/apps/images/nose_goes_icon.png'>";
    	var html = gameStartText + gameIcon;
    	var content = { "__html" : html, "text" : gameStartText};
      	var obj = new SocialKit.Obj({type : "game_session", json: content});
      	
      	musu.appContext.feed.post(obj); // post message for game start
      	
      	var user_obj = makeUser(context); // get user object of person starting game
      
      	setTimeout(func, 5000);
			function func() {
    			var data = musu.appContext.feed.query("type='game_session'", "_id desc limit 1");

				data = data[data.length - 1]; //getting game state
		      	start_obj = new SocialKit.DbObj(data); 
				
				// Initialization is over, so show the nose again
				$("#pressme").show();
				$("#the_nose").show();
				$("#temp").remove();
		      	alert("Game is now ready, now press the Nose!");
		}
  	}
      
    $("#the_nose").click(function(e) {
    	var text = "Pressed the nose!";
    	var html = text;
    	var content = { "__html" : html, "text" : text};
      	var obj = new SocialKit.Obj({type : "user_post", json: content});
      	musu.appContext.feed.post(obj);
      	
      	var player = makeUser(context);
      	
     	start_obj.post(player);
     	alert(start_obj.query("type='user'").length + " people have clicked!");
     	
		var name = player.json['name']; //getting player name	
   		if (start_obj.query("type='user'").length == context.feed.members.length) {
   			alert("Pressed the nose! You lost!");
     		var text = name + " lost the Nose Goes!";
    		var html = text;
    		var content = { "__html" : html, "text" : text};
      		var end_obj = new SocialKit.Obj({type : "end_game", json: content})
      		musu.appContext.feed.post(end_obj);  
      	} 
   		else {
   			alert("Pressed the nose! You're safe!");
      	} 
      	
    	musu.appContext.quit();
	});
    
	//makes user object
	function makeUser(context)
	{
		var userID = context.user['id'];
		var user_json = {"id" : userID, "name" : context.user['name']};
		user_obj = new SocialKit.Obj({type: "user", json: user_json});
		return user_obj;
	}

	//returns the user
	function getUser(context)
	{
		var user_arr = start_obj_DbObj.query("type = 'user'");
		for(i=0; i<user_arr.length; i++){
			temp_user = new SocialKit.Obj(user_arr[i]);
			temp_ID = temp_user.json['id'];
			if(temp_ID == context.user['id']){
				return user_arr[i];
			}
		}
		return null;
	} 

});