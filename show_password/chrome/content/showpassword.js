
var showpasswordpratikpoddar = {

	showpassword: function() {
		
		var showMe = document.getElementById("showpassword-hide").style;
		var hideMe = document.getElementById("showpassword-show").style;
		
		var currenttabIndex = gBrowser.tabContainer.getIndexOfItem(gBrowser.selectedTab);
		var currentBrowser = gBrowser.getBrowserAtIndex(currenttabIndex);
		
		var inputElementList = currentBrowser.contentDocument.getElementsByTagName("input");
		var inputElementsLength = inputElementList.length;	

		// Loop through all the input tags
		for(var j = 0; j < inputElementsLength; j++) {
			inputElement = inputElementList[j];
			
			// If the element is password
			if(inputElement.hasAttribute("type") && inputElement.getAttribute("type").toLowerCase() == "password") {
				var temp = inputElement.value;
				inputElement.type = "text";
				inputElement.value = temp; 
				inputElement.setAttribute("typechanged", 1);
				} 
		
		}
	
		showMe.display="";
		hideMe.display="none";
		return;
	
	},
	
	hidepassword : function() {
	
	
		var showMe = document.getElementById("showpassword-show").style;
		var hideMe = document.getElementById("showpassword-hide").style;
		
		var currenttabIndex = gBrowser.tabContainer.getIndexOfItem(gBrowser.selectedTab);
		var currentBrowser = gBrowser.getBrowserAtIndex(currenttabIndex);
		
		var inputElementList = currentBrowser.contentDocument.getElementsByTagName("input");
		var inputElementsLength = inputElementList.length;	

		// Loop through all the input tags
		for(var j = 0; j < inputElementsLength; j++) {
			inputElement = inputElementList[j];
			
			// If the element is password
			if(inputElement.hasAttribute("typechanged") && inputElement.getAttribute("typechanged") == 1) {
				var temp = inputElement.value;
				inputElement.type = "password";
				inputElement.value = temp;
				inputElement.removeAttribute("typechanged");
				} 
			
		}
		
		showMe.display="";
		hideMe.display="none";
		return;

	}

}



