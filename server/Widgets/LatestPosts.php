<?php

class LatestPosts extends WP_Widget {
	/**
	 * Sets up the widgets name etc
	 */
	public function __construct() {
		parent::__construct( 'rewooc_latest_posts', 'Rewooc Latest posts', [
			'classname'   => 'widget_featured_products',
			'description' => 'Rewooc Latest posts widget is awesome',
		] );
	}

	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		$title = apply_filters( 'widget_title', $instance['title'] );

		$postObjects = get_posts();
		$posts       = [];

		foreach ( $postObjects as $post ) {
			array_push( $posts, Post::objectToArray( $post ) );
		}

		if ( isset( $args['onResult'] ) ) {
			call_user_func( $args['onResult'], [
				'id'        => $args['widget_id'],
				'title'     => $title,
				'component' => 'PostsWidget',
				'layout'    => $instance['layout'],
				'data'      => [
					'posts' => $posts,
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
		$title  = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__( 'New title', 'text_domain' );
		$layout = ! empty( $instance['layout'] ) ? $instance['layout'] : 'card';
		?>
        <p>
            <label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_attr_e( 'Title:', 'text_domain' ); ?></label>
            <input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"
                   name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text"
                   value="<?php echo esc_attr( $title ); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr( $this->get_field_id( 'layout' ) ); ?>"><?php esc_attr_e( 'Layout:', 'text_domain' ); ?></label>
            <select
                    name="<?php echo esc_attr( $this->get_field_name( 'layout' ) ); ?>"
                    id="<?php echo esc_attr( $this->get_field_id( 'layout' ) ); ?>"
            >
                <option value="list" <?php selected( 'list', $layout ); ?>>list</option>
                <option value="card" <?php selected( 'card', $layout ); ?>>card</option>
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
		$instance           = [];
		$instance['title']  = ( ! empty( $new_instance['title'] ) ) ? sanitize_text_field( $new_instance['title'] ) : '';
		$instance['layout'] = ( ! empty( $new_instance['layout'] ) ) ? $new_instance['layout'] : 'card';

		return $instance;
	}
}