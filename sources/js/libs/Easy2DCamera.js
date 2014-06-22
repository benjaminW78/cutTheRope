define(function(){




/*create by : winckell benjamin*/

/*Easy2DCamera is a 2D camera you could use in canvas 2D
*   
*
*HOW TO INSTANTIATE Easy2DCamera : 
    
    * var whatYouWant = new Easy2DCamera(first,second,third)    --> first :  your dom object canvas reference.
                                                                                                                                      ---------------------------------------------------------------------------------------                   
                                                                --> second : object who reference to space informations of  camera.   |     Keys        |       value Type  |       Obligatoire     |       Exemples        |
                                                                                                                                      _______________________________________________________________________________________
                                                                                                                                      | pointReferenceX |       Number      |           Yes         |           256         |   
                                                                                                                                      ---------------------------------------------------------------------------------------
                                                                                                                                      | pointReferenceY |       Number      |           Yes         |           80          |
                                                                                                                                      ---------------------------------------------------------------------------------------                   
                                                                                                                                      |     worldX      |       Number      |           Yes         |           600         |
                                                                                                                                      ---------------------------------------------------------------------------------------                   
                                                                                                                                      |     worldY      |       Number      |           Yes         |           455,5       |
                                                                                                                                      ---------------------------------------------------------------------------------------                   
                                                                                                                                      |     vueWidth    |       Number      |           No          |           1024        |
                                                                                                                                      ---------------------------------------------------------------------------------------                   
                                                                                                                                      |     vueHeight   |       Number      |           No          |           768         |
                                                                                                                                      ---------------------------------------------------------------------------------------                   
                                                                --> third : object who containe all datas of camera scrolling       -----------------------------------------------------------------------------------------
                                                                                                                                    |       Keys        |       value Type  |       Obligatoire     |       Exemples        |
                                                                                                                                    _________________________________________________________________________________________
                                                                                                                                    |       left        |       Object      |           No          |                       |
                                                                                                                                    -----------------------------------------------------------------                       -
                                                                                                                                    |       right       |       Object      |           No          |                       |
                                                                                                                                    -----------------------------------------------------------------{min:number,max:Number}-
                                                                                                                                    |       up          |       Object      |           No          |                       |
                                                                                                                                    -----------------------------------------------------------------                       -
                                                                                                                                    |       down        |       Object      |           No          |                       |
                                                                                                                                    -----------------------------------------------------------------------------------------
                                                                                                                                    |       speed       |       Number      |           No          |           20          |
                                                                                                                                    -----------------------------------------------------------------------------------------
                                                                                                                                                
            

**Methodes of Easy2DCamera : 

*   run(first) 1 param necessary                             --> first : object who containe one y and x or  an object who had 
                                                                        a key pos who contain x and y like that : object.pos = {x :56, y:10);   
    USE : call this method into your gameloop for run the camera with all parameter set before ;



*   debug(first) 1 param necessary                          --> first : var who refere to Context of your canvas; 
    USE : call this method into your gameLoop for draw debug of camera on your canvas;



*   setNewPointsReference(first) 1 param necessary          --> first : object who containe 2 keys .    -------------------------------------------------------------------------------------
                                                                                                        |       Keys    |       value Type  |       Obligatoire     |       Exemples        |
        Case of success  : return true                                                                  _____________________________________________________________________________________       
        Case of failure : return false                                                                  |       x       |       number      |           No          |           25          |
                                                                                                        -------------------------------------------------------------------------------------
                                                                                                        |       y       |       number      |           No          |           35          |
                                                                                                        -------------------------------------------------------------------------------------   
    USE :   call this method for set news coordinates to reference point of your camera;                    
                                                                                                                
                                                                                                            
*   setNewWorldPositions(first) 1 param necessary           --> first : object who containe 2 keys .    -------------------------------------------------------------------------------------
                                                                                                        |       Keys    |       value Type  |       Obligatoire     |       Exemples        |
    Case of success  : return true                                                                      _____________________________________________________________________________________       
    Case of failure : return false                                                                      |       x       |       number      |           No          |           255         |
                                                                                                        -------------------------------------------------------------------------------------
                                                                                                        |       y       |       number      |           No          |           75          |
                                                                                                        -------------------------------------------------------------------------------------   
    USE :   call this method for set news coordinates to reference point of your camera;                    
                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                 
    

*   setScrollingDirection(first,second) 2 params necessary  --> first :  string of the direction to set . Possibility : left,right,down,up ;
                                                            --> second : object who containe values to change or set  : -------------------------------------------------------------------------------------
    Case of success  : return true                                                                                      |       Keys    |       value Type  |       Obligatoire     |       Exemples        |
    Case of failure : return false                                                                                      _____________________________________________________________________________________                           
                                                                                                                        |       min     |       number      |           No          |           25          |
                                                                                                                        -------------------------------------------------------------------------------------
                                                                                                                        |       max     |       number      |           No          |           35          |   
                                                                                                                        -------------------------------------------------------------------------------------
                                                                                                                        |       active  |       Bool        |           No          |       true || false   |
                                                                                                                        -------------------------------------------------------------------------------------
    USE : call this method for enable ou disable one direction or change distance activation of the selected direction;



*   getScrollingValues() no params necessary.

    USE : return you a object of all scrollings values like speed and config for all directions.



*   getSpaceInfos() no params necessary.
    USE : return you a object of all space infos values like pointReference X and Y  or the world relative coordinate.



*   getSpaceInfos() no params necessary.
    USE : return you a object of all space infos values like pointReference X and Y  or the world relative coordinate.


*
**/
return Easy2DCamera = function (canvas , spaceInfo , scrolling )
{
    var arrayDirection = ["left","right","up","down"] ;

    var spaceInfos = { "pointReferenceX" : spaceInfo.pointReferenceX || canvas.style.width / 2 ||canvas.width / 2 ,
                        "pointReferenceY" : spaceInfo.pointReferenceY || canvas.style.height / 2 || canvas.height / 2  ,
                        "worldX" : spaceInfo.worldX || 0 , "worldY" : spaceInfo.worldY || 0 , 
                        "vueWidht" : spaceInfo.vueWidth || canvas.style.width ,
                        "vueHeight" :   spaceInfo.vueHeight || canvas.style.height};
    
    var scrollingValues = {};
    var scrollingValuesMax = {};
    var posTarget;
    
    Easy2DCamera.prototype._initTarget = function(params)
    {
        if(typeof params.focusOn === "string")
        {        
            var _obj = params.focusOn.split(".");
            var _tmp = '';
            for (var index in _obj)
            {

                if( parseInt(index , 10) === 0 )
                    _tmp = window[_obj[index]];
                else 
                {
                    if( !Number.isNaN(parseInt(_obj[index],10)))
                        _tmp = _tmp[parseInt(_obj[index],10)];
                    else
                        _tmp = _tmp[_obj[index]];
                }
            }
        }
        else if( typeof params.focusOn === 'object')
            spaceInfos.myTarget = params.focusOn;
    }

    Easy2DCamera.prototype._initScrollingValues = function(scrolling)
    {   
        for(var index in scrolling)
        {
        
            scrollingValues[index] = scrolling[index];
            
            if(scrolling[index]['active'] === undefined)
                scrollingValues[index]['active'] = true;
            if(scrollingValues[index].min >=scrollingValues[index].max )
                scrollingValues[index].active = false;
            if(index === 'left')
                scrollingValuesMax[index] = {x : spaceInfos.pointReferenceX - scrollingValues.left.max, y : spaceInfos.pointReferenceY - 330 , w : 10 , h : 1000};
            if(index === 'right')
                scrollingValuesMax[index] = {x : spaceInfos.pointReferenceX + scrollingValues.right.max, y : spaceInfos.pointReferenceY - 330 , w : 10 , h : 1000};
            if(index === 'up')
                scrollingValuesMax[index] = {x : spaceInfos.pointReferenceX - 330 , y : spaceInfos.pointReferenceY - scrollingValues.up.max , w : 1000 , h : 10};
            if(index === 'down')
                scrollingValuesMax[index] = {x : spaceInfos.pointReferenceX - 330 , y : spaceInfos.pointReferenceY + scrollingValues.down.max , w : 1000 , h : 10};

        }
        for(var index in arrayDirection)
        {
            if (scrollingValues[arrayDirection[index]] === undefined)
                scrollingValues[arrayDirection[index]] = {min : 50 , max : 1000 , active : false};
        }
        console.log(scrollingValuesMax)
    };

    Easy2DCamera.prototype.debug = function(ctx)
    {
        ctx.beginPath();
        ctx.fillStyle="rgb(255,215,0)";
        this._drawcross(ctx,spaceInfos.pointReferenceX,spaceInfos.pointReferenceY,"rgb(255,215,0)");
        this._drawcross(ctx,posTarget.x,posTarget.y,"rgb(0,0,255)");
        this._drawLimits(ctx);
        ctx.closePath();
    };
    
    Easy2DCamera.prototype.run = function() 
    {
        var returnObjPos = this._testObjPos(spaceInfos.myTarget);
        // console.log(returnObjPos);
        var returnDistance = this._calculateDistance(returnObjPos.x,returnObjPos.y);
        // console.log(returnDistance);
        if( returnObjPos !== false && returnDistance !== false )
        {
            this._testDirection(returnDistance , returnObjPos);
            this._round();
        }   
    };

    Easy2DCamera.prototype.setNewPointsReference = function(params)
    {
        if(typeof params.x === "number" && typeof params.y === "number")
        {
            spaceInfos.pointReferenceX = params.x || spaceInfos.pointReferenceX;
            spaceInfos.pointReferenceY = params.y || spaceInfos.pointReferenceY;
            return true;
        }
        else
        {
            console.warn("params aren't number ");
            return false;
        }
    };

    Easy2DCamera.prototype.setNewWorldPositions = function(params)
    {
        if(typeof params.x === "number" || typeof params.y === "number")
        {
            spaceInfos.worldX = params.x || spaceInfos.worldX;
            spaceInfos.worldY = params.y || spaceInfos.worldY;
            return true;
        }
        else
        {
            console.warn("params aren't number ");
            return false;
        }
    };

    Easy2DCamera.prototype.setScrollingDirection = function(direction,params)
    {
        if( arrayDirection.indexOf(direction)!== -1 && typeof params === "object"  )
        {
            scrollingValues[direction].min = params.min || scrollingValues[direction].min;
            scrollingValues[direction].max = params.max || scrollingValues[direction].max;
            
            if(params['active'] === undefined || params['active'] === false)
                scrollingValues[direction]['active'] = false;
            else
                scrollingValues[direction]['active'] = true;
            return true;
        }
        else
        {
            console.warn("params aren't valid");
            return false;
        }
    };

    Easy2DCamera.prototype.getScrollingValues = function()
    {
        return scrollingValues;
    };

    Easy2DCamera.prototype.getSpaceInfos = function()
    {
        return spaceInfos;
    };

    Easy2DCamera.prototype._testObjPos = function(params) 
    {
        var test = {};
        for(var index in params) {
            if((index === "y" || index === "x") || ((index === "pos" || index === "characts" || index === 'posRelative')  && params[index].y !== undefined && params[index].x !== undefined ))
                test[index] = params[index];
        }
        if (test.posRelative !== undefined)
            test = test.posRelative;
        else if (test.pos !== undefined)
            test = test.pos;
        
        posTarget = test;
        return (test.x !== undefined && test.y !== undefined )? test : false ;
    };

    Easy2DCamera.prototype._calculateDistance = function(x,y)
    {
        // console.log(x,y,this.spaceInfo);
        if(typeof x === "number" && typeof y === "number" )
            return  Math.sqrt(this._sqrMath(spaceInfos.pointReferenceY-y) + this._sqrMath(spaceInfos.pointReferenceX-x ));
        else 
            return false;
    };

    Easy2DCamera.prototype._testDirection = function(returnDistance , pos)
    {
        // if( scrollingValues.left.active && returnDistance >= scrollingValues.left.min*2 && pos.x <= spaceInfos.pointReferenceX - scrollingValues.left.min )
        //     spaceInfos.worldX -= spaceInfos.myTarget.speed*scrollingValues.speed;
        if( scrollingValues.left.active && returnDistance >= scrollingValues.left.min && pos.x <= spaceInfos.pointReferenceX - scrollingValues.left.min )
            spaceInfos.worldX -= scrollingValues.speed;
        
        // if( scrollingValues.right.active && returnDistance >= scrollingValues.right.min*2 && pos.x >= spaceInfos.pointReferenceX + scrollingValues.right.min )
        //     spaceInfos.worldX += spaceInfos.myTarget.speed*scrollingValues.speed;
        if( scrollingValues.right.active && returnDistance >= scrollingValues.right.min && pos.x >= spaceInfos.pointReferenceX + scrollingValues.right.min)
            spaceInfos.worldX += scrollingValues.speed;
        
        // if( scrollingValues.up.active && returnDistance >= scrollingValues.up.min*3 && pos.y <= spaceInfos.pointReferenceY - scrollingValues.up.min)
        //     spaceInfos.worldY -= spaceInfos.myTarget.speed*scrollingValues.speed;
        if( scrollingValues.up.active && returnDistance >= scrollingValues.up.min && pos.y <= spaceInfos.pointReferenceY - scrollingValues.up.min)
            spaceInfos.worldY -= scrollingValues.speed;
        
        // if( scrollingValues.down.active && returnDistance >= scrollingValues.down.min*3 && pos.y >= spaceInfos.pointReferenceY + scrollingValues.down.min) 
        //     spaceInfos.worldY += spaceInfos.myTarget.speed*scrollingValues.speed;
        if( scrollingValues.down.active && returnDistance >= scrollingValues.down.min && pos.y >= spaceInfos.pointReferenceY + scrollingValues.down.min) 
            spaceInfos.worldY += scrollingValues.speed;
    };

    Easy2DCamera.prototype._round = function()
    {
        spaceInfos.worldX = spaceInfos.worldX >> 0;
        spaceInfos.worldY = spaceInfos.worldY >> 0;
    };

    Easy2DCamera.prototype._drawcross = function(ctx,x,y,color)
    {
        ctx.fillStyle = color;
        ctx.fillRect(x-25,y-1,50,2);
        ctx.fillRect(x-1,y-25,2,50);
    };

    Easy2DCamera.prototype._drawLimits = function(ctx)
    {
        ctx.fillStyle="rgb(255,0,0)";

        if(scrollingValues.left.active)
            ctx.fillStyle="rgb(0,255,0)";

        ctx.fillRect(spaceInfos.pointReferenceX-scrollingValues.left.min,spaceInfos.pointReferenceY-200,5,400);

        ctx.fillStyle="rgb(255,0,0)";
        
        if(scrollingValues.right.active)
            ctx.fillStyle="rgb(0,255,0)";
        
        ctx.fillRect(spaceInfos.pointReferenceX+scrollingValues.right.min,spaceInfos.pointReferenceY-200,5,400);

        ctx.fillStyle="rgb(255,0,0)";
        
        if(scrollingValues.up.active)
            ctx.fillStyle="rgb(0,255,0)";
        
        ctx.fillRect(spaceInfos.pointReferenceX-200,spaceInfos.pointReferenceY-scrollingValues.up.min,400,5);
        /*LIMIT*/


        ctx.fillStyle="rgb(255,0,0)";
        
        if(scrollingValues.down.active)
            ctx.fillStyle="rgb(0,255,0)";
        
        ctx.fillRect(spaceInfos.pointReferenceX-200,spaceInfos.pointReferenceY+scrollingValues.down.min,400,5);

        ctx.fillStyle="rgb(200,255,200)";
        
        /*for (var index in scrollingValuesMax)
        {
            if(index==="down")
            console.log(index,scrollingValuesMax[index].x,spaceInfos.pointReferenceX,spaceInfos.worldX,scrollingValuesMax[index].y,spaceInfos.pointReferenceY,spaceInfos.worldY);
            ctx.fillRect(scrollingValuesMax[index].x-spaceInfos.worldX, scrollingValuesMax[index].y-spaceInfos.worldY,scrollingValuesMax[index].w,scrollingValuesMax[index].h);
        }*/
    };

    Easy2DCamera.prototype._sqrMath = function(value)
    {
        return value*value;
    };
    this._initTarget(spaceInfo);
    this._initScrollingValues(scrolling);
    
}

});