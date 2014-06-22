//Fonctions de synchronisation d'affichage

require(["var/game","class/Player","components/requestanimFrame","config/config","config/box2dConfig","controllers/GarbageCollector"] , function(game,Player,requestAnimFrame,config,box2dConfig,garbageCollector) {
	
	notif = document.getElementById('notif');
	btnStart = document.getElementById("start");
	var pause = false;
	var Game = game;
	// console.log(Game)

        window.addEventListener("mousemove",function(e){
            if(Game.players[1].click===true){
              rect = config.canvas.getBoundingClientRect();
              var mousePos ={x:(e.clientX-rect.left)/(rect.right-rect.left)*config.canvas.width
                            ,y:(e.clientY-rect.top)/(rect.bottom-rect.top)*config.canvas.height};
              Game.players[1].updatePointer(mousePos,Game);
            }
        })
        window.addEventListener("mousedown",function(e){
            if(Game.players[1].click===false){
               var coord =  Game.players[1].getMouseCoord({x:e.offsetX,y:e.offsetY},Game);
                Game.players[1].createCuter(coord);
                Game.players[1].click=true;
            }
        })
        window.addEventListener("mouseup",function(e){
            if(Game.players[1].click===true ){
                Game.players[1].destroyCuter(Game);
                Game.players[1].click=false;
                box2dConfig.world.DestroyJoint(Game.players[1].mouse_joint);
                Game.players[1].mouse_joint=undefined;
            }
        })

    Game.gestion.input.addEvent("mousemove", window,Game);
    Game.gestion.input.addEvent("keydown", window,Game);
    Game.gestion.input.addEvent("keyup", window,Game);

	function disappear(){
		notif.classList.add("displayNone"); 
		notif.classList.remove(" animated bounceOut");
	}
	
	notif.addEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', disappear);
	btnStart.addEventListener('click', function(){Game.gestion.eventControler.emit("start")});
	config.canvas.addEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', removeAnimations);
	
	function removeAnimations(){
		console.log('je remove batar')
	}
	
	Game.gestion.eventControler.add("start", function(){
		pause = true;
		notif.classList.add("animated");
		notif.classList.add("bounceOut");
		config.canvas.classList.remove("displayNone");
	});
var toto=0;
	Game.gestion.eventControler.add("win", function(){
		pause = false;
		notif.className -= "displayNone"; 
		notif.className +=" animated bounceIn"
		config.canvas.classList.add("animated");
		config.canvas.classList.add("shake");
		if (toto===0) {
		toto+=1	
		Game.gestion.box2dConfig.initWorld();
		};
	});

	Game.gestion.eventControler.add("gameOver", function(){
		pause = false;
		notif.className -= "displayNone"; 
		notif.className +=" animated bounceIn"
		config.canvas.classList.add("animated");
		config.canvas.classList.add("swing");
	});

	function cleanCanvas()
	{
		config.canvas.width=config.canvas.width;
		config.canvas.height=config.canvas.height;
		config.context.clearRect ( 0 , 0 , config.canvas.width , config.canvas.height );
	}	
	
	function update()
	{
		var _scene = Game.sceneContainer;
		for (var index in _scene)
		{
			if(_scene[index].draw)
				_scene[index].draw(Game);
			else 
			{
				if(_scene[index].getDead !== undefined&&!_scene[index].getDead())
					_scene[index].obj.draw(Game);
			}

		}
		// console.log(Game.players[1])
		if(Game.players[1]!==undefined)
		Game.players[1].update(Game);
	}

	(function gameloop(){
		if(Game.gestion.gameStatus !== 'gameOver')
		{		
			if(pause){
				cleanCanvas();

				Game.gestion.box2DWorld.Step(1/60,10,10);

				update();
			}
			Game.gestion.camera.run();
			// Game.gestion.camera.debug(config.context);
		    // Game.gestion.box2DWorld.DrawDebugData();
		    
			garbageCollector(Game);

			requestAnimFrame(gameloop);
		}
		else
			document.getElementById('gameOver').style.display = 'inline-block';

	})();
});
