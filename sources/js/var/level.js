define(["class/ImgPool","class/Carre","class/Circle","class/Tear","class/Rope","class/Player"],function(ImgPool,Carre,Circle,Tear,Rope,Player){

var firstLevel = function(){

	this.level=[];
	this.level.push (new Carre({id :2, x:-6.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'left', elementType : 'pic'}));
	this.level.push (new Carre({id :3, x:33.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'right', elementType : 'pic'}));
	
	this.level.push (new Carre({id :4, x:13.5,y:30,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'bottom', elementType : 'pic'}));
	this.level.push (new Carre({id :4, x:13.5,y:-10,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'top', elementType : 'pic'}));
	
	this.level.push (new Carre({id :5, x:13.5,y:20,width:25,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,255,255", isStatic : true, angle :0,myName : 'decor', elementType : 'wall'}));
	this.level.push (new Circle({id :6,imgSrc : ImgPool.images[0],imgW:60,imgH:60,x:12,y:5,restitution:0,radius:0.5,insideColor : "255,255,255", isStatic : false, angle :0,myName : 'coin', elementType : 'coin'}));
	this.level.push (new Rope({id:7,width : 1,height:1,socleimgSrc:ImgPool.images[5],socleimgW:80,socleimgH:80,ropeimgSrc:ImgPool.images[4],ropeimgW:15,ropeimgH:35,cell : 10,firstStatic:true,obj2:this.level[this.level.length-1],secondStatic:false,x1:19,y1:0,x2:14,y2:12}));
	this.level.push (new Rope({id:8,width : 1,height:1,socleimgSrc:ImgPool.images[5],socleimgW:80,socleimgH:80,ropeimgSrc:ImgPool.images[4],ropeimgW:15,ropeimgH:35,cell : 10,firstStatic:true,angle:45,obj2:this.level[this.level.length-2],secondStatic:false,x1:5,y1:5,x2:14,y2:12}));

	this.level.push(new Player(14,18,{pool : ImgPool.images}));
	return this.level;
};

var Level = [];
	Level.push(firstLevel);
	
	return Level;
	
});
