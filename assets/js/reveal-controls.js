Reveal.initialize({ 
	history: true,
	center: false,
	dependencies: [ 
		{ src: 'vendor/reveal.js-3.6.0/plugin/markdown/marked.js' },
		{ src: 'vendor/reveal.js-3.6.0/plugin/markdown/markdown.js' },
		{ src: 'vendor/external/external.js', 
			condition: function() { 
				return !!document.querySelector( '[data-external]' ); }
		},
		{ src: 'vendor/reveal.js-3.6.0/plugin/notes/notes.js', async: true },
		{ src: 'vendor/reveal.js-3.6.0/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
	]
});

function showFooterAfterDelay() { 
	$(".footer")
	.delay(1000)
	.queue(function(n) { 
		$(this).css("color", "#000000"); 
		n(); 
	});
};

Reveal.addEventListener("title", showFooterAfterDelay);

Reveal.addEventListener("pinboard", function() { 

	$("#frame").closest("section").first().addClass("scrollable");

	var modal = $("#image-modal");

	$("#image-modal .close").on("click", function() { 
		modal.css("display", "none");
	});

	$("#image-modal img").on("click", function() { 
		modal.css("display", "none");
	});

	$("#frame .note img").each(function() { 
		$(this).on("click", function() { 
			var imageSource = $(this).attr("src");
			modal.css("display","block");
			$("#image-modal img").attr("src", imageSource);
		})
	});

});

Reveal.addEventListener("xor", function() { 

	function convertToBinary(oneCharString) { 
		var asciiBinary = "000000000";
		if(oneCharString[0] === undefined) return "";
		var bin = oneCharString[0].charCodeAt(0).toString(2) + " ";
		return (asciiBinary + bin).slice(-asciiBinary.length);
	};

	$(".xor-input").keyup(function() { 

		var char = $(this).val();
		var charAsBinaryString = convertToBinary(char);
		$(this).data("bin-string", charAsBinaryString);

		for(var i=0; i<charAsBinaryString.length; i++) { 
			var outputTargetSelector = "#" + $(this).attr("id") + "-" + i;
			$(outputTargetSelector).val(charAsBinaryString[i]);
		}

	});

	$("#clear-digits").on("click", function() { 
		$(".bc-digit-input").val("");
	});

	$("#do-xor").on("click", function() { 
		var temp = ""
		var result = [];
		$(".xor-input").each(function() { 
			var bs = $(this).data("bin-string");
			if(temp === "") { 
				temp = bs;
			}
			else { 
				for(var i=0; i<bs.length; i++) { 
					var a = parseInt(temp[i]);
					var b = parseInt(bs[i]);
					isXOR = (( a || b ) && !( a && b ));
					var newDigit = isXOR ? "1" : "0";
					result[i] = newDigit;
					$("#xor-out-" + i).val(newDigit);
				}
			}
		})
		.promise()
    	.done(function() { 
    		$("#xor-out").val(parseInt(result.join(""), 2).toString());
    	});
	});

});

Reveal.addEventListener("hash", function() { 

	$("#digest-01").val(bcDemo.hash($("#message-01").val()));

	$("#message-01").keyup(function() { 
		bcDemo.updateHashValueForTextInput($(this));
	});

	$("#clear-textarea").on("click", function() { 
		$("#message-01").val("");
		$("#digest-02").html("");
		bcDemo.updateHashValueForTextInput($("#message-01"));
	});

	$("#save-hash").on("click", function() { 
		$("#digest-02").html($("#digest-01").val());
	});

	$("#shakespeare").on("click", function() { 
		$("#message-01").val("How all occasions do inform against me, And spur my dull revenge! What is a man, If his chief good and market of his time Be but to sleep and feed? a beast, no more. Sure, he that made us with such large discourse, Looking before and after, gave us not That capability and god-like reason To fust in us unused. Now, whether it be Bestial oblivion, or some craven scruple Of thinking too precisely on the event, A thought which, quarter’d, hath but one part wisdom And ever three parts coward, I do not know Why yet I live to say ‘This thing’s to do;’ Sith I have cause and will and strength and means To do’t. Examples gross as earth exhort me: Witness this army of such mass and charge Led by a delicate and tender prince, Whose spirit with divine ambition puff’d Makes mouths at the invisible event, Exposing what is mortal and unsure To all that fortune, death and danger dare, Even for an egg-shell. Rightly to be great Is not to stir without great argument, But greatly to find quarrel in a straw When honour’s at the stake. How stand I then, That have a father kill’d, a mother stain’d, Excitements of my reason and my blood, And let all sleep? while, to my shame, I see The imminent death of twenty thousand men, That, for a fantasy and trick of fame, Go to their graves like beds, fight for a plot Whereon the numbers cannot try the cause, Which is not tomb enough and continent To hide the slain? O, from this time forth, My thoughts be bloody, or be nothing worth!");
		$("#digest-02").html("");
		bcDemo.updateHashValueForTextInput($("#message-01"));
	});

	$("#sign-alice").on("click", function() { 
		$("#message-01").val("");
		$("#digest-01").val("");
		$("#digest-02").html(bcDemo.hash("alice"));
	});

	function searchWindow(term) { 
		var url = "https://www.google.co.uk/search?q=" + term;
		var name = "search";
		var w = 800;
		var h = 400;
		var x = 200;
		var y = 200;

		window.open(url,name,"resizable=no,toolbar=no,scrollbars=no,menubar=no,status=no,directories=n o,width="+w+",height="+h+",left="+x+",top="+y+"");
	};

	$("#google").on("click", function() { 
		var hash = $("#digest-01").val();;
		searchWindow(hash);
	});

});

Reveal.addEventListener('links', function() { 

	var saveStateWidgetsSelector = ".bc-save-state-widget";

	var allStateManagers = $("#message-11")
		.closest("section")
		.find(".bc-save-state-widget");

	$(saveStateWidgetsSelector).each (function() { 
		var element = $(this);
		element.data("state-manager", new bcDemo.StateManager(element));
	});

	$(saveStateWidgetsSelector).on("click", function() { 
		$(this).data("state-manager").toggleSaveState();
	});

	$("#add-legal").on("click", function() { 

		$("#message-11").val("I leave all my money to Alice");
		$("#message-12").val("I leave 50% of my money to Alice, 50% to the Cat's Home");
		$("#message-13").val("I leave 100% of my money to the Cat's Home");

		bcDemo.updateHashValueForChainedTextInputs($("#message-11"));
		bcDemo.updateHashValueForChainedTextInputs($("#message-12"));
		bcDemo.updateHashValueForChainedTextInputs($("#message-13"));

		allStateManagers.each(function(index) { 
			$(this).data("state-manager").checkAndAlertStateChange();
		});

	});

	$("#add-brexit").on("click", function() { 

		$("#message-11").val("Bob forms undercover group on dark web");
		$("#message-12").val("Alice steals secret government documents");
		$("#message-13").val("Government crashes. General Election. Bob for PM");

		bcDemo.updateHashValueForChainedTextInputs($("#message-11"));
		bcDemo.updateHashValueForChainedTextInputs($("#message-12"));
		bcDemo.updateHashValueForChainedTextInputs($("#message-13"));

		allStateManagers.each(function(index) { 
			$(this).data("state-manager").checkAndAlertStateChange();
		});

	});

	$("#clear-all").on("click", function() { 

		var allTextInputs = $(this).closest("section").find(".bc-mesg-text-input");

		allTextInputs.each(function() { 

			$(this).val("");
			bcDemo.updateHashValueForChainedTextInputs($(this));

			allStateManagers.each(function(index) { 
				$(this).data("state-manager").checkAndAlertStateChange();
			});
		});

	});

	var allMessageTextInputs = $("#message-11")
		.closest("section")
		.find(".bc-mesg-text-input");

	$(allMessageTextInputs).keyup(function() { 

		bcDemo.updateHashValueForChainedTextInputs($(this));

		allStateManagers.each(function(index) { 
			$(this).data("state-manager").checkAndAlertStateChange();
		});

	});

});

Reveal.addEventListener("mining", function() { 

	$("#bitcoin").hide();
	$("#minerfail").hide();

	bcDemo.updateHashValueForChainedTextInputs($("#message-21"));

	var allMessageTextInputs = $("#message-21")
		.closest("section")
		.find(".bc-mesg-text-input");

	$(allMessageTextInputs).keyup(function() { 

		bcDemo.updateHashValueForChainedTextInputs($(this));

		var allStateManagers = $(this)
			.closest("section")
			.find(".bc-save-state-widget");

		allStateManagers.each(function(index) { 
			$(this).data("state-manager").checkAndAlertStateChange();
		});

	});

	$("#start-mining").click(function() { 

		$("#bitcoin").hide();
		$("#minerfail").hide();

		var blockData = $("#digest-23").val();
		var hashTarget = $("#hash-target").val().toString();

		var miner = new bcDemo.Miner(blockData, hashTarget);
		miner.mine();

	});

});

Reveal.addEventListener('thanks', function() { 
	$("#thanks-hash").html(bcDemo.hash("thank you"));
	showFooterAfterDelay();
});
