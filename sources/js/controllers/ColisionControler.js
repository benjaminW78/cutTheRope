define(["components/addEventMethodes","config/box2dConfig","class/Tear"],function(addEventMethodes,box2dConfig,Tear){

	var ColisionControler = function(refObj)
	{
		this.PreSolve = {};
		this.PreSolve.player = {};
		this.PreSolve.pointer = {};

		this.PostSolve = {};
		this.PostSolve.player = {};
		this.PostSolve.pointer = {};

		this.start = {};
		this.start.player = {};
		this.start.pointer = {};

		this.end = {};
		this.end.player = {};
		this.end.pointer = {};

			//console.log(refObj.players[1]);

		this.init = function()
		{	
			/*methode listenner box2d*/
			var worldListenner = new box2dConfig.b2Listenner;

			worldListenner.PreSolve = function(contact)
			{
				var userObj1 = contact.GetFixtureA().m_userData;
				var userObj2 = contact.GetFixtureB().m_userData;
				// console.log(userObj1,userObj1);
				// console.log(contact)
				refObj.gestion.eventControler.emit('PreCollision' , [userObj1,userObj2])
				
			} 
			
			worldListenner.BeginContact = function(contact)
			{
				// console.log(contact.GetFixtureA(),contact.GetFixtureB());
				var userObj1 = contact.GetFixtureA().m_userData
				var userObj2 = contact.GetFixtureB().m_userData
				// console.log(contact.GetFixtureA())
				userObj1.box2dBody = contact.GetFixtureA().m_body;
				userObj2.box2dBody = contact.GetFixtureB().m_body;

				refObj.gestion.eventControler.emit('StartCollision' , [userObj1,userObj2])
			}
			worldListenner.EndContact = function(contact)
			{
				// console.log(contact.GetFixtureA().m_userData,contact.GetFixtureB().m_userData);
				var userObj1 = contact.GetFixtureA().m_userData
				var userObj2 = contact.GetFixtureB().m_userData

				refObj.gestion.eventControler.emit('EndCollision' , [userObj1,userObj2])
			}
			worldListenner.PostSolve = function(contact)
			{
				// console.log(contact.GetFixtureA().m_userData,contact.GetFixtureB().m_userData);
				var userObj1 = contact.GetFixtureA().m_userData
				var userObj2 = contact.GetFixtureB().m_userData

				refObj.gestion.eventControler.emit('PostCollision' , [userObj1,userObj2])
			}
			
			refObj.gestion.box2DWorld.SetContactListener(worldListenner);

			/*methode evenementielle perso appeler par les listenner box2d*/
			refObj.gestion.eventControler.add('PreCollision',function(contact){

				// console.log(refObj.gestion.colisionControler,contact)
					doSort(contact);
				if(refObj.gestion.colisionControler.PreSolve[contact[0].elementType] && refObj.gestion.colisionControler.PreSolve[contact[0].elementType][contact[1].elementType])
					refObj.gestion.colisionControler.PreSolve[contact[0].elementType][contact[1].elementType](contact);

			});
			
			refObj.gestion.eventControler.add('StartCollision',function(contact){
					// console.log(contact[1].myName);

					doSort(contact);
					// console.log(contact[1].myName);
				if(refObj.gestion.colisionControler.start[contact[0].elementType] && refObj.gestion.colisionControler.start[contact[0].elementType][contact[1].elementType])
					refObj.gestion.colisionControler.start[contact[0].elementType][contact[1].elementType](contact);

			});
			refObj.gestion.eventControler.add('EndCollision',function(contact){

				doSort(contact);

				if(refObj.gestion.colisionControler.end[contact[0].elementType] && refObj.gestion.colisionControler.end[contact[0].elementType][contact[1].elementType])
					refObj.gestion.colisionControler.end[contact[0].elementType][contact[1].elementType](contact);
			});


			refObj.gestion.eventControler.add('PostCollision',function(contact){

			doSort(contact);

			if(refObj.gestion.colisionControler.PostSolve[contact[0].elementType] && refObj.gestion.colisionControler.PostSolve[contact[0].elementType][contact[1].elementType])
				refObj.gestion.colisionControler.PostSolve[contact[0].elementType][contact[1].elementType](contact);
		});
		}

		var doSort = function(params)
		{
			var temp;
			// console.log(params, "YOLOOO")
			if(params[0].elementType !== 'player' && params[0].elementType !== 'pointer')
			{
				temp = params[0];
				params[0] = params[1];
				params[1] = temp;	
			}
			// console.log(params);
			return params;
		}
		this.PreSolve.player = {
								collectible : function(params)
								{
									for (var index in refObj.sceneContainer)
									{
										if (refObj.sceneContainer[index].obj && params[1].id === refObj.sceneContainer[index].obj.characts.id )
										{	
									       	if(!refObj.sceneContainer[index].getDead())
									        	refObj.sceneContainer[index].setDead();
										}
										
									}
								}
							};

		this.PostSolve.pointer = {rope : function(params)
							{
								// console.log("POST YOLOOOO");

								// refObj.gestion.box2DWorld.DestroyBody()
								// console.log(params[1].idRope);
								for (var index in refObj.sceneContainer)
								{
									if(refObj.sceneContainer[index].characts)
									// 	console.log(params[1].id,refObj.sceneContainer[index].characts.id)
									// debugger;
									if (refObj.sceneContainer[index].characts && params[1].id === refObj.sceneContainer[index].characts.id )
									{	
										// console.log("collision",params[0].elementType,params[0].myName,params[1].elementType,params[1].myName);
								       	// if(!refObj.sceneContainer[index].getDead())
								        	refObj.sceneContainer[index].destroy(refObj);
									}
									
								}
							}
		};

		this.end.pointer = {rope : function(params)
							{
								// refObj.gestion.box2DWorld.DestroyBody()
								// console.log(params[1].idRope);
								console.log("ENDYOLOOOO");
								// for (var index in refObj.sceneContainer)
								// {
								// // 	if(refObj.sceneContainer[index].characts)
								// // console.log(refObj.sceneContainer[index],params[1].id,refObj.sceneContainer[index].characts.id)
								// // debugger;
								// 	if (refObj.sceneContainer[index].characts && params[1].id === refObj.sceneContainer[index].characts.id )
								// 	{	
								//        	// if(!refObj.sceneContainer[index].getDead())
								//         	refObj.sceneContainer[index].destroy(refObj);
								// 	}
									
								// }
							}
					};			
		this.start.player = { 	
								wall : function(params)
								{
									console.log(params);
									
									// refObj.players[1].stick.state = "stick";
									// // refObj.players[1].stick.getStick(refObj,params);
									// refObj.players[1].jump.state = false;
								},							
								trigger : function(params)
								{
									refObj.players[1].jump.state = false;
									// console.log('loul trigger && '+ params[0].myName+" of "+params[0].elementType);
								},
								ground : function(params)
								{
									refObj.players[1].jump.state = false;
									// refObj.players[1].lostAllTears(refObj);

								},
								door : function(params)
								{
									// console.log('loul collectible && '+ params[0].myName+" of "+params[0].elementType);
								},
								pic : function(params)
								{
									if(params[0].myName === refObj.players[1].activeMember)
									{
										var _actualContact = new Date().getTime();

										if(refObj.players[1].lastContact && _actualContact-refObj.players[1].lastContact >= 2000)
											refObj.players[1].lostAllTears.status = true;
										else if(refObj.players[1].lastContact === undefined)
											refObj.players[1].lostAllTears.status = true;

										refObj.players[1].lastContact = _actualContact;
									}
									refObj.players[1].jump.state = false;

								},
								player : function(params)
								{
									refObj.players[1].memberContact.beCatch = params[1].box2dBody;
									// console.log(params[1]);
								}


							};

		this.end.player = {	
							trigger : function(params)
							{
								refObj.players[1].jump.state = false;
								// console.log('loul trigger && '+ params[0].myName+" of "+params[0].elementType);
							},
							ground : function(params)
							{
								refObj.players[1].jump.state = true;
							},
							wall : function(params)
							{

								// console.log("YOLOOOOO");
								// refObj.players[1].stick.getUnStick(refObj);
								// refObj.players[1].stick.state = "unstick";
								
							}
						};
		this.PostSolve.player = { 
						};
		this.init();
	}

	addEventMethodes(ColisionControler);

	return ColisionControler;
});