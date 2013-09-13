/**
 * Shortcode youtube
 * Permet l'intégration d'une vidéo youtube
 * 
 * attributs du shortcode
 *  - url URL de la vidéo youtube
 *  - width (optionel) Largeur du player
 *  - height (optionel) Hauteur du player
 * 
 * Format d'url reconnus :
 *   http://www.youtube.com/watch?v=ls7NMH_O5Ck&feature=feedrec_grec_index
 *   http://www.youtube.com/user/USERNAME#p/a/u/1/ls7NMH_O5Ck
 *   http://www.youtube.com/v/ls7NMH_O5Ck?fs=1&amp;hl=en_US&amp;rel=0
 *   http://www.youtube.com/watch?v=ls7NMH_O5Ck#t=0m10s
 *   http://www.youtube.com/embed/ls7NMH_O5Ck?rel=0
 *   http://www.youtube.com/watch?v=ls7NMH_O5Ck
 *   http://youtu.be/ls7NMH_O5Ck
 *   
 * exemple
 *	 [youtube url=http://youtu.be/ls7NMH_O5Ck]
 */
(function($){
	
	if(!$.shortcode) $.error("Le plugin shortcode est requis");

	// On enregistre un nouveau shortcode sur la page
	$.shortcode.register('youtube', function(attr){
	
		var regexp = /^.*(?:youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?)\??v?=?([^#\&\?]*).*/;
		var video_id = (regexp.exec(attr.url||"")||[])[1];
		
		if(!video_id) return false;
		
		return $('<iframe>').attr({
			width : attr.width || 420,
			height : attr.height || 315,
			src : '//www.youtube.com/embed/' + video_id,
			frameborder : 0,
			allowfullscreen : true
		});
		
	});
	
})(window.jQuery);