define(['config/box2dConfig','config/config'],function(box2dConfig,config){

    ImgPool=function(){
        var count = 0;
        this.images = [];
        // Game.gestion.eventControler.add("imgLoaded",function(count){
        //     if(config.imagesSrc.length-1===count){
        //         Game.gestion.eventControler.emit("poolRdy");
        //     }
        // });

        for (var i=0;i<config.imagesSrc.length;i++){

            var img = new Image();
            img.src = config.imagesSrc[i].src;
            img.width = config.imagesSrc[i].w;
            img.height = config.imagesSrc[i].h;
            img.onload = function(){
                count +=1;
                // Game.gestion.eventControler.emit("imgLoaded",count);
            }

            this.images.push(img);
        }
    }
    return new ImgPool();
});