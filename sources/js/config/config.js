define(function(){

var config = {
				canvasObject : { width : 800 , height : 600 , color : "green"},
				context : document.getElementById('canvas').getContext("2d"),
				canvas : document.getElementById('canvas')
			}

	config.canvas.width  = config.canvasObject.width;
	config.canvas.height = config.canvasObject.height;
		

    return config;
// var family = { players : { Category : 0x0001} ,
// 			   ennemies : { Category : 0x0002},
// 			   collectibles : { Category : 0x0003}	
// 			 }
});