/******************************************************
*Class Rope pour créer une corde
*
*
*
*
********************************************************/

define(["config/config",'config/box2dConfig',"components/addDrawMethode","class/Carre"],function(config,box2dConfig,addDrawMethode,Carre){

function createBox(params)
{
    this.characts = {box2DW      : params.width,
                     box2DH      : params.height,
                     myName      : params.myName,
                     elementType : params.elementType,
                     shape       : 'square',
                     box2DAngle  : params.angle*(Math.PI/180),
                     id          : params.id || -1,
                     density     : 1.0 ,
                     friction    : 1.0 ,
                     restitution : 0.5 ,
                     type        : box2dConfig.b2Body.b2_dynamicBody
                };

    var body_def = new box2dConfig.b2BodyDef;
    var fix_def = new box2dConfig.b2FixtureDef;

    if (params.isStatic) {
        body_def.type  = box2dConfig.b2Body.b2_staticBody;
    }
    else{
        body_def.type  = box2dConfig.b2Body.b2_dynamicBody;

    }

    fix_def.density = this.characts.density;
    fix_def.friction = this.characts.friction;
    fix_def.restitution = this.characts.restitution;
    fix_def.filter.categoryBits = box2dConfig.FILTERS.MEMBERS;
    fix_def.filter.maskBits = box2dConfig.FILTERS.ROPE;

    fix_def.shape = new box2dConfig.b2PolygonShape();
    fix_def.shape.SetAsBox( params.width/2 , params.height/2 );
    fix_def.userData = this.characts;
    body_def.position.Set(params.x , params.y);
    // console.log(body_def.position);
    body_def.angle = params.angle*(Math.PI/180)|| 0;

    var b = box2dConfig.world.CreateBody( body_def );
    var f = b.CreateFixture(fix_def);
    // console.log(f)

    return f;
}
var Rope = function(params)
{
    // console.log(params)

    params.restitution   = 0.0;
    params.myName        = 'test1';
    params.fixedRotation = true;
    params.insideColor   = "255,5,0";
    params.x             = params.x1;
    params.elementType   = "wall";
    params.y             = params.y1;
    params.isStatic      = params.firstStatic;
    params.density       = 50;
    params.friction      = 1;
    var Firstbox2DOjb = new createBox(params);

    params.myName        = 'test2';
    params.isStatic      = params.secondStatic;
    params.y             = params.y2;
    params.x             = params.x2;
    if(params.obj2!==undefined){
        var lastBox2DObj = params.obj2.box2dObj;
    }
    else{

    var lastBox2DObj = new createBox(params);
    }

    params.ropeimg = params.ropeimgSrc||undefined;

    params.ropeimgWidth    = params.ropeimgSrc&&params.ropeimgSrc.width||undefined;
    params.ropeimgHeight   = params.ropeimgSrc&&params.ropeimgSrc.height||undefined;

    params.socleimg = params.socleimgSrc||undefined;

    params.socleimgWidth    = params.socleimgSrc&&params.socleimgSrc.width||undefined;
    params.socleimgHeight   = params.socleimgSrc&&params.socleimgSrc.height||undefined;

    this.characts = params;
    this.ropeObj = [];
    this.ropeObj.push(Firstbox2DOjb);
    this.ropeJoin = [];

    var numberCell = params.cell;

    link=Firstbox2DOjb.GetBody();

for (var x= 0; x <= numberCell; x++) {
                // rope segment
                //
                var revolute_joint = new box2dConfig.b2RevoluteJointDef();
                params.myName = 'ropeSegments';
                params.elementType   = "rope";
                params.isStatic = false;
                bodyDef = new box2dConfig.b2BodyDef;
                // console.log(params.idRope,x);
                bodyDef.position.x = params.x2;
                bodyDef.angle                 = params.angle*(Math.PI/180)|| 0;
                bodyDef.position.y = params.y2;
                bodyDef.type  = box2dConfig.b2Body.b2_dynamicBody;
                boxDef = new box2dConfig.b2FixtureDef;
                boxDef.density = 100;
                boxDef.friction = 0;
                // console.log(bodyDef)
                params.destroyFunction=this.destroy;
                // debugger
                bodyDef.userData = params;
                boxDef.userData = params;
                boxDef.filter.categoryBits = box2dConfig.FILTERS.ROPE;
                boxDef.filter.maskBits = box2dConfig.FILTERS.MEMBERS;

                boxDef.shape=new box2dConfig.b2PolygonShape;
                boxDef.shape.SetAsBox(0.1, 0.5);
                boxDef.restitution=0.2;
                body=box2dConfig.world.CreateBody(bodyDef);
                // body.CreateFixture(boxDef);
                this.ropeObj.push(body.CreateFixture(boxDef));
                // console.log(bodyDef,body)
                // joint
                revolute_joint.bodyA = link;
                revolute_joint.bodyB = body;
                revolute_joint.localAnchorA = new box2dConfig.b2Vec2(0, 1);
                revolute_joint.localAnchorB = new box2dConfig.b2Vec2(0, 0);
                // console.log(link)

                this.ropeJoin.push(box2dConfig.world.CreateJoint(revolute_joint));

                // saving the reference of the last placed link
                link=body;

            }

            var revolute_joint = new box2dConfig.b2RevoluteJointDef();
            body = lastBox2DObj;
            this.ropeObj.push(body);
            revolute_joint.bodyA = link;
            revolute_joint.bodyB = body.GetBody();
            revolute_joint.localAnchorA = new box2dConfig.b2Vec2(0, 1);
            revolute_joint.localAnchorB = new box2dConfig.b2Vec2(0, 0);
            // revolute_joint.Initialize(link, body.GetBody(), new box2dConfig.b2Vec2(0, 0));
            this.ropeJoin.push(box2dConfig.world.CreateJoint(revolute_joint));
            // box2dConfig.world.CreateJoint(revolute_joint);

    Rope.prototype.destroy = function (Game,idJoin)
    {
        for (var i = 0 ;i<this.ropeJoin.length;i++){

            Game.gestion.box2DWorld.DestroyJoint(this.ropeJoin[i]);
        }
        for (var x=1;x<this.ropeObj.length-1;x++){

            if(this.ropeObj[x]!==undefined)
                // Game.gestion.box2DWorld.DestroyBody(this.obj.box2dBody)
               box2dConfig.world.DestroyBody(this.ropeObj[x].GetBody());
                // console.log(this.ropeObj[x].GetBody(),this.ropeObj[x])
            // this.ropeObj[x]=undefined;
        }
    }

    Rope.prototype.draw = function(Game)
    {

        var camcoord = Game.gestion.camera.getSpaceInfos();

        for (var i=this.ropeObj.length-1;i>=0;i--){
         
            if(this.ropeObj[i]!==undefined){
                if(i<this.ropeObj.length-1)
                    config.context.fillStyle = "#ff00ff";

                var x = this.ropeObj[i].GetBody().GetPosition().x * Game.gestion.worldScale;
                var y = this.ropeObj[i].GetBody().GetPosition().y * Game.gestion.worldScale;

                var angle = this.ropeObj[i].GetBody().GetAngle();
                // console.log(x,y)
                config.context.beginPath();
                // mise en place de l'angle
                config.context.save();
                //deplacement vers l'objet par rapport à la camera
                config.context.translate(( x - camcoord.worldX ) , (y - camcoord.worldY) );
                //rotate du canvas par L'angle de l'objet unity
                config.context.rotate(angle);
                    // debugger
                //dessins du rectangle
                if(i===this.ropeObj.length-1)
                {
                    // this.characts.radius = this.ropeObj[i].m_shape.m_radius * Game.gestion.worldScale;
                    config.context.arc(0, 0, this.characts.radius * Game.gestion.worldScale, 0, Math.PI * 2, 1);
                    config.context.fill();
                    config.context.stroke();
                }
                else{
                    if(i===0){
                        if(this.characts.socleimg!==undefined){
                            config.context.drawImage(this.characts.socleimg,0,0,this.characts.socleimgWidth,this.characts.socleimgHeight,this.characts.socleimgW*-0.5,this.characts.socleimgH*-0.5,this.characts.socleimgW,this.characts.socleimgH);
                        }
                    }
                    if(this.characts.ropeimgSrc)
                    {


                        var w = this.ropeObj[i].m_shape.m_vertices[2].x * Game.gestion.worldScale * 2;
                        var h = this.ropeObj[i].m_shape.m_vertices[2].y * Game.gestion.worldScale * 2;
                        if(this.characts.ropeimg!==undefined)
                            config.context.drawImage(this.characts.ropeimg,0,0,this.characts.ropeimgWidth,this.characts.ropeimgHeight,this.characts.ropeimgW*-0.5,this.characts.ropeimgH*-0.5,this.characts.ropeimgW,this.characts.ropeimgH);

                    }
                    // if(i===this.ropeObj.length-1)
                    // {
                    //     var w = this.ropeObj[i].m_shape.m_vertices[2].x * Game.gestion.worldScale * 2;
                    //     var h = this.ropeObj[i].m_shape.m_vertices[2].y * Game.gestion.worldScale * 2;
                    //     config.context.fillRect(( w*0.5) * -1, (h * 0.5) * -1, w, h);
                    // }
                }
                // //dessins du cercle
                config.context.restore();
                config.context.closePath();
            }
        }
    }
}


return Rope;

});
