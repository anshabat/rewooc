<?php

class Media {
	private $id = null;
	private $imageSize = null;
	private $imageAlt = null;

	public function __construct( $id, $size = 'thumbnail' ) {
		$this->id        = (int) $id;
		$this->imageSize = $size;
	}

	public function getImage() {
		$image = wp_get_attachment_image_src( $this->id, $this->imageSize );

		if ( ! $image ) {
			return [];
		}

		list( $src, $width, $height ) = $image;

		$responsiveImages = $this->getResponsiveImages( $src, $width, $height );

		return [
			'src'    => $src,
			'width'  => $width,
			'height' => $height,
			'srcset' => $responsiveImages['srcset'],
			'sizes'  => $responsiveImages['sizes'],
			'alt'    => $this->getImageAlt(),
		];

	}

	private function getResponsiveImages( $src, $width, $height ) {

		$imageMeta  = wp_get_attachment_metadata( $this->id );
		$attributes = [
			'srcset' => null,
			'sizes'  => null
		];

		if ( is_array( $imageMeta ) ) {
			$sizeArray = array( absint( $width ), absint( $height ) );
			$srcset    = wp_calculate_image_srcset( $sizeArray, $src, $imageMeta, $this->id );
			$sizes     = wp_calculate_image_sizes( $sizeArray, $src, $imageMeta, $this->id );

			if ( $srcset && $sizes ) {
				$attributes['srcset'] = $srcset;
				$attributes['sizes']  = $sizes;
			}
		}

		return $attributes;
	}

	public function setImageAlt( $alt ) {
		$this->imageAlt = $alt;
	}

	private function getImageAlt() {
		$attachmentAlt = trim( strip_tags( get_post_meta( $this->id, '_wp_attachment_image_alt', true ) ) );

		return $attachmentAlt ?: $this->imageAlt;
	}
}