define(["class/Carre"],function (Carre) {
 /*****************************************************************************************
    *Fonction de création des larmes avec box2d
    *
    *@  params : object who containes somes arguments :  --------------------------------------------------------------------------------------------
    Case of success  : return true                      |       Keys            |       value Type  |       Obligatoire     |       Exemples        |
    Case of failure : return false                      _____________________________________________________________________________________________                   
                                                        |       x               |       number      |           yes         |           25          |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       y               |       number      |           yes         |           25          |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       id              |       number      |           yes         |           25          |
                                                        ---------------------------------------------------------------------------------------------
    *
    *
    *
    *
    ******************************************************************************************/
return Tear = function(params)
            {
                var _params   = { x           : params.x
                                , y           : params.y
                                , width       : 0.4
                                , height      : 0.5
                                , insideColor : "255,5,255" 
                                , myName      : 'tear'
                                , elementType : 'collectible'
                                , friction    : 0
                                , id          : params.id 
                                , dead        : false
                                , angle       : params.angle
                                , birthTime   : new Date().getTime()
                                }

                if(params.isStatic)
                    _params.isStatic = true;

                this.obj = new Carre(_params);

                this.setDead = function ()
                {
                    colisionTime = new Date().getTime();
                    
                    if(colisionTime-_params.birthTime>=2500)
                        _params.dead = true;
                }

                this.getDead = function()
                {
                    return _params.dead;
                }

                this.destroy = function (Game)
                {
                    Game.gestion.box2DWorld.DestroyBody(this.obj.box2dBody);
                }

            }

});