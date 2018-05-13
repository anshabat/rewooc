<?php

class Products
{
    public function __construct() {
        add_action('wc_ajax_rw_search_products', [$this, 'search']);
    }

    public function search()
    {
        $search = wc_clean(stripslashes($_GET['search']));

        if (empty($search)) {
            wp_die();
        }

        $data_store = WC_Data_Store::load('product');
        $ids = $data_store->search_products($search, '', true);

        if (!empty($_GET['limit'])) {
            $ids = array_slice($ids, 0, absint($_GET['limit']));
        }

        $product_objects = array_filter(array_map('wc_get_product', $ids), 'wc_products_array_filter_editable');
        $products = [];
        foreach ($product_objects as $product_object) {
            array_push($products, [
                'id' => $product_object->get_id(),
                'title' => rawurldecode($product_object->get_name()),
                'link' => $product_object->get_permalink(),
                'price' => $product_object->get_price()
            ]);
        }
        wp_send_json($products);
    }
}
new Products();