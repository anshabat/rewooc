<?php

namespace Rewooc\Common;

use \WP_User;

class User {
	private $user = null;

	public function __construct( WP_User $user ) {
		$this->user = $user;
	}

	public function isLoggedIn() {
		return is_user_logged_in();
	}

	public function getId() {
		return get_current_user_id();
	}

	public function getData() {
		return [
			'id'          => $this->getId(),
			'firstName'   => $this->user->first_name,
			'displayName' => $this->user->display_name,
			'lastName'    => $this->user->last_name,
			'email'       => $this->user->user_email
		];
	}
}