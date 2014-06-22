define(["config/box2dConfig"],function(configBox2D){

    /* WIP Catch Method who link or unlink the catchable objects to the hand */
    return function addCatchMethode(myClass)
    {
        myClass.prototype.catchables = 'eye';

        myClass.prototype.catch = function()
        {

            var state = this.getMembersCharacts().hand.capacity.catching;
            // debugger;
            // console.log(state); // this.memberContact.beCatch
            var catcher = this.members.hand["box2dBody"]; // this.members.hand;
            debugger;
            // console.log(catcher);
            console.log(this.conditions.inSight.encounter);
            // this.memberContact.bool = true;
            // if(this.memberContact.bool)
            // {
                switch(state) /* Check if the hand already catch something */
                {
                    case 0 :
                        if(this.conditions.inSight.contact)
                        {
                            this.getMembersCharacts().hand.capacity.catching = 1;
                            this.addJoint(catcher, this.conditions.inSight.encounter.GetBody(), 'handCatch');
                        }
                        else{}                        
                    break;
                    
                    case 1 :
                        this.getMembersCharacts().hand.capacity.catching = 0;
                        configBox2D.world.DestroyJoint(configBox2D.world.GetJointList());
                    break;
    
                    default :
                        throw "Unexpected value of 'state' propertie in: " + this;
                    break;
                }
            // }
        }
    }
});