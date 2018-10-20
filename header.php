<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?php bloginfo( 'name' ); ?><?php wp_title(); ?></title>
    <meta name="description" content="<?php bloginfo( 'description' ); ?>">
	<?php wp_head(); ?>
    <style>
        :root {
            --font-family-primary: Helvetica, Arial, sans-serif;
            --font-size: 14px;
            --main-color: #5280B2;
            --secondary-color: #D31647;
            --color-gray: #7f8c8d;
            --font-color: <?= get_theme_mod('rewooc_font_color') ?>;
            --container-width: 1200px;
            --link-clolor: #5280b2;
            --headline-bg: #F8F8F8;
            --header-main-bg: #FAFAFA;
            --headline-link-color: #676767;
            --black-color: rgba(0, 0, 0, 0.8);
            --form-field-border-color: #D2D2D2;
        }
    </style>
</head>
<body <?php body_class( 'page' ); ?>>
<div id="rewooc"></div>

<?php

$headerNav      = new Navigation( 'header_nav' );
$headerNavItems = $headerNav->getNav( [ 'ID', 'title', 'menu_item_parent', 'url' ] );
View::addScriptData( 'headerNavigation', $headerNavItems );

$themeCustomizer = Customizer::getInstance();
$themeMods       = $themeCustomizer->getMods();
View::addScriptData( 'themeMods', $themeMods );


WC()->cart->empty_cart();
$cart     = new Cart();
$cartData = $cart->getData();
View::addScriptData( 'cart', $cartData );