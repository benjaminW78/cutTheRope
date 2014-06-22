define(function(){

    return function addMemberAction(myClass) {
       
    myClass.prototype.memberAction = function(action){

            var character = _this.activeMember;
            
            var methode = _this.getMembersCharacts()[character].actions[action];
            
            _this[methode]();
                  
        }
    }

});