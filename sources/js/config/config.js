define(function(){

var config = {
				canvasObject : { width : 800 , height : 600 , color : "green"},
				context : document.getElementById('canvas').getContext("2d"),
				canvas : document.getElementById('canvas')
			}

	config.canvas.width  = config.canvasObject.width;
	config.canvas.height = config.canvasObject.height;
	config.imagesSrc = [{w:96,h:91,src:"sources/images/decors/coin1.png"},
                        {w:256,h:256,src:"sources/images/decors/player.png"},
                        {w:411,h:399,src:"sources/images/decors/cutter.png"},
                        {w:42,h:24,src:"sources/images/decors/ground.png"},
                        {w:12,h:29,src:"sources/images/decors/rope.png"},
                        {w:42,h:42,src:"sources/images/decors/rock.png"},
                        {w:30,h:22,src:"sources/images/decors/bad.png"}
                        ];

    return config;
// var family = { players : { Category : 0x0001} ,
// 			   ennemies : { Category : 0x0002},
// 			   collectibles : { Category : 0x0003}	
// 			 }
});