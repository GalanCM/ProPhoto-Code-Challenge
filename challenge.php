<?php
/*
Plugin Name: Challenge Plugin
*/

function challenge_page()
{
    add_menu_page(
        "Galan's Plugin",
        "Galan's Plugin",
        'manage_options',
        plugin_dir_path(__FILE__) . 'view.php',
        null,
        'dashicons-thumbs-up',
        100
    );
}
add_action('admin_menu', 'challenge_page');


function make_nonce() {
  $nonce = wp_create_nonce('wp_rest');
  wp_localize_script( 'bundle', 'nonce', $nonce );
}


if (isset($_GET['page']) && ($_GET['page'] == 'challenge/view.php')) {
  wp_enqueue_script( 'bundle', plugins_url('', __FILE__ ) . '/build/bundle.js', [], 1.0, true);
  add_action('admin_menu', 'make_nonce');
}
?>
