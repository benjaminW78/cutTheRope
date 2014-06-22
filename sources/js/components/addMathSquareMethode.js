define(function(){

	return function addMathSquareMethodes(myClass)
			{
				myClass.prototype._sqrMath = function(value)
				{
					return value*value;
				}
			}
});