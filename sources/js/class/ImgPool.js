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

        console.log(img)
        this.images.push(img);
    }
}
    // WIP
    // return Sensor = function (params) {
    //     //add radar sensor to ship
    //     b2CircleShape circleShape;
    //     circleShape.m_radius = 8;
    //     myFixtureDef.shape = circleShape;
    //     myFixtureDef.isSensor = true;
    //     myFixtureDef.filter.categoryBits = RADAR_SENSOR;
    //     myFixtureDef.filter.maskBits = ENEMY_AIRCRAFT;//radar only collides with aircraft
    //     ship->m_body->CreateFixture(&myFixtureDef);
    // }
    return new ImgPool();
});