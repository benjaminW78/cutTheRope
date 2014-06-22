define(["config/box2dConfig"],function(configBox2D, b2WeldJointDef){

    return function addJointMethode(myClass)
    {
        myClass.prototype.addJoint = function(objectA, objectB, name, params){
            var joint = new configBox2D.b2WeldJointDef;
            joint.Initialize(objectA, objectB, objectA.GetWorldCenter());
            joint.userData = {id: name};
            if(params && params.motorSpeed){
                joint.motorSpeed = params.motorSpeed;
                joint.maxMotorTorque = params.maxMotorTorque;
                joint.enableMotor = true;
            }
            configBox2D.world.CreateJoint(joint);
        }
    }
});