
	
var searchtabpratikpoddar = {

	toggleView : function() {
		
		var displayToggle =  document.getElementById("searchtab-panel").style.display;

		if (displayToggle == 'none')
			document.getElementById("searchtab-panel").style.display = 'block';
		else
			document.getElementById("searchtab-panel").style.display = 'none';

		displayToggle =  document.getElementById("searchtab-panel").style.display;

	},

	searchtabcheckifenterispressed : function(e){ //  when something is typed
		if (!e.which)
			return true;
		if(e.which == 13){ //  hit Enter
		

			var expr = document.getElementById("searchtabexpression").value.toLowerCase();

			// Check each tab of this browser instance
		    	var numTabs = gBrowser.browsers.length;
		    		    	
		   	for(var index=1; index<=numTabs; index++) {
		   		
		   		var currentIndex = (gBrowser.tabContainer.getIndexOfItem(gBrowser.selectedTab) + index)%numTabs;
				var currentTab = gBrowser.tabContainer.getItemAtIndex(currentIndex);
		   		var currentBrowser = gBrowser.getBrowserAtIndex(currentIndex);
		      		
				if (currentBrowser.contentDocument.title.toLowerCase().match(expr)!= null || currentBrowser.contentDocument.URL.toLowerCase().match(expr)!=null || currentTab.label.toLowerCase().match(expr)!= null)
				{
				gBrowser.selectedTab = gBrowser.tabContainer.getItemAtIndex(currentIndex);
				document.getElementById("searchtabexpression").select();
				return;
				}	
		      		
		        } 
		       
		        document.getElementById("searchtabexpression").value = "Search query failed";
		        document.getElementById("searchtabexpression").focus();
		        return;
	       
	       }

		if(e.which == 27){ //  hit Esc
			
			gBrowser.focus();
		}
	},

	searchtabbringtofocus : function() {

		document.getElementById("searchtab-panel").style.display = 'block';
		document.getElementById("searchtabexpression").select();
		return;
	},

	printheading : function() {

		if (document.getElementById("searchtabexpression").value == "")
		{
		document.getElementById("searchtabexpression").value = "Search Tab";
		}
	}

}


