<div class="header">
    <div class="head-line">
        <?php
        Saleszone::includeView(
            'components/navigation/navigation.php',
            wp_get_nav_menu_items(get_nav_menu_locations()['header_nav']),
            'szNavigation'
        );
        ?>
    </div>
    <div class="head-body"></div>
    <div class="navigation"></div>
</div>