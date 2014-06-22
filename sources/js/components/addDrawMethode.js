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
			 		if(this.characts.pattern!==undefined){
			 			this.characts.w = this.box2dObj.m_shape.m_vertices[2].x * Game.gestion.worldScale * 2;
			 			this.characts.h = this.box2dObj.m_shape.m_vertices[2].y * Game.gestion.worldScale * 2;
			 			config.context.fillRect(( this.characts.w*0.5) * -1, (this.characts.h * 0.5) * -1, this.characts.w, this.characts.h);
			 			config.context.fillStyle=this.characts.pattern;
			 			config.context.fill();
			 		}
		 			else if(this.characts.box2DW && this.characts.img!==undefined){
		 				// console.log(this.characts)
		 				if(this.characts.img!==undefined)
                        config.context.drawImage(this.characts.img,0,0,this.characts.imgWidth,this.characts.imgHeight,this.characts.imgW*-0.5,this.characts.imgH*-0.5,this.characts.imgW,this.characts.imgH);

		 			}
			 		else if(this.characts.box2DW)
			 		{
			 			this.characts.w = this.box2dObj.m_shape.m_vertices[2].x * Game.gestion.worldScale * 2;
			 			this.characts.h = this.box2dObj.m_shape.m_vertices[2].y * Game.gestion.worldScale * 2;
			 			config.context.fillRect(( this.characts.w*0.5) * -1, (this.characts.h * 0.5) * -1, this.characts.w, this.characts.h);
			 		}
			 		//dessins du cercle
			 		if(this.characts.radius && this.characts.img===undefined)
			 		{
			 			// this.characts.radius = this.box2dObj.m_shape.m_radius * Game.gestion.worldScale;
			 			config.context.arc(0, 0, this.characts.radius * Game.gestion.worldScale, 0, Math.PI * 2, 1);
 						config.context.fill();	
 						config.context.stroke();
		 			}
		 			else if(this.characts.radius && this.characts.img!==undefined){
		 				// console.log(this.characts)
		 				if(this.characts.img!==undefined)
                        config.context.drawImage(this.characts.img,0,0,this.characts.imgWidth,this.characts.imgHeight,this.characts.imgW*-0.5,this.characts.imgH*-0.5,this.characts.imgW,this.characts.imgH);

		 			}
		 		}		 		

				// on restaure le canvas a son etat original.
				config.context.restore();
				// on arrete de dessiner
				config.context.closePath();
			};
		}
});
