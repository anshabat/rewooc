<?php
//dynamic_sidebar('homepage_main');
//dynamic_sidebar('homepage_sidebar');
//Api::addScriptData( 'widgets', Widgets::render() );
Sidebar::addSidebar('homepage_main', 'Homepage main');
Sidebar::addSidebar('homepage_sidebar', 'Homepage sidebar');
Sidebar::registerSidebars();

Api::fetchScriptData();
wp_footer(); ?>
</body>
</html>