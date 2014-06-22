define(["config/box2dConfig"],function(config){

	return function addMoveMethode(myClass)
		{
			myClass.prototype.keys = { down : false , up : false , left : false , right : false};

			myClass.prototype.direction = "right";
			
			myClass.prototype.setRightDir = function()
			{
				this.direction = "right";
			}

			myClass.prototype.setLeftDir = function()
			{
				this.direction = "left";
			}

			myClass.prototype.getDirection = function(num)
			{
				if (this.direction === "right")
				{
					Math.abs(num);
					return num;
				}
				else if (this.direction === "left")
				{
					num = -num;
					return num;
				}
				else
				{
					throw "Unexpected value of 'direction' propertie, in: " + this;
				}
			}
			
			myClass.prototype.move = function()
			{
				var coef = 1;
				// if(this.actualMember.box2dObj.GetBody().IsActive)			
				if(!this.conditions.onGround.contact) //this.jump.state
				{
					var coef = .5;
				}
	
				if(this.conditions.onGround.contact && this.keys.up && this.actualMember.box2dObj.GetBody().m_linearVelocity.y >= this.speed*-1)
				{
					this.actualMember.box2dObj.GetBody().ApplyImpulse(new config.b2Vec2(0, this.jump.val*2*Math.sin(270* (Math.PI / 180))),this.actualMember.box2dObj.GetBody().GetWorldCenter());
					this.jump.state = true;
				}
				if(this.conditions.onGround.contact && this.keys.down)
					this.actualMember.box2dObj.GetBody().ApplyImpulse(new config.b2Vec2(0, this.speed*2*Math.sin(90* (Math.PI / 180))),this.actualMember.box2dObj.GetBody().GetWorldCenter());
				if(this.keys.left && this.actualMember.box2dObj.GetBody().m_linearVelocity.x >= this.speed*-1)
				{
					this.actualMember.box2dObj.GetBody().ApplyImpulse(new config.b2Vec2(this.speed * Math.cos(180 * (Math.PI / 180)) * coef, this.speed * Math.sin(180 * (Math.PI / 180)) * coef),this.actualMember.box2dObj.GetBody().GetWorldCenter());
					this.setLeftDir();
				}
				if(this.keys.right && this.actualMember.box2dObj.GetBody().m_linearVelocity.x <= this.speed)
				{
					this.actualMember.box2dObj.GetBody().ApplyImpulse(new config.b2Vec2(this.speed * Math.cos(0 * (Math.PI / 180)) * coef, this.speed * Math.sin(0 * (Math.PI / 180)) * coef),this.actualMember.box2dObj.GetBody().GetWorldCenter());
					this.setRightDir();
				}	
				// }
				// else
				// {
				// 	if( this.keys.left && this.actualMember.box2dObj.GetBody().m_linearVelocity.x >= this.speed*-1)
				// 		this.actualMember.box2dObj.GetBody().ApplyImpulse(new config.b2Vec2(this.speed*Math.cos(180* (Math.PI / 180)), this.speed*Math.sin(180* (Math.PI / 180))),this.actualMember.box2dObj.GetBody().GetWorldCente
				// }
			}
		}	
});