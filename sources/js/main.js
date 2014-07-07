//Fonctions de synchronisation d'affichage

require(["var/game","class/Player","components/requestanimFrame","config/config","config/box2dConfig","controllers/GarbageCollector"] , function(game,Player,requestAnimFrame,config,box2dConfig,garbageCollector) {
	
	notif = document.getElementById('notif');
    btnStart = document.getElementById("start");
    btnNextLevel = document.getElementById("continue");
    btnRestart = document.getElementById("restart");
	txtExplication = document.getElementsByClassName("explication");
	
    var pause = false;
	var Game = game;

    if(localStorage.currentLevel===undefined)
        localStorage.currentLevel=0;

        window.addEventListener("mousemove",function(e){
            if(Game.players[1].click===true){
                rect = config.canvas.getBoundingClientRect();
                var mousePos =  Game.players[1].getMouseCoord({x:e.offsetX,y:e.offsetY},Game);
                Game.players[1].updatePointer(mousePos,Game);
            }
        })
        window.addEventListener("mousedown",function(e){
            e.preventDefault();
            if(Game.players[1].click===false){
               var coord =  Game.players[1].getMouseCoord({x:e.offsetX,y:e.offsetY},Game);
                Game.players[1].createCuter(coord,Game);
                Game.players[1].click=true;
                config.canvas.style.cursor = 'none';
            }
        })
        window.addEventListener("mouseup",function(e){
            e.preventDefault();

            if(Game.players[1].click === true ){
                Game.players[1].destroyCuter(Game);
                Game.players[1].click = false;
                box2dConfig.world.DestroyJoint(Game.players[1].mouse_joint);
                Game.players[1].mouse_joint = undefined;
                config.canvas.style.cursor = "default";
            }
        })

    Game.gestion.input.addEvent("mousemove", window,Game);
 /*   Game.gestion.input.addEvent("keydown", window,Game);
    Game.gestion.input.addEvent("keyup", window,Game);*/

	function disappear(){
        if(notif.classList.contains("bounceOut"))
        {
            notif.classList.add("displayNone"); 
            notif.classList.remove("animated"); 
            notif.classList.remove("bounceOut");
        }
        else if (notif.classList.contains("bounceIn"))
        {
            notif.classList.remove("displayNone"); 
            notif.classList.remove("animated");
            notif.classList.remove("bounceIn");
        }

    }
    
	notif.addEventListener('webkitAnimationEnd', disappear);
	btnStart.addEventListener('click', function(){Game.gestion.eventControler.emit("start")});
	config.canvas.addEventListener('webkitAnimationEnd', removeAnimations);
	
	function removeAnimations(){
        config.canvas.classList.add("displayNone"); 
        config.canvas.classList.remove("animated");

        if(config.canvas.classList.contains("shake"))
            config.canvas.classList.remove("shake");
        if(config.canvas.classList.contains("swing"))
            config.canvas.classList.remove("swing");
	}
	
	Game.gestion.eventControler.add("start", function(){
		pause = true;
		notif.classList.add("animated");
		notif.classList.add("bounceOut");
		config.canvas.classList.remove("displayNone");
	});

    function reloadPage(){
           window.location.reload(); 
    }

	Game.gestion.eventControler.add("win", function(){
        document.getElementsByClassName("explication")[0].innerHTML="<b>YOU WIN</b> <br/> You completed Level: "+(JSON.parse(localStorage.currentLevel)+1);
        
        if(localStorage.currentLevel!==undefined && typeof JSON.parse(localStorage.currentLevel) ==="number")
        {
            console.log(localStorage);
            localStorage.currentLevel=JSON.parse(localStorage.currentLevel)+1;
            console.log(localStorage);
        }   
        else
        {
            localStorage.currentLevel=1;
        } 
        pause = false;
        notif.classList.add("animated");
        notif.classList.add("bounceIn");
        
        config.canvas.classList.add("animated");
        config.canvas.classList.add("shake");
        
        
        btnStart.classList.add("displayNone");
        btnNextLevel.classList.remove("displayNone");
        btnNextLevel.addEventListener("click",reloadPage);
	   
    });

	Game.gestion.eventControler.add("gameOver", function(){
		pause = false;
		notif.classList.remove("displayNone"); 
        
        notif.classList.add("animated");
		notif.classList.add("bounceIn");

        config.canvas.classList.add("animated");
        config.canvas.classList.add("swing");

        document.getElementsByClassName("explication")[0].innerHTML="<b>GAME OVER</b> <br/> You loose at Level : "+(JSON.parse(localStorage.currentLevel)+1);
        btnRestart.classList.remove("displayNone");
        btnStart.classList.add("displayNone");
        btnRestart.addEventListener("click",reloadPage);

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
