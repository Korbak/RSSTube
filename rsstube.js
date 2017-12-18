var $j = jQuery.noConflict();
var isNewVersion = new Boolean(false);

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
		msg = '<span style="color:red !important;">✖ Error</span>';
	} else {
	        msg = '<span style="color:green !important;">✔ OK</span>';
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
var els = document.getElementsByTagName('meta'), i = 0, found1 = false, found2 = false,  channelId, channelName, hovercard;
for(i; i < els.length; i++) {
	prop = els[i].getAttribute('itemprop');

	if(prop) {
		if(prop == 'channelId') {
			channelId = els[i].getAttribute('content');
			found1 = true;
		}
		if(found1) {
			break;
		}
	}
}

if(channelId == null) {
    channelId = document.getElementById('owner-name');
    channelId = channelId.firstChild.getAttribute('href');
    channelId = channelId.replace("/channel/","");
    isNewVersion = true;
}

// Getting the Channel Name
hovercard = document.getElementsByClassName('yt-user-info')[0];

if(hovercard == null) {
    hovercard = document.getElementById('owner-name');
    isNewVersion = true;
}
channelName = hovercard.innerText;

// Generating RSS Button
var rssButton = '<a class="popup-modal" href="#popup-content" style="text-decoration:none;">';

if(isNewVersion == true) {
    rssButton = rssButton + '<paper-button id="RSSTube" class="style-scope ytd-button-renderer style-destructive" role="button" tabindex="0" animated="" aria-disabled="false" elevation="0" style="background-color:orange; color:black;" >';
    rssButton = rssButton + browser.i18n.getMessage("buttonTitle");
    rssButton = rssButton + '</paper-button></a>';
} else {
    rssButton = rssButton + '<button class="style-scope ytd-button-renderer style-destructive yt-uix-button yt-uix-button-size-default" style="margin-top: 5px; background-color:orange;" id="RSSTube" name="RSSTube" value="RSSTube">';
    rssButton = rssButton + browser.i18n.getMessage("buttonTitle");
    rssButton = rssButton + '</button></a>';
}

// Generate modal's content
var contentPopup = '<div id="popup-content" class="mfp-hide white-popup-block zoom-anim-dialog"><h1>';
    contentPopup = contentPopup + browser.i18n.getMessage("modalTitle") + ' ' + channelName;
	contentPopup = contentPopup + '</h1><p>';
	contentPopup = contentPopup + browser.i18n.getMessage("modalSubtitle");
	contentPopup = contentPopup + '</p>';
    contentPopup = contentPopup + '<p><input type="text" id="copyTarget" value="https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId + '" /></p>';
    contentPopup = contentPopup + '<p id="msg"></p>';
if(isNewVersion == true) {
   contentPopup = contentPopup + '<paper-button id="copyButton" class="style-scope ytd-button-renderer style-destructive" role="button" tabindex="0" animated="" aria-disabled="false" elevation="0" style="background-color:orange; color:black;" name="copyButton" value="Copier">';
    contentPopup = contentPopup + browser.i18n.getMessage("buttonCopy");
    contentPopup = contentPopup + '</paper-button><paper-button class="popup-modal-dismiss style-scope ytd-button-renderer style-destructive" role="button" tabindex="0" animated="" aria-disabled="false" elevation="0" style="background-color:orange; color:black;" id="fermer" name="fermer" value="Fermer">';
    contentPopup = contentPopup + browser.i18n.getMessage("buttonClose");
    contentPopup = contentPopup + '</paper-button></div>';
}
else {
    contentPopup = contentPopup + '<button class="popup-modal-dismiss yt-uix-button yt-uix-button-size-default" style="margin-right: 10px; background-color:orange;" id="fermer" name="fermer" value="Fermer">';
	contentPopup = contentPopup + browser.i18n.getMessage("buttonClose");
    contentPopup = contentPopup + '</button><button id="copyButton" class="yt-uix-button yt-uix-button-size-default" style="margin-left: 10px; background-color:orange;" name="copyButton" value="Copier">';
	contentPopup = contentPopup + browser.i18n.getMessage("buttonCopy");
    contentPopup = contentPopup + '</button></div>';
}

// Getting subscribe button
if(isNewVersion == false) {
    var subscribeButton = document.getElementsByClassName('yt-uix-button-subscription-container')[0];
}
else {
    var subscribeButton = document.getElementById('subscribe-button');
}

// Inserting RSS Button
if(isNewVersion == false) {
    subscribeButton.innerHTML = subscribeButton.innerHTML + rssButton + contentPopup;
}
else {
    subscribeButton.innerHTML = rssButton + contentPopup;
}

// Inserting listeners
document.getElementById("copyButton").addEventListener("click", function() {
	copyToClipboard(document.getElementById("copyTarget"));
});

document.getElementById("copyButton").addEventListener("click", function() {
    copyToClipboardMsg(document.getElementById("copyTarget"), "msg");
});
