define(function(){

var config = {
				canvasObject : { width : 800 , height : 600 , color : "green"},
				context : document.getElementById('canvas').getContext("2d"),
				canvas : document.getElementById('canvas')
			}

	config.canvas.width  = config.canvasObject.width;
	config.canvas.height = config.canvasObject.height;
	config.imagesSrc = [{w:199,h:198,src:"sources/images/decors/coin.png"},
                        {w:156,h:81,src:"sources/images/decors/pig.png"},
                        {w:452,h:369,src:"sources/images/decors/scie.png"},
                        {w:452,h:369,src:"sources/images/decors/grass.png"}
                        ];

    return config;
// var family = { players : { Category : 0x0001} ,
// 			   ennemies : { Category : 0x0002},
// 			   collectibles : { Category : 0x0003}	
// 			 }
});