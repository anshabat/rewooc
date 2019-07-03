<?php

namespace Rewooc\Common;

class Navigation {
	private $position = null;

	public function __construct( $position ) {
		$this->position = $position;
	}

	public function getNav( $allowedKeys = [] ) {

		if ( ! has_nav_menu( $this->position ) ) {
			return [];
		}

		$posts = wp_get_nav_menu_items( get_nav_menu_locations()[ $this->position ] );
		$items = $this->filterPosts( $posts, $allowedKeys );

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