define(["class/ImgPool","libs/EasyInput","config/box2dConfig","libs/Easy2DCamera","var/level","config/config","controllers/ColisionControler","controllers/EventsController"],function(ImgPool, Input, box2dConfig, Easy2DCamera, level , config,ColisionControler,EventsControler){

    var currentLevel = 0;
    var mylevel = level[currentLevel]();
    var Game = function(){
      this.gestion=undefined;
      this.players=undefined;
      this.sceneContainer=undefined;

      this.init = function(){

        this.gestion        = {camera:'', box2DWorld:box2dConfig.world, worldScale : 30.0};
        this.gestion.input = new Input(this);

        this.players        = {1: mylevel[mylevel.length-1]};
        this.sceneContainer = mylevel;
        this.gestion.camera = new Easy2DCamera( window.canvas, {"focusOn"         : this.players[1]
                                                              ,  "pointReferenceX" : config.canvasObject.width/2
                                                              ,  "pointReferenceY" : config.canvasObject.height/2
                                                              ,  "worldX"          : 0
                                                              ,  "worldY"          : 0}
                                              );
        this.gestion.eventControler = new EventsControler();
        this.gestion.colisionControler = new ColisionControler(this);
        this.gestion.box2dConfig = box2dConfig;
        this.gestion.gameStatus = '';

      }
      this.init();
    };

    return new Game();

});