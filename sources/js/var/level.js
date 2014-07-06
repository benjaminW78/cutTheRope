define(["class/ImgPool","class/Carre","class/Circle","class/Tear","class/Rope","class/Player"],function(ImgPool,Carre,Circle,Tear,Rope,Player){

var firstLevel = function(){

	this.level=[];
	this.level.push (new Carre({id :2, x:-10.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'left', elementType : 'pic'}));
	this.level.push (new Carre({id :3, x:33.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'right', elementType : 'pic'}));
	
	this.level.push (new Carre({id :4, x:13.5,y:30,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'bottom', elementType : 'pic'}));
	this.level.push (new Carre({id :4, x:13.5,y:-10,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'top', elementType : 'pic'}));
	
	this.level.push (new Carre({id :5, x:13.5,y:19,width:25,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5, isStatic : true, angle :0,myName : 'decor', elementType : 'wall'}));
	this.level.push (new Circle({id :6,imgSrc : ImgPool.images[0],imgW:60,imgH:60,x:12,y:15,restitution:0,radius:1,insideColor : "255,255,255", isStatic : false, angle :0,myName : 'coin', elementType : 'coin'}));
	this.level.push (new Rope({id:7,width : 1,height:1,socleimgSrc:ImgPool.images[5],socleimgW:80,socleimgH:80,ropeimgSrc:ImgPool.images[4],ropeimgW:50,ropeimgH:35,cell : 11,firstStatic:true,obj2:this.level[this.level.length-1],secondStatic:false,x1:14,y1:0,x2:14,y2:12}));
	

	this.level.push(new Player(14,17.5,{pool : ImgPool.images,isStatic : true}));
	return this.level;
};

var secondLevel = function(){

	this.level=[];
	this.level.push (new Carre({id :2, x:-10.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'left', elementType : 'pic'}));
	this.level.push (new Carre({id :3, x:33.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'right', elementType : 'pic'}));
	
	this.level.push (new Carre({id :4, x:13.5,y:30,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'bottom', elementType : 'pic'}));
	this.level.push (new Carre({id :4, x:13.5,y:-10,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'top', elementType : 'pic'}));
	// platForm one
	this.level.push (new Carre({id :5, x:13.5,y:19,width:25,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,255,255", isStatic : true, angle :0,myName : 'decor', elementType : 'wall'}));
	
	this.level.push (new Circle({id :6,imgSrc : ImgPool.images[0],imgW:60,imgH:60,x:12,y:5,restitution:0,radius:0.5,insideColor : "255,255,255", isStatic : false, angle :0,myName : 'coin', elementType : 'coin'}));
	this.level.push (new Rope({id:7,width : 1,height:1,socleimgSrc:ImgPool.images[5],socleimgW:80,socleimgH:80,ropeimgSrc:ImgPool.images[4],ropeimgW:50,ropeimgH:35,cell : 10,firstStatic:true,obj2:this.level[this.level.length-1],secondStatic:false,x1:19,y1:0,x2:14,y2:12}));
	this.level.push (new Rope({id:8,width : 1,height:1,socleimgSrc:ImgPool.images[5],socleimgW:80,socleimgH:80,ropeimgSrc:ImgPool.images[4],ropeimgW:15,ropeimgH:35,cell : 10,firstStatic:true,angle:45,obj2:this.level[this.level.length-2],secondStatic:false,x1:5,y1:5,x2:14,y2:12}));

	this.level.push(new Player(14,17.5,{pool : ImgPool.images,isStatic : true}));
	return this.level;
};

var thirdLevel = function(){

	this.level=[];
// gameover OUT OF SCREEN
	this.level.push (new Carre({id :2, x:-10.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'left', elementType : 'pic'}));
	this.level.push (new Carre({id :3, x:33.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'right', elementType : 'pic'}));
	
	this.level.push (new Carre({id :4, x:13.5,y:30,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'bottom', elementType : 'pic'}));
	this.level.push (new Carre({id :4, x:13.5,y:-10,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'top', elementType : 'pic'}));

// platForm one
	this.level.push (new Carre({id :5, x:13.5,y:19,width:25,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,255,255", isStatic : true, angle :0,myName : 'decor', elementType : 'wall'}));
	
// Bitcoin
	this.level.push (new Circle({id :6,imgSrc : ImgPool.images[0],imgW:60,imgH:60,x:12,y:5,restitution:0,radius:0.5,insideColor : "255,255,255", isStatic : false, angle :0,myName : 'coin', elementType : 'coin'}));
// Ropes connected to the bitcoin
	this.level.push (new Rope({id:7,width : 1,height:1,socleimgSrc:ImgPool.images[5],socleimgW:80,socleimgH:80,ropeimgSrc:ImgPool.images[4],ropeimgW:50,ropeimgH:35,cell : 5,firstStatic:true,obj2:this.level[this.level.length-1],secondStatic:false,x1:19,y1:0,x2:14,y2:12}));

// Rope alone
	this.level.push (new Rope({id:8,width : 1,height:1,socleimgSrc:ImgPool.images[5],socleimgW:80,socleimgH:80,ropeimgSrc:ImgPool.images[4],ropeimgW:15,ropeimgH:35,cell : 20,firstStatic:true,angle:0,secondStatic:true,x1:3,y1:9,x2:25,y2:18}));
// Dead zone 
	this.level.push (new Carre({id :9, x:20,y:10,width:3,height:0.5,imgSrc : ImgPool.images[6],restitution:0,isPattern:true, isStatic : true, angle :0,myName : 'right', elementType : 'pic'}));
// Player
	this.level.push(new Player(14,17.5,{pool : ImgPool.images,isStatic : true}));
	return this.level;
};

var fourthLevel = function(){

	this.level=[];
// gameover OUT OF SCREEN
	this.level.push (new Carre({id :2, x:-10.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'left', elementType : 'pic'}));
	this.level.push (new Carre({id :3, x:33.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'right', elementType : 'pic'}));
	
	this.level.push (new Carre({id :4, x:13.5,y:30,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'bottom', elementType : 'pic'}));
	this.level.push (new Carre({id :4, x:13.5,y:-10,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'top', elementType : 'pic'}));

// platForm one	
	this.level.push (new Carre({id :5, x:13.5,y:19,width:3,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,255,255", isStatic : true, angle :0,myName : 'decor', elementType : 'wall'}));
	
// Bitcoin
	this.level.push (new Circle({id :6,imgSrc : ImgPool.images[0],imgW:60,imgH:60,x:12,y:5,restitution:0,radius:0.5,insideColor : "255,255,255", isStatic : false, angle :0,myName : 'coin', elementType : 'coin'}));
// Ropes connected to the bitcoin
	this.level.push (new Rope({id:7,width : 1,height:1,socleimgSrc:ImgPool.images[5],socleimgW:80,socleimgH:80,ropeimgSrc:ImgPool.images[4],ropeimgW:50,ropeimgH:35,cell : 5,firstStatic:true,obj2:this.level[this.level.length-1],secondStatic:false,x1:19,y1:0,x2:14,y2:12}));
// Rope alone
	this.level.push (new Rope({id:8,width : 1,height:1,socleimgSrc:ImgPool.images[5],socleimgW:80,socleimgH:80,ropeimgSrc:ImgPool.images[4],ropeimgW:15,ropeimgH:35,cell : 20,firstStatic:true,angle:0,secondStatic:true,x1:3,y1:9,x2:25,y2:18}));
// Dead zone 
	this.level.push (new Carre({id :9, x:20,y:10,width:3,height:0.5,restitution:0,imgSrc : ImgPool.images[6],isPattern:true, isStatic : true, angle :0,myName : 'right', elementType : 'pic'}));
// Player
	this.level.push(new Player(14,17.5,{pool : ImgPool.images,isStatic : true}));
	return this.level;
};
var fifthLevel = function(){

	this.level=[];
// gameover OUT OF SCREEN
	this.level.push (new Carre({id :2, x:-10.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'left', elementType : 'pic'}));
	this.level.push (new Carre({id :3, x:33.5,y:10,width:0.5,restitution:0,isPattern:true,height:40,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'right', elementType : 'pic'}));
	
	this.level.push (new Carre({id :4, x:13.5,y:30,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'bottom', elementType : 'pic'}));
	this.level.push (new Carre({id :4, x:13.5,y:-10,width:40,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'top', elementType : 'pic'}));

// platForm one	
	this.level.push (new Carre({id :5, x:23,y:19,width:3,restitution:0,imgSrc : ImgPool.images[3],isPattern:true,height:0.5,insideColor : "255,255,255", isStatic : true, angle :0,myName : 'decor', elementType : 'wall'}));
	
// Bitcoin
	this.level.push (new Circle({id :6,imgSrc : ImgPool.images[0],imgW:60,imgH:60,x:12,y:8,restitution:0,radius:0.5,insideColor : "255,255,255", isStatic : false, angle :0,myName : 'coin', elementType : 'coin'}));
// Ropes connected to the bitcoin
	this.level.push (new Rope({id:7,width : 1,height:1,socleimgSrc:ImgPool.images[5],socleimgW:80,socleimgH:80,ropeimgSrc:ImgPool.images[4],ropeimgW:50,ropeimgH:35,cell : 10,firstStatic:true,obj2:this.level[this.level.length-1],secondStatic:false,x1:2,y1:10,x2:14,y2:12}));
// // Rope alone
	this.level.push (new Rope({id:8,width : 1,height:1,socleimgSrc:ImgPool.images[5],socleimgW:80,socleimgH:80,ropeimgSrc:ImgPool.images[4],ropeimgW:15,ropeimgH:35,cell : 20,firstStatic:true,angle:0,secondStatic:true,x1:1,y1:3,x2:25,y2:5}));
// Dead zone 
	// this.level.push (new Carre({id :9, x:20,y:10,width:3,height:0.5,restitution:0,imgSrc : ImgPool.images[6],isPattern:true, isStatic : true, angle :0,myName : 'right', elementType : 'pic'}));
// Player
	this.level.push(new Player(22,1.5,{pool : ImgPool.images}));
	return this.level;
};
var Level = [];
	Level.push(firstLevel);
	Level.push(secondLevel);
	Level.push(thirdLevel);
	Level.push(fourthLevel);
	Level.push(fifthLevel);
	
	return Level;
	
});
