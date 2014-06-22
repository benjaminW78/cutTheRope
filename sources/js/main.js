//Fonctions de synchronisation d'affichage

require(["var/game","class/Player","components/requestanimFrame","config/config","controllers/GarbageCollector"] , function(Game,Player,requestAnimFrame,config,garbageCollector) {

	function cleanCanvas()
	{
		config.context.fillStyle = config.canvasObject.color; 
		config.context.fillRect(0,0,config.canvas.width,config.canvas.height);	
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
			cleanCanvas();
			Game.gestion.box2DWorld.Step(1/60,10,10);
			update();
			Game.gestion.camera.run();
			Game.gestion.camera.debug(config.context);
		    // Game.gestion.box2DWorld.DrawDebugData();
		    
			garbageCollector(Game);

			requestAnimFrame(gameloop);
		}
		else
			document.getElementById('gameOver').style.display = 'inline-block';

	})();
});
