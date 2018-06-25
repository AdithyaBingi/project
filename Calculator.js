var calculationFinished = false;




function clearDisplay() {
    var display = document.getElementById('display');
    display.value = "";
    //storedNum = '0';
    calculationFinished = true;
    //operation = operations.none;
}

function back()
{

    var value = document.getElementById("display").value;

    document.getElementById("display").value = value.substr(0,value.length-1);
}

function clearPreviousResult() {
    var display = document.getElementById('display');
    if (calculationFinished) {
        display.value = '0';
        calculationFinished = false;
    }
}


function insertDecimal() {
    var display = document.getElementById('display');
    clearPreviousResult();
    if (display.value.indexOf('.') == -1) display.value += '.';
}


function input(digit) {
    var display = document.getElementById('display');
    clearPreviousResult();
    if (display.value == '0') display.value = '';
    display.value += digit;
}


function setOperation(command)
{
	var display = document.getElementById('display');
	if(display.value=="" && command!='-')
		return;
	else
		display.value+=command;
}



function equalTo()
{

	var display = document.getElementById('display');
	var str = display.value;

	return calculate(str);

}


function calculate(str)
{

	var expression = str;
	var copy = expression;

	expression = expression.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
	var numbers = copy.split(/[^0-9\.]+/);
	var operators = expression.split("#").filter(function(n){return n});
	var result = [];

	if(str.charAt(0) == '-')
	{
		iseven = true;
		var num = parseFloat(numbers[0]) * (-1);
		numbers[0] = 
		operators.splice(0,1);
	}

	for(var i = 0; i <operators.length;i++)
	{
		var left;
		var right;
		if(operators[i]=='/')
		{
			if(iseven)
			{
				left = numbers[i-1];
			    right = numbers[i];

			    var res = left/right;

			    numbers[i-1] = res;
			    numbers.splice(i,1);
			}
			else
			{
				left = numbers[i];
				right = numbers[i+1];

				var res = left/right;
				numbers[i] = res;
				numbers.splice(i+1,1);
			}

			operators.splice(i,1);
			i = i-1;
		}
	}

}

if ('addEventListener' in window)
    window.addEventListener('load', clearDisplay);
else
    window.attachEvent('onload', clearDisplay);


