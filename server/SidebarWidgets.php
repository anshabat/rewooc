<?php

class SidebarWidgets
{
    private static $widgets = [];

    public static function addWidget($sidebar, $widgetData)
    {
        if (!key_exists($sidebar, self::$widgets)) {
            self::$widgets[$sidebar] = [];
        }
        array_push(self::$widgets[$sidebar], $widgetData);
    }

    public static function getWidgets()
    {
        return self::$widgets;
    }
}
