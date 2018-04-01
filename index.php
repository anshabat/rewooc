<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <?php wp_head(); ?>
    <style>
        :root {
            --main-color: #5280B2;
            --color-gray: #ccc;
            --font-color: <?= get_theme_mod('saleszone2_font_color') ?>;
            --container-width: 1200px;
        }
    </style>
</head>
<body <?php body_class('page'); ?>>

<div id="premmerce"></div>

<?php wp_footer(); ?>
</body>
</html>