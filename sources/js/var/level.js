define(["class/Carre","class/Circle","class/Tear","class/Rope","class/Player"],function(Carre,Circle,Tear,Rope,Player){

var FirsLevel = [];
var Level = [];
	// FirsLevel.push (new Carre({id:1,x:-6,y:2,width:9,height:0.5,insideColor : "255,255,255", isStatic : true, angle :90,myName : 'decor', elementType : 'ground'}));

	FirsLevel.push (new Carre({id :2,x:-6,y:2,width:9,height:0.5,insideColor : "255,255,0", isStatic : true, angle : 90 ,myName : 'decor', elementType : 'wall'}));
	// FirsLevel.push (new Tear({x:3,y:2,id:3,isStatic:true}));
	FirsLevel.push (new Carre({id :4, x:14,y:20,width:14,restitution:0,height:0.5,insideColor : "255,255,255", isStatic : true, angle :0,myName : 'decor', elementType : 'ground'}));
	// FirsLevel.push (new Carre({id:5,x:12,y:14,width:1,height:4,insideColor : "255,255,255", isStatic : true, angle :0,myName : 'decor', elementType : 'ground'}));
	// FirsLevel.push (new Carre({id:6,x:17,y:16,width:5,height:1,insideColor : "255,0,0", isStatic : true, angle :0,myName : 'ennemie', elementType : 'pic'}));
	// FirsLevel.push (new Carre({id:7,x:12,y:14,width:1,height:4,insideColor : "255,255,255", isStatic : true, angle :0,myName : 'decor', elementType : 'ground'}));
	// FirsLevel.push (new Carre({id:8,x:25,y:13,width:5,height:4,insideColor : "255,255,255" , isStatic : true , myName : 'decor', elementType : 'ground'}));
	FirsLevel.push (new Rope({id:9,width : 1,height:1,cell : 10,firstStatic:true,secondStatic:false,x1:14,y1:0,x2:14,y2:100}));
	// FirsLevel.push (new Carre({id:9,x:2.8,y:9,width:1,height:0.5,insideColor : "0,0,255" , isStatic : true , myName : 'trigger1', elementType : 'trigger'}));
	// FirsLevel.push (new Carre({id:10,x:3.8,y:7,width:0.2,height:3, insideColor : "255,58,50" , isStatic : true , myName : 'door1', elementType : 'door'}));
	FirsLevel.push(new Player(14,19));
	Level.push(FirsLevel);
	console.log(Level)
	return Level;
	
});
