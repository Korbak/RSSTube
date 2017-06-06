var els = document.getElementsByTagName('meta'), i = 0, channelId;
for(i; i < els.length; i++) {
	prop = els[i].getAttribute('itemprop');

	if(prop) {
		if(prop == 'channelId') {
			channelId = els[i].getAttribute('content');
			break;
		}
	}
}

var subscribeButton = document.getElementsByClassName('yt-uix-button-subscription-container')[0];
var rssButton = '<button class="yt-uix-button yt-uix-button-size-default" style="background-color:orange;" id="RSSTube" name="RSSTube" value="RSSTube" onclick="alert(\'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId + '\');">🔗 Voir le flux RSS</button>';

subscribeButton.innerHTML = subscribeButton.innerHTML + rssButton;
