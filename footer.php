<?php
Api::addScriptData( 'widgets', Widgets::getResults() );
Api::fetchScriptData();
wp_footer(); ?>
</body>
</html>