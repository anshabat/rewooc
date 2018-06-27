<?php
dynamic_sidebar('homepage_main');
dynamic_sidebar('homepage_sidebar');
dump(Widgets::render());
Api::addScriptData( 'widgets', Widgets::render() );
Api::fetchScriptData();
wp_footer(); ?>
</body>
</html>