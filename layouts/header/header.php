<?php
$header_nav = wp_get_nav_menu_items( get_nav_menu_locations()['header_nav'] );
wp_localize_script( 'bundle', 'salesZone', [
	'mainNavigation' => $header_nav
] );
?>

<div class="header">
  <div class="head-line">
    <ul data-sz="nav">

    </ul>
  </div>
  <div class="head-body"></div>
  <div class="navigation"></div>
</div>