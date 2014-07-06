define(['config/box2dConfig',"components/addDrawMethode","config/config"],function(box2dConfig,addDrawMethode,config){

    /*****************************************************************************************
    *Fonction de création du des obj carré avec box2d du terrain
    *
    *@  params : object who containes somes arguments :  --------------------------------------------------------------------------------------------
    Case of success  : return true                      |       Keys            |       value Type  |       Obligatoire     |       Exemples        |
    Case of failure : return false                      _____________________________________________________________________________________________                   
                                                        |       x               |       number      |           yes         |           25          |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       y               |       number      |           yes         |           25          |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       width           |       number      |           yes         |           25          |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       height          |       number      |           yes         |           35          |   
                                                        ---------------------------------------------------------------------------------------------
    *                                                   |       static          |       Bool        |           yes         |       true || false   |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       outsideColor    |       string      |           yes         |       "255,5,100"     |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       insideColor     |       string      |           yes         |      "255,255,255"    |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       elementType     |       string      |           yes         |'ground' || 'wall',etc |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       myName          |       string      |           yes         |           player etc  |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       angle           |       number      |           no          |           90          |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       density         |       number      |           no          |           1.0         |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       friction        |       number      |           no          |           0.5         |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       restitution     |       number      |           no          |           0.5         |
                                                        ---------------------------------------------------------------------------------------------

    *
    *
    *
    *
    ******************************************************************************************/
    var Carre = function(params){

            this.color = {"inside"  : "rgb("+params.insideColor+")"   ,
                          "outside" : "rgb("+params.outsideColor+")"} ;

            this.characts = {box2DW      : params.width               ,
                             box2DH      : params.height              ,
                             myName      : params.myName              ,
                             elementType : params.elementType         ,
                             shape       : 'square'                   ,
                             box2DAngle  : params.angle*(Math.PI/180) ,
                             id          : params.id || -1,
                             img         : params.imgSrc||undefined,
                             imgWidth    : params.imgSrc&&params.imgSrc.width||undefined,
                             imgHeight   : params.imgSrc&&params.imgSrc.height||undefined,
                             imgW        : params.imgW||undefined,
                             imgH        : params.imgH||undefined,
                             isPattern   : params.isPattern ||undefined
                            };

            if(this.characts.img!==undefined && this.characts.isPattern){

                console.log(params.imgSrc)
                var canvas            = document.createElement("canvas");
                    canvas.width      = params.imgSrc.width*6;
                    canvas.height     = params.imgSrc.height;
                var ctx               = canvas.getContext("2d");
                var repeatType        = "repeat";
                var firstPattern      = ctx.createPattern(params.imgSrc,repeatType);
                ctx.fillStyle         = firstPattern ;

            
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.fill();

                this.characts.img = canvas;
                this.characts.imgWidth = canvas.width;
                this.characts.imgHeight = canvas.height;
                
            }
            // body settings
            this.bodyDef  =  new box2dConfig.b2BodyDef;
            
            // fixture settings
            this.fixDef   =  new box2dConfig.b2FixtureDef;

            if(params.isStatic && (params.elementType === 'ground' ||params.elementType === 'ground' || params.elementType === 'pic' || params.elementType === 'tear'|| params.elementType === 'collectible' ||params.elementType === 'wall')){
                this.bodyDef.type  = box2dConfig.b2Body.b2_staticBody;
                this.fixDef.filter.categoryBits = box2dConfig.FILTERS.GROUND;
                this.fixDef.filter.maskBits = box2dConfig.FILTERS.MEMBERS;
            }
            else if(params.isStatic && params.elementType === 'player'){
                this.bodyDef.type  = box2dConfig.b2Body.b2_staticBody;
            }
            else if(params.elementType === 'player'){
                this.bodyDef.type  = box2dConfig.b2Body.b2_dynamicBody;

            }
            else{ 
                this.bodyDef.type  = box2dConfig.b2Body.b2_dynamicBody;
                this.fixDef.filter.categoryBits = box2dConfig.FILTERS.MEMBERS;
                this.fixDef.filter.maskBits     = box2dConfig.FILTERS.GROUND;
            }    
            if(params.fixedRotation)
                this.bodyDef.fixedRotation = true;
    
            this.bodyDef.position.x            = params.x;
            this.bodyDef.position.y            = params.y;
            this.bodyDef.angle                 = params.angle*(Math.PI/180)|| 0;
            
            
            this.fixDef.userData               = this.characts;
            
            this.fixDef.density                = params.density     || 1.0;
            // this.fixDef.filter.categoryBits = permet de definir a quelle categorie appartient cette objet : 0x0001 (attention sur 4 octets pas plus !)
            // this.fixDef.filter.maskBits     =   definit avec quelle groupe on va interagir : group1 | group2 etc
            this.fixDef.friction               = params.friction    || 0.5;
            this.fixDef.restitution            = params.restitution || 0.2;
            this.fixDef.shape                  = new box2dConfig.b2PolygonShape;
            this.fixDef.shape.SetAsBox(params.width, params.height);
            
            this.box2dBody                     = box2dConfig.world.CreateBody(this.bodyDef); 

            this.box2dFix                      = this.box2dBody.CreateFixture(this.fixDef);
            this.box2dObj                      = this.box2dFix;
    }
    
    addDrawMethode(Carre);
    
    return Carre;
});