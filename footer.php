<?php
View::addScriptData( 'settings', Settings::getResults() );
View::fetchScriptData();
wp_footer(); ?>
</body>
</html>