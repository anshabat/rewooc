<?php
Api::addScriptData( 'settings', Settings::getResults() );
Api::fetchScriptData();
wp_footer(); ?>
</body>
</html>