define(['config/box2dConfig','config/config',"components/addDrawMethode"],function(box2dConfig,config,addDrawMethode){
/*****************************************************************************************
*Fonction de création du des obj carré avec box2d du terrain
*
*@	params : object who containes somes arguments :  --------------------------------------------------------------------------------------------
Case of success  : return true						|		Keys	   		|		value Type	|		Obligatoire		|		Exemples		|
Case of failure : return false						_____________________________________________________________________________________________					
													|		x				|		number		|			yes			|			25			|
													---------------------------------------------------------------------------------------------
													|		y 				|		number		|			yes			|			25			|
													---------------------------------------------------------------------------------------------
													|		radius			|		number		|			yes			|			12			|
													---------------------------------------------------------------------------------------------
*													|		static			|		Bool		|			yes			|		true || false	|
													---------------------------------------------------------------------------------------------
													|		outsideColor	|		string		|			yes			|		"255,5,100"		|
													---------------------------------------------------------------------------------------------
													|		insideColor		|		string		|			yes			|	   "255,255,255"	|
													---------------------------------------------------------------------------------------------
													|		elementType		|		string		|			yes			|'ground' || 'wall',etc	|
													---------------------------------------------------------------------------------------------
													|		myName			|		string		|			yes			|			player etc	|
													---------------------------------------------------------------------------------------------
													|		angle			|		number		|			no			|			90			|
													---------------------------------------------------------------------------------------------
													|		density			|		number		|			no			|			1.0 		|
													---------------------------------------------------------------------------------------------
													|		friction		|		number		|			no			|			0.5			|
													---------------------------------------------------------------------------------------------
													|		restitution		|		number		|			no			|			0.5			|
													---------------------------------------------------------------------------------------------

*
*
*
*
******************************************************************************************/
return Circle = function (params)
{

		this.color = {"inside" : "rgb("+params.insideColor+")" , "outside" : "rgb("+params.outsideColor+")"};	

		this.characts = {
						 shape : 'Circle',
						 myName : params.myName,
						 radius : params.radius ,
						 elementType : params.elementType,
						 img : params.imgSrc||undefined,
						 imgWidth:params.imgSrc&&params.imgSrc.width||undefined,
						 imgHeight:params.imgSrc&&params.imgSrc.height||undefined,
						 imgW:params.imgW||undefined,
						 imgH:params.imgH||undefined
						};

		this.bodyDef            = new box2dConfig.b2BodyDef;
		
		if(params.isStatic)
			this.bodyDef.type   = box2dConfig.b2Body.b2_staticBody;
		else 
			this.bodyDef.type   = box2dConfig.b2Body.b2_dynamicBody;

		this.bodyDef.position.x = params.x;
		this.bodyDef.position.y = params.y;

		// fixture settings
		this.fixDef             = new box2dConfig.b2FixtureDef;

		// Collision filter
		// this.fixDef.filter.categoryBits = box2dConfig.FILTERS.GROUND;
  //       this.fixDef.filter.maskBits = box2dConfig.FILTERS.MEMBERS;

		// set des user datas
		this.fixDef.userData    = this.characts;

		this.fixDef.density		= params.density 	 || 10.0;
		// this.fixDef.filter.categoryBits  = permet de definir a quelle categoryy appartient cette objet : 0x0001 (attention sur 4 octets pas plus !)
		// this.fixDef.filter.maskBits  =   definit avec quelle groupe on va interagir : group1 | group2 etc
 		this.fixDef.friction	= params.friction 	 || 0.2;
		this.fixDef.restitution	= params.restitution || 0.2;
		this.fixDef.shape       = new box2dConfig.b2CircleShape(params.radius);

		this.fixDef.isSensor	=false;

        // this.box2dObj = box2dConfig.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

        this.box2dBody = box2dConfig.world.CreateBody(this.bodyDef); 
		this.box2dFix  = this.box2dBody.CreateFixture(this.fixDef);
        this.box2dObj  = this.box2dFix;
        addDrawMethode(Circle);
	}
});


