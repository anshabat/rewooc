<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <?php wp_head(); ?>
    <style>
        :root {
            --font-family-primary: Helvetica, Arial, sans-serif;
            --font-size: 14px;
            --main-color: #5280B2;
            --color-gray: #ccc;
            --font-color: <?= get_theme_mod('saleszone2_font_color') ?>;
            --container-width: 1200px;
            --link-clolor: #5280b2;
            --headline-bg: #F6F6F6;
            --headline-link-color: #676767;
            --black-color: rgba(0, 0, 0, 0.8);
        }
    </style>
</head>
<body <?php body_class('page'); ?>>

<div id="premmerce"></div>

<?php wp_footer(); ?>
</body>
</html>