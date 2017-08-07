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

wp_enqueue_script( 'bundle', plugins_url('', __FILE__ ) . '/build/bundle.js', [], 1.0, true);

?>
