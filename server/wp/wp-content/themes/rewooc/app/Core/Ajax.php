<?php

namespace Rewooc\Core;

use Rewooc\Shop\Cart;
use Rewooc\Shop\Checkout\CheckoutAPI;
use Rewooc\Shop\Products;

class Ajax
{
    private $endpoints = [
        'wc_ajax_rewooc_search_products' => [Products::class, 'search'],
        'wc_ajax_rewooc_add_to_cart' => [self::class, 'addToCart'],
        'wc_ajax_rewooc_delete_from_cart' => [self::class, 'deleteFromCart'],
        'wc_ajax_rewooc_set_cat_product_quantity' => [self::class, 'setCartProductQuantity'],
        'wc_ajax_rewooc_get_common_data' => [View::class, 'renderCommonData'],
        'wc_ajax_rewooc_get_current_user' => [self::class, 'getCurrentUser'],
        'wc_ajax_rewooc_fetch_checkout_data' => [CheckoutAPI::class, 'fetchCheckoutData']
    ];

    public function __construct()
    {
        foreach ($this->endpoints as $endpoint => $method) {
            add_action($endpoint, $method);
        }
    }

    public static function addToCart()
    {
        $productId = absint($_POST['productId']);
        $quantity = absint($_POST['quantity']);

        $cartItem = Cart::addToCart($productId, $quantity);

        if ($cartItem) {
            View::responseSuccess($cartItem);
        } else {
            View::responseError();
        }
    }

    public static function deleteFromCart()
    {
        $productKey = wc_clean($_POST['productKey']);

        if (!$productKey) {
            return;
        }

        if (Cart::deleteCartItem($productKey)) {
            View::responseSuccess();
        } else {
            View::responseError();
        }
    }

    public static function setCartProductQuantity()
    {
        $productKey = isset($_POST['productKey']) ? wc_clean($_POST['productKey']) : null;
        $quantity = isset($_POST['quantity']) ? absint($_POST['quantity']) : 1;

        if (!$productKey) {
            return;
        }

        $cartItem = Cart::setProductQuantity($productKey, $quantity);

        if (is_array($cartItem)) {
            View::responseSuccess($cartItem);
        } else {
            View::responseError();
        };

    }

    public static function getCurrentUser()
    {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $user = wp_authenticate($username, $password);

        if (is_wp_error($user)) {
            View::responseError();
        }

        $token = "Basic " . base64_encode($username . ":" . $password);

        View::responseSuccess($token);
    }
}