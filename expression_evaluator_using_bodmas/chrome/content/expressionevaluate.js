
expressionevaluationpratikpoddar = {

	evaluate_string_without_parantheses : function(tempstack) {
		
		for(i=0;i<tempstack.length;i++)
			{if(tempstack[i]=="^"){tempstack.splice(i-1,3,expressionevaluationpratikpoddar.evaluate(parseFloat(tempstack[i-1]),"^", parseFloat(tempstack[i+1])));i--;}}
		for(i=0;i<tempstack.length;i++)
			{if(tempstack[i]=="/"){tempstack.splice(i-1,3,expressionevaluationpratikpoddar.evaluate(parseFloat(tempstack[i-1]),"/", parseFloat(tempstack[i+1])));i--;}}
		for(i=0;i<tempstack.length;i++)
			{if(tempstack[i]=="*"){tempstack.splice(i-1,3,expressionevaluationpratikpoddar.evaluate(parseFloat(tempstack[i-1]),"*", parseFloat(tempstack[i+1])));i--;}}
		for(i=0;i<tempstack.length;i++)
			{if(tempstack[i]=="+"){tempstack.splice(i-1,3,expressionevaluationpratikpoddar.evaluate(parseFloat(tempstack[i-1]),"+", parseFloat(tempstack[i+1])));i--;}}
		for(i=0;i<tempstack.length;i++)
			{if(tempstack[i]=="-"){tempstack.splice(i-1,3,expressionevaluationpratikpoddar.evaluate(parseFloat(tempstack[i-1]),"-", parseFloat(tempstack[i+1])));i--;}}
		for(i=0;i<tempstack.length;i++)
			{if(tempstack[i]=="%"){tempstack.splice(i-1,3,expressionevaluationpratikpoddar.evaluate(parseFloat(tempstack[i-1]),"%", parseFloat(tempstack[i+1])));i--;}}
		
		return tempstack;
		},
	 
	evaluate : function (num1, op, num2) {
		if (op == "+") return num1 + num2;
		else if (op == "-") return num1 - num2;
		else if (op == "*") return num1 * num2;
		else if (op == "/") return num1 / num2;
		else if (op == "^") return Math.pow(num1,num2);
		else if (op == "%") return num1 % num2;	
		},
		

	expressionevaluate : function (expression) {

		var stack = new Array(); 
		var stringmid = expression.replace(/ /g, "");//((2+3)*(5+2)*(1+2+3+4)*(3+5+6))
		var stringstart="(";
		var stringend=")";
		var string = stringstart.concat(stringmid).concat(stringend);
						
		var stringstack = new Array();
		var lastelementpushed_isanumber = false;
		
		for(var l=0;l<string.length;l++)
		{
			if(isNaN(string.charAt(l)))
			{stringstack.push(string.charAt(l));lastelementpushed_isanumber = false;
			}
		
			else
			{	if(lastelementpushed_isanumber == true)
				{var temp = stringstack.pop();stringstack.push(parseFloat(temp)*10 + parseFloat(string.charAt(l)));lastelementpushed_isanumber = true;}
			
				if(lastelementpushed_isanumber == false)
				{stringstack.push(parseFloat(string.charAt(l)));lastelementpushed_isanumber = true;}		
			}
		}

	        for(var m=0;m<stringstack.length;m++)
		{
			if(stringstack[m]==".")
			{
				var temporary;
			
				if(!isNaN(stringstack[m+1])&&!isNaN(stringstack[m-1]))
				{
				var firstterm = parseFloat(stringstack[m-1]);
				var secondterm = parseFloat(stringstack[m+1]);
				var secondtermlength = parseFloat(Math.floor(Math.LOG10E*Math.log(secondterm)));
				var secondadd = secondterm/Math.pow(10,secondtermlength+1);
				temporary = firstterm + secondadd;
				stringstack.splice(m-1,3,temporary);m--;	
				}
			
				else if(isNaN(stringstack[m+1])&&!isNaN(stringstack[m-1]))
				{
				temporary = stringstack[m-1]; 
				stringstack.splice(m-1,2,temporary);	
				}
			
				else if(!isNaN(stringstack[m+1])&&isNaN(stringstack[m-1]))
				{
				temporary = parseFloat(stringstack[m+1])/Math.pow(10,stringstack[m+1].length); 
				stringstack.splice(m,2,temporary);	
				}
			
				else if(isNaN(stringstack[m+1])&&isNaN(stringstack[m-1]))
				{
				return "Error";	
				}
			}
		}

		for (var k=0;k<stringstack.length;k++)
		{
			if(stringstack[k]=="e") {stack.push(Math.E);}
			else if(stringstack[k]=="p") {stack.push(Math.PI);}
			else stack.push(stringstack[k]);


			if (stringstack[k]==")")
			{	
				stack.pop();
				var whileloop = true;
				var tempstack = new Array();
				while(whileloop == true)
				{	
				if(stack.length<1) {whileloop=false;}	
				var temptopush = stack.pop();
				tempstack.push(temptopush);
				if (temptopush == "(") {tempstack.pop();whileloop = false;}
				}
				
				//taking care of the first character in the expr, i.e. last character in tempstack..so removing it
				if(isNaN(tempstack[tempstack.length-1]))
				{
				var sign = tempstack.pop();
				tempstack.push(sign);
				if(sign=="+")
					{
					tempstack.pop();
					};

				if(sign=="-")
					{
					tempstack.pop();
					var num = tempstack.pop();
					num = -1*num;
					tempstack.push(num);
					};				
				
				}
				
				//checking if tempstack is correct
				for(var count=0;count<tempstack.length;count++)
				{
					if(tempstack.length%2 == 0)
					{return "Error";}
					
					if(count%2==0 && isNaN(tempstack[count]))
					{return "Error";}
				
					if(count%2==1 && !(tempstack[count]=="^"||tempstack[count]=="/"||tempstack[count]=="*"||tempstack[count]=="-"||tempstack[count]=="+"||tempstack[count]=="%"))
					{return "Error";}
				}

				var answer = expressionevaluationpratikpoddar.evaluate_string_without_parantheses(tempstack.reverse()); 
				stack.push(answer[0]);
			}
		}

	   	if(stack.length>1){return "Error";}
	   	else
	   	{return stack;}
	},

	expressionevaluationcheckwhatispressed : function(e){ //  when something is typed
		if (!e.which)
			return true;
		if(e.which == 13){ //  hit Enter  
			var expr = document.getElementById("expression").value;
			var result = expressionevaluationpratikpoddar.expressionevaluate(expr);
			document.getElementById("expression").value = result;
			}
		if(e.which == 27){ //  hit Esc
			
			gBrowser.focus();
		}	
		
	},

	bringtofocus : function() {

	document.getElementById("expression").select();
	return;
	},

	printheading : function() {

		if (document.getElementById("expression").value == "")
		{
		document.getElementById("expression").value = "Expression Evaluator";
		}
	}

}
