define(function () {
   return garbageCollector = function (Game) 
                            {
                                for (var index in Game.sceneContainer)
                                {
                                    if(Game.sceneContainer[index].getDead !== undefined && Game.sceneContainer[index].getDead())
                                    {
                                        Game.sceneContainer[index].destroy(Game);
                                        // Game.sceneContainer.splice(index,1);
                                        Game.sceneContainer[index] = "";
                                        Game.players[1].addTears(1);
                                    }
                                }
                            } 
});