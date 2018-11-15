<?php

namespace Rewooc\Customizer;

use Rewooc\Api\Media;

class Customizer {

	public function __construct() {
		add_action( 'customize_register', [ $this, 'addCustomSettings' ] );
	}


	public function addCustomSettings( \WP_Customize_Manager $wp_customize ) {
		$wp_customize->add_panel( get_template(), [
			'title'    => 'ReWooC',
			'priority' => 0,
		] );

		$wp_customize->add_section( get_template() . '_layout', [
			'title'       => 'Temp',
			'panel'       => get_template(),
			'description' => 'ReWooC settings'
		] );

		$wp_customize->add_setting( get_template() . '_font_color', [
			'default' => '#000000'
		] );
		$wp_customize->add_control( new \WP_Customize_Color_Control( $wp_customize, get_template() . '_font_color', [
			'label'   => __( 'Font color', get_template() . '_admin' ),
			'section' => get_template() . '_layout',
		] ) );


		$wp_customize->add_setting( get_template() . '_site_layout', [
			'default' => 'fluid'
		] );
		$wp_customize->add_control( get_template() . '_site_layout', [
			'type'    => 'radio',
			'label'   => 'Site Layout',
			'section' => get_template() . '_layout',
			'choices' => [
				'fluid' => __( 'Full width', get_template() . '_admin' ),
				'boxed' => __( 'Boxed', get_template() . '_admin' )
			],
		] );

		$wp_customize->add_setting(get_template() . '_homepage_layout', [
			'default' => 'no-sidebar'
		]);
		$wp_customize->add_control(get_template() . '_homepage_layout', [
			'type' => 'radio',
			'label' => 'Homepage Layout',
			'section' => get_template() . '_layout',
			'choices' => [
				'no-sidebar' => __( 'No sidebar', get_template() . '_admin' ),
				'sidebar' => __( 'Sidebar', get_template() . '_admin' )
			]
		]);

		$wp_customize->add_setting( get_template() . '_site_phone' );
		$wp_customize->add_control( get_template() . '_site_phone', [
			'label'   => 'Phone',
			'type'    => 'text',
			'section' => 'title_tagline'
		] );
	}

	public static function getMods() {
		$options                = get_theme_mods();
		$options['custom_logo'] = self::getLogo();

		return $options;
	}

	public static function getMode($name) {
		return self::getMods()[get_template() . '_' . $name];
	}

	public static function getLogo() {
		$imageId = get_theme_mod( 'custom_logo' );
		if ( ! $imageId ) {
			return false;
		}

		$logo = new Media($imageId, 'full');
		return $logo->getImage();

	}
}