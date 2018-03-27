<?php

class Customizer
{
    public function __construct()
    {
        add_action('customize_register', [$this, 'addCustomSettings']);
    }


    public function addCustomSettings(\WP_Customize_Manager $wp_customize)
    {
        $wp_customize->add_setting('font_color', [
            'default' => '#000000'
        ]);
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'font_color', [
            'label' => __('Font color', get_template() . '_admin'),
            'section' => 'title_tagline',
            'settings' => 'font_color',
        ]));


        $wp_customize->add_setting('show_banner', [
            'default' => '1',
            'sanitize_callback' => 'wc_string_to_bool'
        ]);
        $wp_customize->add_control('show_banner', [
            'type' => 'radio',
            'label' => 'Show Banner',
            'section' => 'title_tagline',
            'choices' => array(
                '1' => __('Yes', get_template() . '_admin'),
                '0' => __('No', get_template() . '_admin')
            ),
        ]);
    }
}
new Customizer();