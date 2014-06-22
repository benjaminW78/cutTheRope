define(function(){


/*create by : winckell benjamin*/

/*exemples de fonctions appelez aux events*/
function usedOnMouseDown()
{
	console.log("mousedow");
}
function usedOnMouseUp()
{
	console.log("mouseUp");
}
function usedOnMouseMove(e)
{
	// player.pos = {x : e.offsetX, y : e.offsetY};
	// console.log("mouseMove",{x : e.offsetX/30, y : e.offsetY/30});
}

function playerMoveLeft (e,Game)
{
	Game.players[1].keys.left = true;
}
function playerMoveUp (e,Game)
{
	Game.players[1].keys.up = true;
}
function playerMoveRight (e,Game)
{
	Game.players[1].keys.right = true;
}
function playerMoveDown (e,Game)
{
	Game.players[1].keys.down = true;
}
function playerStopLeft (e,Game)
{
	Game.players[1].keys.left = false;
}
function playerStopUp (e,Game)
{
	Game.players[1].keys.up = false;
}
function playerStopRight (e,Game)
{
	Game.players[1].keys.right = false;
}
function playerStopDown (e,Game)
{
	Game.players[1].keys.down = false;
}
function switchMember(e,Game)
{
	Game.players[1].switchmember(Game);
}
/* Appel des methodes playerAction dans la classe Player */
function action1(e,Game)
{
	Game.players[1].memberAction("action1");
}
function action2(e,Game)
{
	Game.players[1].memberAction("action2");
}
/* array of keys who are catched by events*/
// var keyBind ={
// 				0 : {
// 						mousemove : usedOnMouseMove
// 					},
// 					37 : { 
// 							keydown : playerMoveLeft,keyup : playerStopLeft
// 						  },
// 					38 : { 
// 							keydown : playerMoveUp,keyup : playerStopUp
// 						  },
// 					39 : { 
// 							keydown : playerMoveRight,keyup : playerStopRight
// 						  },
// 					40 : { 
// 							keydown : playerMoveDown,keyup : playerStopDown
// 						  },

// 				87: {keydown: function(){console.log("Down");}, keyup: function(){console.log("Up");},keypress: function(){console.log("bite");}}
// 			};
/*
*class of input event gestion.
*this lib can be use for manage simples inputs with multi events
*Need to be instanciate in object in init of your game like that, var toto = new Input;

*Methodes : 
* 	addEvent() 2 params necessary	 --> first : string of the event who will be add (keydown,keyup,mousemove etc...); 
								 	 --> second : dom object like window or a document.getElementBy of what you want;
	use : for add event listenner on object;

*	removeEvent() 2 params necessary --> first : string of the event who will be remove (keydown,keyup,mousemove etc...);
								 	 --> second : dom object who had event listenner;
	use : for remove event listenner of an object;

*	setKeyBind() 2 params necessary	 --> first : integer of the key you want to bind with event(s). 									 
								 	 --> second : objet of event(s) you want to use and function call by this event: {keypress : function(){}, keydown : functionWhoDoSomething };
	use : for add or edit one key with event(s);	

*	getKeysBind() 
	use : return you object who contain all keys binding and all events call for those keys.
*/
	return Input = function(Game)
	{

		var key = {
					0 : {
							mousemove : usedOnMouseMove
						},
			  65/*81*/ : {
							keydown : switchMember
						 },
			  /* Defini la function appelé par chaque couple key/event */
					69 : { 
							keydown : action1
						  },
					82 : { 
							keydown : action2
						  },
			  37/*65*/ : { 
							keydown : playerMoveLeft,keyup : playerStopLeft
						  },
			  38/*32*/ : { 
							keydown : playerMoveUp,keyup : playerStopUp
						  },
			  39/*68*/ : { 
							keydown : playerMoveRight,keyup : playerStopRight
						  },
			  40/*83*/ : { 
							keydown : playerMoveDown,keyup : playerStopDown
						  },
					// 87: {keydown: function(){console.log("Down");}, keyup: function(){console.log("Up");},keypress: function(){console.log("bite");}}
				};
		Input.prototype.addEvent = function(Input , target)
		{	
			target.addEventListener(Input, this.functionCall,false);
		}
		Input.prototype.functionCall = function(e)
		{
			if(key.hasOwnProperty(e.keyCode) && typeof key[e.keyCode][e.type] === "function")
				key[e.keyCode][e.type](e,Game);
			// else
				// console.log("key["+e.keyCode+"] est undefined ou key["+e.keyCode+"]["+e.type+"] n'est pas une fonction");	
		}
		Input.prototype.removeEvent = function(Input , target)
		{
			target.removeEventListener(Input,this.functionCall,false);
		}
		Input.prototype.setKeyBind = function(keyInt , object)
		{
				if(typeof keyInt === 'number' && key.hasOwnProperty(keyInt) === false)
					key[keyInt] = object;
				else if(key.hasOwnProperty(keyInt) && typeof keyInt === 'number')
					for (var index in object)
						key[keyInt][index] = object[index]; 
				// else if (typeof keyInt !== 'number')
					// console.log(keyInt+" isn't a number");
		}
		Input.prototype.getKeysBind = function()
		{
			return key;
		}
	}
});