define(["class/Tear","config/box2dConfig"],function(Tear,config){
/*
    *@  params : object who containes somes arguments :  --------------------------------------------------------------------------------------------
    Case of success  : return true                      |       Keys            |       value Type  |       Obligatoire     |       Exemples        |
    Case of failure : return false                      _____________________________________________________________________________________________                   
                                                        |       x               |       number      |           yes         |           25          |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       y               |       number      |           yes         |           25          |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       numberOfTears   |       number      |           yes         |           25          |
                                                        ---------------------------------------------------------------------------------------------
                                                        |       Game            |       Object      |           yes         |                    |
                                                        ---------------------------------------------------------------------------------------------

*/
    return addTearsGenerator = function(myClass){

        myClass.prototype.tearsGenerator=function(params,Game)
                                        {
                                            var _params   = { x           : params.x
                                                            , y           : params.y
                                                            , angle       : params.angle
                                                            }

                                            var angleRandom = function()
                                            {
                                                var _angle='';
                                                    while(_angle === ""|| (_angle >270  || _angle<160))
                                                    {
                                                        _angle = Math.round(Math.random()*160+90);
                                                    }
                                                return _angle;
                                            }

                                            var numbersOfTears = params.numbersOfTears;
                                            for (var i = 0; i<numbersOfTears;i++)
                                            {
                                                var _speed = Math.round(Math.random()*5)+2;
                                                var _angle = angleRandom();
                                                _params.id = Game.sceneContainer.length;
                                                Game.sceneContainer.push(new Tear(_params));
                                                Game.sceneContainer[Game.sceneContainer.length-1].obj.box2dObj.GetBody().ApplyImpulse(new config.b2Vec2(0,_speed*2*Math.sin(_angle* (Math.PI / 180))),Game.sceneContainer[Game.sceneContainer.length-1].obj.box2dObj.GetBody().GetWorldCenter());
                                                
                                            }
                                            document.getElementById('counterTears').innerHTML = Game.players[1].getTears();
                                            return true ; 
                                        }
    }
});