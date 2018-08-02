<?php

class Widgets
{
    private $widgetsToRegister = [];
    private static $widgetsResults = [];

    public function __construct($widgetsToRegister)
    {
        $this->widgetsToRegister = $widgetsToRegister;
        add_action('widgets_init', [$this, 'registerWidgets']);
        //add_action('widgets_init', [$this, 'registerSidebars']);
    }

    /**
     * Register Custom Rewooc theme widgets
     */
    public function registerWidgets()
    {
        foreach ($this->widgetsToRegister as $widget) {
            register_widget($widget);
        }
    }

    /**
     * Initialize widgets sidebars and custom widgets
     */
    /*public function registerSidebars()
    {
        if (!is_registered_sidebar('homepage_main')) {
            register_sidebar([
                'id' => 'homepage_main',
                'name' => 'Homepage main',
                'onResult' => function ($result) {
                    self::addResult('homepage_main', $result);
                }
            ]);
        }
	    if (!is_registered_sidebar('homepage_sidebar')) {
		    register_sidebar([
			    'id' => 'homepage_sidebar',
			    'name' => 'Homepage sidebar',
			    'onResult' => function ($result) {
				    self::addResult('homepage_sidebar', $result);
			    }
		    ]);
	    }
	    if (!is_registered_sidebar('homepage_sidebar')) {
		    register_sidebar([
			    'id' => 'homepage_sidebar',
			    'name' => 'Homepage sidebar',
			    'onResult' => function ($result) {
				    self::addResult('homepage_sidebar', $result);
			    }
		    ]);
	    }
    }*/

    /**
     * Add widgets result data to Central widgets store
     *
     * @param $sidebar
     * @param $widgetData
     */
    /*public static function addResult($sidebar, $widgetData)
    {
        if (!key_exists($sidebar, self::$widgetsResults)) {
            self::$widgetsResults[$sidebar] = [];
        }
        array_push(self::$widgetsResults[$sidebar], $widgetData);
    }*/

    /**
     * Return array of all widgets results
     *
     * @return array
     */
    /*public static function render()
    {
        return self::$widgetsResults;
    }*/
}