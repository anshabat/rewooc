<?php

namespace Rewooc\Common;

class User {
	private $user = null;

	public function __construct() {
		$this->user = WC()->customer;
	}

	public function isLoggedIn() {
		return is_user_logged_in();
	}

	public function getId() {
		return get_current_user_id();
	}

	public function getData() {
		return $this->user->get_data();
	}
}