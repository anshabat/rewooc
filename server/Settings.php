<?php

class Settings {
	static public function getPrice() {
		return [
			'thousandSeparator' => wc_get_price_thousand_separator(),
			'decimalSeparator'  => wc_get_price_decimal_separator(),
			'decimals'          => wc_get_price_decimals(),
			'priceFormat'       => get_woocommerce_price_format(),
			'currencySymbol'    => html_entity_decode( get_woocommerce_currency_symbol() )
		];
	}

	static public function getResults() {
		return [
			'price' => self::getPrice(),
			'baseUrl' => parse_url(site_url(), PHP_URL_PATH)
		];
	}
}