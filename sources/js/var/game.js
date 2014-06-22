define(["libs/EasyInput","config/box2dConfig","libs/Easy2DCamera","var/level","config/config","controllers/ColisionControler","controllers/EventsController"],function( Input, box2dConfig, Easy2DCamera, level , config,ColisionControler,EventsControler){

    var currentLevel = 0;
    // console.log(level[currentLevel].length-1,level[currentLevel][level[currentLevel].length-1])
    var Game = {gestion        : {camera     : ''                
                               ,  box2DWorld : box2dConfig.world 
                               ,  worldScale : 30.0}             
             ,  players        : {1          : level[currentLevel][level[currentLevel].length-1]}     
             ,  sceneContainer : level[currentLevel]
          };
    Game.gestion.input = new Input(Game);
    Game.gestion.camera = new Easy2DCamera( window.canvas                                     
                                          , {"focusOn"         : Game.players[1]              
                                          ,  "pointReferenceX" : config.canvasObject.width/2
                                          ,  "pointReferenceY" : config.canvasObject.height/2 
                                          ,  "worldX"          : 0                            
                                          ,  "worldY"          : 0}                           
                                          , {//"left"            : {"min" : 100                 
                                          //                      ,  "max" : 200}                
                                          // ,  "right"           : {"min" : 50                  
                                          //                      ,  "max" : 1000}               
                                          // ,  "up"              : {"min" : 50                  
                                          //                      ,  "max" : 300}                
                                          // ,  "down"            : {"min" : 50                  
                                          //                      ,  "max" : 100}                
                                            "speed"           : 3});

    Game.gestion.eventControler = new EventsControler();
    Game.gestion.colisionControler = new ColisionControler(Game);
    Game.gestion.box2dConfig = box2dConfig;
        window.addEventListener("mousemove",function(e){
            if(Game.players[1].click===true){
              // console.log("mouseMove",Game.players[1])
              rect = config.canvas.getBoundingClientRect()
              var mousePos ={x:(e.clientX-rect.left)/(rect.right-rect.left)*config.canvas.width
                            ,y:(e.clientY-rect.top)/(rect.bottom-rect.top)*config.canvas.height}; 
              Game.players[1].updatePointer(mousePos,Game);
            }
        })
        window.addEventListener("mousedown",function(e){
            if(Game.players[1].click===false){
               var coord =  Game.players[1].getMouseCoord({x:e.offsetX,y:e.offsetY},Game);

                Game.players[1].createCuter(coord);   
                Game.players[1].click=true;
            }
        })
        window.addEventListener("mouseup",function(e){
            if(Game.players[1].click===true ){
                Game.players[1].destroyCuter(Game);
                Game.players[1].click=false;
                box2dConfig.world.DestroyJoint(Game.players[1].mouse_joint);   
                Game.players[1].mouse_joint=undefined;
            }
        })

    Game.gestion.input.addEvent("mousemove", window,Game);
    Game.gestion.input.addEvent("keydown", window,Game);
    Game.gestion.input.addEvent("keyup", window,Game);


    Game.gestion.gameStatus = '';

    // console.log(Game.players[1]);
    // console.log(Game.players.pos);
    
    return Game;

});