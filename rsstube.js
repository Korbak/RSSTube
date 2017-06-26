var $j = jQuery.noConflict();

// Modal's script
$j(function () {
	$j(".popup-modal").magnificPopup({
	type: 'inline',
	preloader: false,
	modal: true,
	fixedContentPos: false,
	fixedBgPos: true,
	overflowY: 'auto',
	closeBtnInside: true,
	preloader: false,
	midClick: true,
	removalDelay: 300,
	mainClass: 'my-mfp-zoom-in'
	});
        	
	$j(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$j.magnificPopup.close();
	});
});

function copyToClipboardMsg(elem, msgElem) {
	var succeed = copyToClipboard(elem);
	var msg;
	if (!succeed) {
		msg = '<span style="color:red !important;">Échec de la copie - utilisez CTRL+C</span>';
	} else {
	        msg = '<span style="color:green !important;">Le lien a été copié dans le presse-papier !</span>';
	}
	if (typeof msgElem === "string") {
		msgElem = document.getElementById(msgElem);
	}
	msgElem.innerHTML = msg;
	setTimeoutMsg(function() {
		msgElem.innerHTML = "";
	}, 2000);
}

function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    	target.textContent = elem.textContent;
    }

    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}

// Getting the Channel ID
var els = document.getElementsByTagName('meta'), i = 0, found1 = false, found2 = false,  channelId, channelName;
for(i; i < els.length; i++) {
	prop = els[i].getAttribute('itemprop');

	if(prop) {
		if(prop == 'channelId') {
			channelId = els[i].getAttribute('content');
			found1 = true;
		}
		else if(prop == 'name') {
			channelName = els[i].getAttribute('content');
			found2 = true;
		}
		if(found1 && found2) {
			break;
		}
	}
}

// Generating RSS Button
var rssButton = '<a class="popup-modal" href="#popup-content">';
    rssButton = rssButton + '<button class="yt-uix-button yt-uix-button-size-default" style="margin-top: 5px; background-color:orange;" id="RSSTube" name="RSSTube" value="RSSTube">🔗 Voir le flux RSS</button>';
    rssButton = rssButton + '</a>';

// Generate modal's content
var contentPopup = '<div id="popup-content" class="mfp-hide white-popup-block zoom-anim-dialog">';
    contentPopup = contentPopup + '<h1>Flux RSS de la chaîne ' + channelName + '</h1>';
    contentPopup = contentPopup + '<p>Copiez ce lien dans votre lecteur RSS favori :</p>';
    contentPopup = contentPopup + '<p><input type="text" id="copyTarget" value="https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId + '" /></p>';
    contentPopup = contentPopup + '<p id="msg"></p>';
    contentPopup = contentPopup + '<button class="popup-modal-dismiss yt-uix-button yt-uix-button-size-default" style="margin-right: 10px; background-color:orange;" id="fermer" name="fermer" value="Fermer">Fermer</button>';
    contentPopup = contentPopup + '<button id="copyButton" class="yt-uix-button yt-uix-button-size-default" style="margin-left: 10px; background-color:orange";" name="copyButton" value="Copier">Copier</button>';
    contentPopup = contentPopup + '</div>';

// Getting subscribe button
var subscribeButton = document.getElementsByClassName('yt-uix-button-subscription-container')[0];

// Inserting RSS Button
subscribeButton.innerHTML = subscribeButton.innerHTML + rssButton + contentPopup;
//document.body.innerHTML = document.body.innerHTML + contentPopup;

// Inserting listeners
document.getElementById("copyButton").addEventListener("click", function() {
	copyToClipboard(document.getElementById("copyTarget"));
});

document.getElementById("copyButton").addEventListener("click", function() {
    copyToClipboardMsg(document.getElementById("copyTarget"), "msg");
});
