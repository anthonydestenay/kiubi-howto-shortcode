/**
 * Shortcode form
 * Permet l'intégration d'un formulaire kiubi dismoi?
 * 
 * attributs du shortcode
 *  - key Clé unique du formulaire
 * 
 * exemple
 *	 [form key='x-xxxxxxxxxxxxxxx']
 */
(function($){
	
	'use strict';
	
	$.shortcode || $.error("Le plugin shortcode.js est requis");
	(kiubi && kiubi.forms) || $.error("Le client API kiubi est requis");
	
	// On enregistre un nouveau shortcode sur la page
	$.shortcode.register('form', function(attr){
		
		if(!attr.key) return false;
		
		var $form = $('<form>');

		kiubi.forms.get(attr.key).done(function(meta, APIForm){

			var $container = $('<div>').appendTo($form);
			createForm(APIForm.fields, $container);

			$('<input>', {type: "submit"}).appendTo($form);

			$form.submit(function(event){
				// empêche la soumission réelle du formulaire
				// HTML sous Internet Explorer
				event.preventDefault(); 

				var $form = $(this);
				var submit = kiubi.forms.submit(attr.key, $form);
				submit.done(function(meta, data){
					$form.replaceWith(data.message);
				});
				submit.fail(function(meta, error, data){
					//console.debug(meta, error, data);
					$('input, textarea, select', $form).removeClass('erreur');
					$('div.erreurs', $form).remove();

					if(data && data.new_captcha) {
						// un nouveau captcha à été généré pour ce formulaire
						$('[name=captcha]', $form).val("");
						$('label[for=captcha]', $form).html(data.new_captcha+'&nbsp;*');
					}

					var info_box = $('<div>', {'class':'erreurs'});
					info_box.insertBefore($container);
					info_box.append(error.message);

					$.each(error.fields, function(){
						$('[name="'+this.field+'"]', $form).addClass('erreur');
						info_box.append("<br>" + this.message);
					});

				});

				return false;
			});
		});

		return $form;

	});

})(window.jQuery);