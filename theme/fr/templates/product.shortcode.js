/**
 * Shortcode Product
 * Permet l'intégration d'un encart produit avec bouton ajouter au panier
 * 
 * attributs du shortcode
 *  - id identifiant unique du produit
 * 
 * exemple
 *	 [product id=45]
 */
jQuery(function($){

	'use strict';

	$.shortcode || $.error("Le plugin shortcode.js est requis");
	$.isFunction(render_product) || $.error("Le template 'render_product' est requis");
	(kiubi && kiubi.catalog) || $.error("Le client API kiubi est requis");
	
	// On enregistre un nouveau shortcode sur la page
	$.shortcode.register('product', function(attr){
		
		if(!attr.id) return false;
		
		var $container = $('<div>');
		
		kiubi.catalog.getProduct(attr.id, {extra_fields:'price_label,variants,description'}).done(function(meta, data){
			var product = render_product(data, {affichage:'l'});
			$container.addClass('inline_product');
			$container.append(product);
		});
		
		return $container;
	});

});