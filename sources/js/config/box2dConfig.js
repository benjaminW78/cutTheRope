define(["libs/Box2d.min"], function(Box2D) {

var configBox2D = {b2Vec2 : Box2D.Common.Math.b2Vec2
	            ,  b2AABB : Box2D.Collision.b2AABB
	         	,	b2BodyDef : Box2D.Dynamics.b2BodyDef
	         	,	b2Body : Box2D.Dynamics.b2Body
	         	,	b2FixtureDef : Box2D.Dynamics.b2FixtureDef
	         	,	b2Fixture : Box2D.Dynamics.b2Fixture
	         	,	b2World : Box2D.Dynamics.b2World
	         	,	b2MassData : Box2D.Collision.Shapes.b2MassData
	         	,	b2PolygonShape : Box2D.Collision.Shapes.b2PolygonShape
	         	,	b2CircleShape : Box2D.Collision.Shapes.b2CircleShape
	         	,	b2DebugDraw : Box2D.Dynamics.b2DebugDraw
	            ,   b2MouseJointDef :  Box2D.Dynamics.Joints.b2MouseJointDef
	            ,   b2RevoluteJointDef :  Box2D.Dynamics.Joints.b2RevoluteJointDef
	            ,	b2Listenner : Box2D.Dynamics.b2ContactListener
	            ,   b2WeldJointDef : Box2D.Dynamics.Joints.b2WeldJointDef
	       		,	b2PrismaticJointDef : Box2D.Dynamics.Joints.b2PrismaticJointDef
	       		,  FILTERS : { MEMBERS : 0x0001 /* Collision filter ini */
    				   		   ,   ENNEMY  : 0x0002
    				   		   ,   ITEMS   : 0x0003
    				           ,   GROUND  : 0x0004
    				   		   ,   ROPE   : 0x0005
    				        }
	        }
            configBox2D.initWorld = function(){
                console.log('FILSDEPUTERIE')
                console.log(this.world);
                this.world =null;
             this.world = new this.b2World(new this.b2Vec2(0, 10),true)   
            }
	        configBox2D.world = new configBox2D.b2World(new configBox2D.b2Vec2(0, 10),true);
	        return configBox2D;
});