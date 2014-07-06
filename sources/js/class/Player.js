define(["var/game","class/Carre","class/Circle","components/addMoveMethode","components/addMemberAction","components/addCatchMethode","components/addMathSquareMethode","components/addTearsGenerator","components/addJointMethode","class/Tear","config/box2dConfig","components/addUpdate","config/box2dConfig"],function(Game,Carre,Circle,addMoveMethode
       ,addMemberAction,addCatchMethode,addMathSquareMethode,addTearsGenerator,addJointMethode,Tear,box2dConfig,addUpdate,configBox2D){

    var  Player = function(x,y,paramsBase)
    {
        var params = paramsBase;
        var tears = 10;
        var up = false;
        var indexmember = 0;
        var arrayOfMembers = ['hand', 'eye'];
        var membersCharacts = {
                                hand : {jump : {val : 70}, speed : {val : 6}, capacity : {catching : 0}, actions : {action1 : "catch", action2 : ""}},
                                eye  : {jump : {val : 15}, speed : {val : 5}, actions  : {action1 : "", action2 : ""}}
                              };

        this.posRelative = {};

        this.activeMember = 'hand';

        this.speed = membersCharacts[this.activeMember].speed.val;

        this.jump = {
                        val : membersCharacts[this.activeMember].jump.val ,
                        state : false
                    }

        this.members = {};

        this.conditions = { inSight  : ""
                          , onGround : ""};

        params.imgSrc = params.pool[1];
        params.imgW=100;
        params.imgH=100;
        params.restitution   = 0.0;
        params.myName        = 'hand';
        params.fixedRotation = true;
        params.width         = 1.5;
        params.height        = 1;
        params.insideColor   = "255,5,0";
        params.x             = x;
        params.elementType   = "player";
        params.y             = y;
        params.density       = 1.3;
        params.friction      = 1;
        params.isStatic      = params.isStatic||false;
        this.members.hand    = new Carre(params);

        params.density       = 1;
        params.imgSrc        = params.pool[2];
        params.imgW          = 100;
        params.imgH          = 100;
        params.friction      = 100;
        params.myName        = 'pointer';
        params.width         = 0.5;
        params.elementType   = "pointer";
        params.x             = 8;
        params.height        = 1;
        // params.angle         = 45;
        

        this.createCuter = function(coord,Game){
            params.x = coord.x;
            params.y = coord.y;
            this.members.circle =  new Carre(params);
            this.updatePointer(coord,Game)
        }
        this.destroyCuter = function(Game){
            Game.gestion.box2DWorld.DestroyBody(this.members.circle.box2dObj.GetBody());
            this.members.circle = undefined;
        }

        this.actualMember = this.members[this.activeMember];

        this.click = false;
        _this = this;

        // this.mouse_joint=undefined;
        this.getMouseCoord = function(mouseCoord,Game){
            var camcoord = Game.gestion.camera.getSpaceInfos();
            var coord = new box2dConfig.b2Vec2((mouseCoord.x+ camcoord.worldX )/ 30,(mouseCoord.y+ camcoord.worldY)/ 30);
            return coord;
        }
        Player.prototype.updatePointer = function(mouseCoord,Game){

               var coord =  mouseCoord;

            if(this.mouse_joint===undefined){

                var def = new box2dConfig.b2MouseJointDef();

                def.bodyA = this.members.hand.box2dObj.GetBody();
                def.bodyB = this.members.circle.box2dObj.GetBody();
                def.target = coord;

                def.collideConnected = true;
                def.maxForce = 10000 * 2;
                def.dampingRatio = 0;
                this.mouse_joint = box2dConfig.world.CreateJoint(def);
            }
            else{

                this.mouse_joint.SetTarget(coord);
            }

            this.members.circle.box2dObj.GetBody().SetAwake(true);
        }


        Player.prototype.addTears = function(number)
        {
            tears += number;
            document.getElementById('counterTears').innerHTML = tears;
        }

        Player.prototype.getTears = function()
        {
            return tears;
        }

        Player.prototype.getMembersCharacts = function(){
            return membersCharacts;
        }

        Player.prototype.switchmember = function(Game)
        {
            if(indexmember === arrayOfMembers.length)
                indexmember = 0;
            var string = arrayOfMembers[indexmember];

            for (var index in this.members)
            {
                if(index === string)
                {
                    if(index === 'eye' && membersCharacts.hand.capacity.catching === 1 && this.conditions.inSight.encounter.m_userData.myName === "eye")
                    {
                        this.getMembersCharacts().hand.capacity.catching = 0;
                    }

                    this.actualMember.box2dObj.GetBody().SetLinearVelocity(new Game.gestion.box2dConfig.b2Vec2(0,0));
                    this.actualMember = this.members[index];
                    this.activeMember = index;
                    this.speed = membersCharacts[this.activeMember].speed.val;
                    this.jump.val = membersCharacts[this.activeMember].jump.val;
                }
                else
                    console.log("non ce membre n'existe pas");
            }
            indexmember+=1;
            console.log(this.actualMember);
        }




        Player.prototype.lostAllTears = {
            status : undefined ,
            exec :function(Game)
            {
                if(tears>0)
                {

                    var _params = {x:_this.actualMember.box2dObj.GetBody().GetPosition().x,
                                   y:_this.actualMember.box2dObj.GetBody().GetPosition().y-2,
                                   angle: _this.actualMember.box2dObj.GetBody().GetAngle(),
                                   numbersOfTears:tears};
                                   // console.log(_this);
                    var _test = _this.tearsGenerator(_params,Game,_this.actualMember);

                    _this.lostAllTears.status = false;

                    if(_test){
                        tears = 0;
                        document.getElementById('counterTears').innerHTML = tears;
                    }
                }
                else
                {
                    Game.gestion.gameStatus = 'gameOver';
                }
            }
        }

        Player.prototype.stick = {
            state : "unstick" ,
            counter : 0,
            getStick : function(Game)
            {
                    console.log(this.counter)
                if(this.counter === 0)
                {
                    _this.actualMember.box2dObj.GetBody().SetLinearVelocity(new Game.gestion.box2dConfig.b2Vec2(0,0));
                    _this.actualMember.box2dObj.GetBody().ApplyForce(new Game.gestion.box2dConfig.b2Vec2(0,Game.gestion.box2DWorld.GetGravity().y*-1 * _this.actualMember.box2dObj.GetBody().GetMass()),_this.actualMember.box2dObj.GetBody().GetWorldCenter());
                    this.counter=-1;
                    // this.state= "stick";
                    debugger;
                }

            },
            getUnStick : function(Game)
            {
                if(this.counter===-1)
                {
                debugger;
                    _this.actualMember.box2dObj.GetBody().ApplyForce(new Game.gestion.box2dConfig.b2Vec2(0,Game.gestion.box2DWorld.GetGravity().y * _this.actualMember.box2dObj.GetBody().GetMass()),_this.actualMember.box2dObj.GetBody().GetWorldCenter());
                    this.counter = 0;
                    this.state   = undefined;
                    console.log(this.counter,"OUT")
                }
            }
        }
    }

    addMoveMethode(Player);

    // addTearsGenerator(Player);

    addMathSquareMethode(Player);

    addJointMethode(Player);

    // addMemberAction(Player);

    // addCatchMethode(Player);

    addUpdate(Player);

    return Player;

});