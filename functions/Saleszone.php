<?php

class Saleszone
{
    /**
     * Include template file, pass data to it and create JS data object
     *
     * @param $templatePath - Template file path relative to /view/src/ folder
     * @param array $data - Data passed to the template
     * @param bool $varName - Javascript global variable that stores $data in <script> tags in footer
     */
    public static function includeView($templatePath, $data = [], $varName = false)
    {
        wc_get_template('../view/src/' . $templatePath, [
            'data' => $data
        ]);

        if($varName) {
            wp_localize_script('bundle', $varName, $data);
        }
    }
}