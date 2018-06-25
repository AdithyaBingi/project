var calculationFinished = false;




function clearDisplay() {
    var display = document.getElementById('display');
    display.value = null;
    //storedNum = '0';
    calculationFinished = false;
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
    //if (display.value == '0') display.value = '';
    display.value += digit;
}



function setOperation(command)
{
	var display = document.getElementById('display');
	if(display.value=="" && command!='-')
		return ;
	else 
		display.value += command;
}



function equalTo()
{

	var display = document.getElementById('display');
	var str = display.value;

	return calculate(str);

}


function calculate(str)
{
	var display = document.getElementById('display');

    console.log(str);

    var iseven = false;

    console.log(str.charAt(0));
	if(str.charAt(0)=='-')
		iseven = true;

	var expression = str;
	var copy = expression;

	expression = expression.replace(/[0-9]+/g, "@");
	var numbers = copy.split(/[^0-9\.]+/)
	var operators = expression.split("@").filter(function(n){return n})

	if(iseven)
		numbers.splice(0,1);

	console.log(numbers);

	console.log(operators);

	if(iseven)
	{
		numbers[0] = (-1*parseFloat(numbers[0])).toString(); 
		operators.splice(0,1);
	}

	for (var i = 0; i <operators.length; i++) {
		if (operators[i]=='/') {
			numbers[i]=parseFloat(numbers[i])/parseFloat(numbers[i+1]);
			numbers.splice(i+1,1);
			operators.splice(i);
		}
	}
	for (var i=0; i<operators.length; i++){
		if (operators[i]=='*') {
			numbers[i]=parseFloat(numbers[i])*parseFloat(numbers[i+1]);
			numbers.splice(i+1,1);
			operators.splice(i);
        }
	}
	for (var i=0; i<operators.length; i++){
		if (operators[i]=='+') {
			numbers[i]=parseFloat(numbers[i])+parseFloat(numbers[i+1]);
		}
	}
	for (var i=0; i<operators.length; i++){
		if (operators[i]=='-') {
			numbers[i]=parseFloat(numbers[i])-parseFloat(numbers[i+1]);
		}
	}

	calculationFinished = true;


	var ans = Number(numbers[0]);
	display.value = parseFloat(numbers[0]);

}

if ('addEventListener' in window)
    window.addEventListener('load', clearDisplay);
else
    window.attachEvent('onload', clearDisplay);


