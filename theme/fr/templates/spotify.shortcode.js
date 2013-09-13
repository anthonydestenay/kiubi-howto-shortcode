/**
 * Shortcode Spotify
 * Permet l'intégration d'un player spotify
 * 
 * attributs du shortcode
 *  - url URL spotify de l'album, playliste ou piste
 *  - width (optionel) Largeur du player
 *  - height (optionel) Hauteur du player
 *  - theme (optionel) Les valeurs admises sont "dark" (défaut) et "light"
 *  - view (optionel) Les valeurs admises sont "list" (défaut) et "covertart"
 * 
 * exemples
 *	 [spotify url=https://play.spotify.com/track/642Z1pKJ9i0FES5sibwRls]
 *	 [spotify url=https://play.spotify.com/track/642Z1pKJ9i0FES5sibwRls width=100% height=80]
 *	 [spotify url=spotify:user:erebore:playlist:788MOXyTfcUb1tdw4oC7KJ theme=black view=list]
 *   [spotify url=spotify:user:erebore:playlist:788MOXyTfcUb1tdw4oC7KJ theme=white view=coverart]
 */
(function($){
	
	'use strict';
	
	$.shortcode || $.error("Le plugin shortcode.js est requis");

	// On enregistre un nouveau shortcode sur la page
	$.shortcode.register('spotify', function(attr){
		
		if(!attr.url) return false;
		
		var src = 'https://embed.spotify.com/?uri=' + encodeURIComponent(attr.url)
		if(attr.theme) src += '&theme=' + encodeURI(attr.theme);
		if(attr.view) src += '&view=' + encodeURI(attr.view);

		return $('<iframe>').attr({
			width : attr.width || 300,
			height : attr.height || 380,
			src : src,
			frameborder : 0,
			allowtransparency : true,
			scrolling : "no"
		});

	});
	
})(window.jQuery);
