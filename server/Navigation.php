<?php

class Navigation
{
    private $position = null;

    public function __construct($position)
    {
        $this->position = $position;
    }

    public function getNav($allowedKeys = [])
    {
        $navItems = wp_get_nav_menu_items(get_nav_menu_locations()[$this->position]);
        //TODO доробити метод Filter Items (по publish)
        $filteredItems = $this->filterItemsKeys($navItems, $allowedKeys);
        return $filteredItems;
    }

    private function filterItemsKeys($posts, $keys)
    {
        $result = array_map(function ($post) use ($keys) {
            $items = [];
            foreach ($keys as $key) {
                $items[$key] = $post->$key;
            }
            return $items ?: $post;
        }, $posts);

        return $result;
    }
}