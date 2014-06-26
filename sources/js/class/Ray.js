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
    }
    addDrawMethode(Ray);
    
    return Ray;
}); 