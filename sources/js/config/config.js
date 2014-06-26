define(function(){

var config = {
				canvasObject : { width : 800 , height : 600 , color : "green"},
				context : document.getElementById('canvas').getContext("2d"),
				canvas : document.getElementById('canvas')
			}

	config.canvas.width  = config.canvasObject.width;
	config.canvas.height = config.canvasObject.height;
	config.imagesSrc = [{w:199,h:198,src:"sources/images/decors/coin.png"},
                        {w:256,h:256,src:"sources/images/decors/player.png"},
                        {w:411,h:399,src:"sources/images/decors/cutter.png"},
                        {w:452,h:369,src:"sources/images/decors/grass.png"},
                        {w:50,h:45,src:"sources/images/decors/rope1.png"},
                        {w:141,h:117,src:"sources/images/decors/rock.png"}
                        ];

    return config;
// var family = { players : { Category : 0x0001} ,
// 			   ennemies : { Category : 0x0002},
// 			   collectibles : { Category : 0x0003}	
// 			 }
});