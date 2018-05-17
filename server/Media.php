<?php

class Media {
	private $imageId = null;
	private $size = null;

	public function __construct( $attachment_id, $size = 'thumbnail' ) {
		$this->imageId = (int) $attachment_id;
		$this->size    = $size;
	}

	public function getImage() {
		$image = wp_get_attachment_image_src( $this->imageId, $this->size );
		if ( $image ) {
			list( $src, $width, $height ) = $image;

			$srcset = $this->getSrcSet( $this->imageId, $src, $width, $height );

			return [
				'src'    => $src,
				'width'  => $width,
				'height' => $height,
				'srcset' => $srcset
			];
		}
	}

	private function getSrcSet( $attachment_id, $src, $width, $height ) {

		$image_meta = wp_get_attachment_metadata( $attachment_id );
		$attr       = [];

		if ( is_array( $image_meta ) ) {
			$size_array = array( absint( $width ), absint( $height ) );
			$srcset     = wp_calculate_image_srcset( $size_array, $src, $image_meta, $attachment_id );
			$sizes      = wp_calculate_image_sizes( $size_array, $src, $image_meta, $attachment_id );

			if ( $srcset && ( $sizes || ! empty( $attr['sizes'] ) ) ) {
				$attr['srcset'] = $srcset;
			}
		}

		return $attr['srcset'];
	}
}