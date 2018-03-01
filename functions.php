<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

require_once(get_template_directory() . "/functions/SzSetup.php");
require_once(get_template_directory() . "/functions/Saleszone.php");
new SzSetup();
