define(['config/box2dConfig','var/game','class/Ray'],function(box2dConfig,Game,Ray){

    return function addUpdate(myClass)
    {               

            myClass.prototype.update = function(Game)
            {
                var camcoord = Game.gestion.camera.getSpaceInfos();

                var range = ''; // Assign only if 'this' have a 'condition' propertie
                var feet  = ''; // Idem

                var x = this.actualMember.box2dObj.GetBody().GetPosition().x*Game.gestion.worldScale;
                var y = this.actualMember.box2dObj.GetBody().GetPosition().y*Game.gestion.worldScale;
                
                this.posRelative.y = y - camcoord.worldY;
                this.posRelative.x = x - camcoord.worldX;
            
                for (var index in this.members)
                {
                    if(this.members[index]!==undefined)
                    this.members[index].draw(Game);
                }

                if(this.move)
                    this.move();
            
                if(this.lostAllTears.status)
                    this.lostAllTears.exec(Game,this);
            
                
                if (this.conditions)
                {
                    if (this.actualMember.fixDef.userData.radius)
                    {
                        range = this.actualMember.fixDef.userData.radius * 1.5;
                        feet  = this.actualMember.fixDef.userData.radius + this.actualMember.box2dObj.GetBody().GetPosition().y; 
                    }
                    else
                    {
                        range = this.actualMember.fixDef.userData.box2DW * 1.5;
                        feet  = this.actualMember.fixDef.userData.box2DH + this.actualMember.box2dObj.GetBody().GetPosition().y;
                    }

            
                    this.conditions.inSight = new Ray( this.actualMember.box2dObj.GetBody().GetPosition().x
                                                     , this.actualMember.box2dObj.GetBody().GetPosition().y
                                                     , this.getDirection(range)
                                                     , 0);
                    // this.conditions.inSight.rayTrace();
                    // debugger;
                    // console.log("updateBool: " + this.conditions.inSight._thisRay);
                    
                    // console.log(this.conditions.inSight);
                    
                    this.conditions.onGround = new Ray( this.actualMember.box2dObj.GetBody().GetPosition().x
                                                      , feet 
                                                      , 0
                                                      , .5);
        
                    // console.log(this.catch.state);
                    this.conditions.inSight.draw(Game);
                    this.conditions.onGround.draw(Game);

                    // this.conditions.onGround.draw(Game);
                }
            }
        // }
    }
});   