define(['config/box2dConfig','config/config','components/addDrawMethode','class/Player'],function(box2dConfig,config,addDrawMethode,Player){

    var Ray = function (xStart, yStart, xDir, yDir)
    {
        this.contact = false;       
        
        this.encounter = "";

        this.characts = { origin : { x : xStart
                                   , y : yStart}
                        , end    : { x : xStart + xDir  
                                   , y : yStart + yDir}};

        var _thisRay = this;

        function rayCallBack (e)
        {
            // console.log("callBackStart: " + _thisRay.contact);
            _thisRay.contact = true;
            // console.log("callBackEnd: " + _thisRay.contact);
        }

        box2dConfig.world.RayCast(rayCallBack, this.characts.origin, this.characts.end);
        
        if(this.contact)
        {
            this.color = { "inside"  : "rgb(250,250,250)"
                         , "outside" : "rgb(0,0,0)"}
        }
        else
        {
            this.color = { "inside"  : "rgb(0,0,0)"
                         , "outside" : "rgb(250,250,250)"}
        }

        // myClass.prototype.rayToShape = function()
        // {       
            // Player.prototype.rayInput = function(vec2)
            // {
            //     var rayInit = new box2dConfig.b2RayCastInput;
            //     rayInit     = {p1       : this.members.hand.box2dBody.GetPosition()                  ,
            //                    p2       : {x : this.members.hand.box2dBody.GetPosition().x + vec2.x  , 
            //                                y : this.members.hand.box2dBody.GetPosition().y + vec2.y} ,
            //                    fraction : 1}                                                         ;
            //     return rayInit;
            // }
    
            // Player.prototype.rayOutput = function()
            // {
            //     console.log();
            //     var rayThrow = new box2dConfig.b2RayCastOutput;
            //     return rayThrow;
            // }
    
            // WIP function (rayInput, rayOutput)
                                                                            
        // }
    }
    addDrawMethode(Ray);
    
    return Ray;
}); 