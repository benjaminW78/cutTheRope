define(function(){

	return function addUpdateMethode(myClass)
	{
		myClass.prototype.update = function() {
				if(this.keys.down)
				{
					this.pos.y+= 6;
				}
				if(this.keys.up)
				{
					this.pos.y-= 6;
				}
				if(this.keys.left)
				{
					this.pos.x-= 6;
				}
				if(this.keys.right)
				{
					this.pos.x+= 6;
				}	
		};
	}
});
