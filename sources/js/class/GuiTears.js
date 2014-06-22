define(["config/config","var/game"],function(config,Game){
	return GuiTear = function()
	{
		var params = {};
		this.init=function()
		{
			params.container = {
								x : (config.canvas.style.left+config.canvas.style.width)-100,
								y : (config.canvas.style.top+config.canvas.style.height)+100
							   }
		}	
		
		this.update = function()
		{
			draw();
		}
		
		function draw()
		{
			config.context.fillRect(params.w, params.h, ,params.h);
		}
	}
})