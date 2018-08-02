<?php

class RwProducts extends WP_Widget {
	/**
	 * Sets up the widgets name etc
	 */
	public function __construct() {
		parent::__construct(
			'rewooc_featured_products',
			'Rewooc Featured product',
			[
				'classname'   => 'widget_featured_products',
				'description' => 'Rewooc Featured widget is awesome',
			]
		);
	}

	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {

		$title = apply_filters( 'widget_title', $instance['title'] );

		$products = Products::getInstance()->getProducts( [
			'featured' => true
		] );

		if ( isset( $args['onResult'] ) ) {
			call_user_func( $args['onResult'], [
				'id'        => $args['widget_id'],
				'title'     => $title,
				'component' => 'ProductsWidget',
				'widgetLayout'  => $instance['widgetLayout'],
				'data'      => [
					'products' => $products,
				],
			] );
		}
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
		// outputs the options form on admin
		$title    = isset( $instance['title'] ) ? $instance['title'] : esc_html__( 'New title', 'rewooc' );
		$widgetLayout = isset( $instance['widgetLayout'] ) ? $instance['widgetLayout'] : 'list_horizontal';
		?>
        <p>
            <label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
				<?php esc_attr_e( 'Title:', 'rewooc' ); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"
                   name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text"
                   value="<?php echo esc_attr( $title ); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr( $this->get_field_id( 'widgetLayout' ) ); ?>"><?php esc_attr_e( 'Widget layout:', 'rewooc' ); ?></label>
            <select
                    name="<?php echo esc_attr( $this->get_field_name( 'widgetLayout' ) ); ?>"
                    id="<?php echo esc_attr( $this->get_field_id( 'widgetLayout' ) ); ?>"
            >
                <option value="list_horizontal" <?php selected( 'list_horizontal', $widgetLayout ); ?>>
                    <?php esc_attr_e( 'List horizontal', 'rewooc' ); ?>
                </option>
                <option value="list_vertical" <?php selected( 'list_vertical', $widgetLayout ); ?>>
	                <?php esc_attr_e( 'List vertical', 'rewooc' ); ?>
                </option>
                <option value="carousel" <?php selected( 'carousel', $widgetLayout ); ?>>
	                <?php esc_attr_e( 'Carousel', 'rewooc' ); ?>
                </option>
            </select>
        </p>
		<?php
	}

	/**
	 * Processing widget options on save
	 *
	 * @param array $new_instance The new options
	 * @param array $old_instance The previous options
	 *
	 * @return array
	 */
	public function update( $new_instance, $old_instance ) {
		// processes widget options to be saved
		$instance             = [];
		$instance['title']    = ( isset( $new_instance['title'] ) ) ? sanitize_text_field( $new_instance['title'] ) : '';
		$instance['widgetLayout'] = ( isset( $new_instance['widgetLayout'] ) ) ? $new_instance['widgetLayout'] : 'list_horizontal';

		return $instance;
	}
}