
	//document.addEventListener("deviceready", onDeviceReady, false);

	console.log("outsideDeviceReady");

	//function onDeviceReady(){ //NOT ACTIVATING!!!
		
		console.log("insideDeviceReady");

		var allContacts = new Array();

		$("#getContactsBtn").click(function(){
			console.log("getContactsBtn clicked");
			/*var options = new ContactFindOptions();
			options.filter = "";
			options.multiple = true;*/
			var fields = ["displayName", "name", "emails"];
			navigator.contacts.find(fields, contactRetrievalSuccess, contactRetrievalFailure);
		});
		
	//}

	function shakeEventDidOccur () {
		alert("howdy");
		var ownEmail = "";
		var ownName = "";
		var emailReg = /^([w-.]+@([w-]+.)+[w-]{2,4})?$/;
		if(!emailReg.test($("#emailFromInput")) && $("#emailFromInput").val() != ""){
			ownEmail = $("#emailFromInput").val();
		}
		if($("#nameFromInput").val() != ""){
			ownName = $("#nameFromInput");
		}
		contactListMails.push(ownEmail);
		contactListNames.push(ownName);
		//arrangeSecretSantas(contactListMails, contactListNames, ownEmail);
	    //put your own code here etc.
	    if (confirm("Undo?")) {
	    	
	    }
	}

	var newContactListNames = Array();

	function arrangeSecretSantas(contactListMails, contactListNames, ownEmail){
		var maxCount = contactListNames.length - 1;
		var checkArray = new Array();

		for(var i = 0; i < contactListNames.length; i++){
			var r = Math.floor(Math.random(0, maxCount));
			if(($.inArray(r, checkArray) == -1 || checkArray.length == 0) && i != r){
				newContactListNames[r] = contactListNames[i];
				checkArray.push(r);
			}else{
				i--;
			}
		}

		var mailSubject = "Secret Santa assigned.";

		for(var i = 0; i < contactListNames.length; i++){

			var mailMmessage = "You (" + contactListNames[i] + ") are the Secret Santa for: " + newContactListNames[i] + ".";
			var emailToMail = contactListMails[i];
			
			$.post("sendEmail.php",
			{
				emailTo: emailToMail, emailFrom: ownEmail, subject: mailSubject, message: mailMmessage
			},
				function(data){
					//alert("Secret Santas have been assigned, check your mail");
				});

		}
	}

	function contactRetrievalSuccess(contacts){

		$("#contactList").append("<ul data-role=\"listview\" data-filter=\"true\">");
		

		for(var i = 0; i < contacts.length; i++){

			console.log("Display Name = " + contacts[i].displayName);
			$("#contactList").append("<li id=\"contact" + i + "\" class=\"listContact\">" + contacts[i].displayName + "</li>");
		
		}
		
		$("#contactList").append("</ul>");
	
	}

	function contactRetrievalFailure(contactError){
		alert("Sorry, something went wrong accessing your contact list.");
	}

	$(".listContact").on("click", function(){

	});

	$("#newSuggestionInput").keypress(function(e){
		var p = e.which;
		if(p==13){
			addSuggestion($("#newSuggestionInput").val());
		}
	});

	$("#addSuggestionBtn").click(addSuggestion($("#newSuggestionInput").val()));

	function addSuggestion(newSuggestion){
		var collDiv = $("<div/>");
		var header = $("<h3/>");
		var btnCheck = $("<button/>").attr({
			"data-inline": "true",
			"data-icon": "check"
		});
		var btnDelete = $("<button/>").attr({
			"data-inline": "true",
			"data-icon": "delete"
		});
		var ctrlDiv = $("<div/>").attr({
			"data-role": "controlgroup",
			"data-type": "horizontal"
		});
		header.text(newSuggestion);
		btnCheck.text("Check");
		btnDelete.text("Delete");
		collDiv.append(header);
		collDiv.append(ctrlDiv);
	}	