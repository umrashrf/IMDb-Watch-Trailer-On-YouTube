init();

function init() {
	if (document.domain.indexOf('imdb.com') > 0) {
		var title = $("#overview-top > h1").text().trim().split("\n")[0];
		title = title.replace(" ", "+");
		title = escape(title);

		requestURLByKeyword(title, addButton);

	} else if (document.domain.indexOf('youtube.com') > 0 && document.location.href.indexOf('imdb_watch_trailer_on_youtube') > 0) {

		addAd();

	}
}

function requestURLByKeyword(title, after) {
	var URL = "https://gdata.youtube.com/feeds/api/videos?max-results=1&q=" + title;

	$.ajax({
		url : URL,
		type : 'GET',
		dataType : 'xml',
		success : function(response) {
			var link = $(response).find("feed > entry > link[rel='alternate']").attr("href");
			after(link);
		}
	});
}

function addButton(link) {
	var tr = '<tr><td></td><td id="overview-bottom" class="overview-bottom"><a href="' + adify(link) + '" class="btn2 large primary btn2_glyph_on btn2_text_on imdb_youtube_button model"><span class="btn2_text">Watch Trailer on YouTube</span></a></td></tr>';
	$("#title-overview-widget-layout > tbody").append(tr);
}

function adify(link) {
	return link + "&imdb_watch_trailer_on_youtube";
}

function addAd() {
	$("body").css("overflow", "hidden");

	$("embed#movie_player").css("z-index", "9999");
	$("body").append('<div id="imdbOverlay" style="background-color: rgba(255,255,255,0.9); width: 100%; height: 100%; z-index: 999; position: absolute; top: 0; left: 0;"></div>');

	var playerPos = $("embed#movie_player").offset();
	var w = playerPos.left - 20;
	var h = $("embed#movie_player").height();

	if (w > 50) {
		var ad = '';
		ad += '<img src="http://bassdropclothing.com/wp-content/uploads/2012/06/adhere.png" />';
		ad += '<h1>~800+ Users</h1>';
		ad += '<p>Check out latest number of users <a style="color: yellow;" href="https://chrome.google.com/webstore/detail/bcgckdfdcmpfidoamhnmomhlhmkblhli" target="_blank">from here</a></p>'
		ad += '<br /><br />';
		ad += '<em>For details contact developer <a style="color: yellow;" href="http://umairashraf.me/about/" target="_blank">Umair Ashraf</a></em>';
		ad += '<br /><br />';
		ad += '<input id="btnIMDBCloseAd" type="button" value="Back to YouTube" />';

		$("body").append('<div id="imdbAd" style="border-radius: 10px; padding: 10px 0; text-align: center; color: #FFFFFF; background-color: #000000; position: absolute; top: ' + playerPos.top + 'px; left: 10px; width: ' + w + 'px; max-height: ' + h + 'px; z-index:8888;">' + ad + '</div>');

		$("#btnIMDBCloseAd").bind("click", backToYouTube);
	}
}

function backToYouTube() {
	$("#btnIMDBCloseAd").unbind("click");
	$("#imdbOverlay").hide();
	$("#imdbAd").hide();
	$("body").css("overflow", "auto");
}
