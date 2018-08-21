<?php
Api::addScriptData( 'settings', Settings::getResults() );
Api::addScriptData( 'widgets', Widgets::getResults() );
Api::fetchScriptData();
wp_footer(); ?>
</body>
</html>