<?php

use Rewooc\Api\Settings;
use Rewooc\Api\View;

View::addScriptData( 'settings', Settings::getResults() );
View::fetchScriptData();
wp_footer(); ?>
</body>
</html>