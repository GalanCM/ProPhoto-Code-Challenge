<?php
/*
Plugin Name: Challenge Plugin
*/

function challenge_page()
{
    add_menu_page(
        'Challenge',
        'Challenge',
        'manage_options',
        plugin_dir_path(__FILE__) . 'view.php',
        null,
        '',
        100
    );
}
add_action('admin_menu', 'challenge_page');


function make_nonce() {
  $nonce = wp_create_nonce('wp_rest');
  // echo $nonce;
  // echo wp_nonce_url( "index.php/wp-json/wp/v2/posts/", 'edit_title' );
  wp_localize_script( 'bundle', 'nonce', $nonce );
}


if (isset($_GET['page']) && ($_GET['page'] == 'challenge/view.php')) {
  // wp_register_script( 'build', 'path/to/myscript.js' );
  wp_enqueue_script( 'bundle', plugins_url('', __FILE__ ) . '/build/bundle.js', [], 1.0, true);
  add_action('admin_menu', 'make_nonce');
}
?>
