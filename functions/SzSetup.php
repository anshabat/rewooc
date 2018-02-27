<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SzSetup
{
    public function __construct()
    {
        add_action('after_setup_theme', [$this, 'removeRedundantAssets']);
        add_action('after_setup_theme', [$this, 'addDefaultFeatures']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueScripts']);
    }

    /**
     * Remove extra styles, scripts and other redundant stuff from wp_head and wp_footer
     */
    public function removeRedundantAssets()
    {
        /* removes the “generator” meta tag from the document header */
        remove_action('wp_head', 'wp_generator');

        /* removes the “wlwmanifest” link. wlwmanifest.xml is the resource file needed to enable support for Windows Live Writer */
        remove_action('wp_head', 'wlwmanifest_link');

        /* The RSD is an API to edit your blog from external services and client */
        remove_action('wp_head', 'rsd_link');

        /* “wp_shortlink_wp_head” adds a “shortlink” into your document head that will look like http://example.com/?p=ID */
        remove_action('wp_head', 'wp_shortlink_wp_head');

        /* Removes a link to the next and previous post from the document header */
        remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);

        /* Removes the generator name from the RSS feeds */
        add_filter('the_generator', '__return_false');

        /*Removes WP 4.2 emoji styles and JS */
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_action('wp_head', 'print_emoji_detection_script', 7);

        /*Disable Embeds header links and javascript from footer */
        remove_action('wp_head', 'wp_oembed_add_discovery_links');
        remove_action('wp_head', 'wp_oembed_add_host_js');
    }

    /**
     * Add CSS Styles and Scripts
     */
    public function enqueueScripts()
    {
        wp_enqueue_script('bundle', get_template_directory_uri() . '/view/build/bundle.js', [], false, true);
    }

    /**
     * Activate Wordpress features
     */
    public function addDefaultFeatures()
    {
        /* Allows to add images to posts */
        add_theme_support('post-thumbnails');

        /* Add logo field to customizer */
        add_theme_support('custom-logo');

        /* Display Menu item and add Menu positions */
        add_theme_support('menus');
        register_nav_menu('header_nav', 'Header');
        register_nav_menu('footer_nav', 'Footer');
        register_nav_menu('mobile_nav', 'Mobile');
        register_nav_menu('catalog_nav', 'Catalog');

        /* Add support for HTML5 */
        add_theme_support('html5');

        /* Woocommerce */
        add_theme_support('woocommerce');
    }
}