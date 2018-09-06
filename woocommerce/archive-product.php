<?php
get_header();

/* Get all shop products. Only for shop page. This is temp case */
$catalog = Products::getInstance()->getProducts();
Api::addScriptData('catalog', $catalog);

get_footer();