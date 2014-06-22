define(function(){

	return function addEventMethodes(myClass)
			{
				myClass.prototype.events = {};

				myClass.prototype.add = function(myEvent,myFunction)
									{
										if(this.events[myEvent] === undefined)
											this.events[myEvent]=[];

										
										this.events[myEvent].push(myFunction);

										return this.events[myEvent].lengt-1;
									}

				myClass.prototype.emit = function()
									{
										var args = Array.prototype.slice.call(arguments);
								        var eventName = args.shift();
								        
								        var listeners = this.events[eventName];

								        for (var i=0; i < listeners.length; i++) 
								        {
								            listeners[i].apply(this, args);
								        }
									}
				myClass.prototype.getEvent = function(string)
									{
										if(string.indexOf('*')!==-1)
										{
											return this.events;
										}
										else if(string.indexOf('*')=== -1)
										{
											var array  = string.split(' ');
											var objetEvent = {};
											for (var index in array)
												objetEvent[array[index]] = this.events[array[index]];
														
											return objetEvent;
										}								
									}
			}
});
