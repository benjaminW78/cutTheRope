define(["config/config"],function(config){

	return function addDrawMethode(myClass)
		{
			myClass.prototype.draw = function(Game)
			{
				// debugger;
				// console.log(this);
				var camcoord = Game.gestion.camera.getSpaceInfos();
        
				if(this.color.inside != undefined)
		 			config.context.fillStyle = this.color.inside;
				if(this.color.outside != undefined)
		 			config.context.strokeStyle = this.color.outside;

		 		// DEBUG Tracé d'un RayCast
		 		if(this.characts.origin)
		 		{
		 			// console.log(this.characts.origin);
		 			// this.characts.x = this.box2dObj.GetBody().GetPosition().x*Game.gestion.worldScale;
			 		// this.characts.y = this.box2dObj.GetBody().GetPosition().y*Game.gestion.worldScale;
			 		config.context.beginPath();
			 		// console.log(this.color.inside);
			 		config.context.strokeStyle = this.color.inside;
					config.context.beginPath();
					config.context.moveTo(this.characts.origin.x * Game.gestion.worldScale - camcoord.worldX, this.characts.origin.y * Game.gestion.worldScale - camcoord.worldY);
					config.context.lineTo(this.characts.end.x * Game.gestion.worldScale - camcoord.worldX, this.characts.end.y * Game.gestion.worldScale - camcoord.worldY);
					config.context.stroke();
		 			// this.characts.w = this.box2dObj.m_shape.m_vertices[2].x*Game.gestion.worldScale*2;
		 			// this.characts.h = this.box2dObj.m_shape.m_vertices[2].y*Game.gestion.worldScale*2;
		 			// config.context.fillRect(( this.characts.w*0.5)*-1, (this.characts.h*0.5)*-1,this.characts.w,this.characts.h);
		 		}
		 		else
		 		{

		 			this.characts.x = this.box2dObj.GetBody().GetPosition().x * Game.gestion.worldScale;
			 		this.characts.y = this.box2dObj.GetBody().GetPosition().y * Game.gestion.worldScale;
	
			 		this.characts.angle = this.box2dObj.GetBody().GetAngle();
					config.context.beginPath();
					// mise en place de l'angle
					config.context.save();
					//deplacement vers l'objet par rapport à la camera
					config.context.translate((this.characts.x - camcoord.worldX ) , (this.characts.y - camcoord.worldY) );
					//rotate du canvas par L'angle de l'objet unity
					config.context.rotate(this.characts.angle);
	
			 		//dessins du rectangle
			 		if(this.characts.box2DW)
			 		{
			 			this.characts.w = this.box2dObj.m_shape.m_vertices[2].x * Game.gestion.worldScale * 2;
			 			this.characts.h = this.box2dObj.m_shape.m_vertices[2].y * Game.gestion.worldScale * 2;
			 			config.context.fillRect(( this.characts.w*0.5) * -1, (this.characts.h * 0.5) * -1, this.characts.w, this.characts.h);
			 		}
			 		//dessins du cercle
			 		if(this.characts.radius)
			 		{
			 			// this.characts.radius = this.box2dObj.m_shape.m_radius * Game.gestion.worldScale;
			 			config.context.arc(0, 0, this.characts.radius * Game.gestion.worldScale, 0, Math.PI * 2, 1);
 						config.context.fill();	
 						config.context.stroke();
		 			}
		 		}		 		

				// on restaure le canvas a son etat original.
				config.context.restore();
				// on arrete de dessiner
				config.context.closePath();
			};
		}
});
