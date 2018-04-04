<?php

class Navigation {
	private $position = null;

	public function __construct( $position ) {
		$this->position = $position;
	}

	public function getNav( $allowedKeys = [] ) {
		$locations = get_nav_menu_locations();
		$items     = [];

		if ( ! array_key_exists( $this->position, $locations ) ) {
			return $items;
		}

		$navPosts = wp_get_nav_menu_items( $locations[ $this->position ] );
		$items    = $this->filterPosts( $navPosts, $allowedKeys );

		return $items;
	}

	private function filterPosts( $posts, $keys ) {
		$result = array_map( function ( $post ) use ( $keys ) {
			$items = [];
			foreach ( $keys as $key ) {
				$items[ $key ] = $post->$key;
			}

			return $items ?: $post;
		}, $posts );

		return $result;
	}
}