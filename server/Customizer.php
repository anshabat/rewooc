<?php

class Customizer
{
    public function __construct()
    {
        add_action("customize_register", [$this, "addCustomSettings"]);
    }


    public function addCustomSettings(\WP_Customize_Manager $wp_customize)
    {
        $wp_customize->add_panel(get_template(), [
            "title" => "Saleszone",
            "priority" => 0,
        ]);

        $wp_customize->add_section(get_template() . "_layout", [
            "title" => "Temp",
            "panel" => get_template(),
            "description" => "Saleszone settings"
        ]);

        $wp_customize->add_setting(get_template() . "_font_color", [
            "default" => "#000000"
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, get_template() . "_font_color", [
            "label" => __("Font color", get_template() . "_admin"),
            "section" => get_template() . "_layout",
        ]));


        $wp_customize->add_setting(get_template() . "_site_layout", [
            "default" => "fluid"
        ]);
        $wp_customize->add_control(get_template() . "_site_layout", [
            "type" => "radio",
            "label" => "Site Layout",
            "section" => get_template() . "_layout",
            "choices" => array(
                "fluid" => __("Full width", get_template() . "_admin"),
                "boxed" => __("Boxed", get_template() . "_admin")
            ),
        ]);
    }
}

new Customizer();