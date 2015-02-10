<?php

/**
 * Implements hook_css_alter().
 * Forces style.css to be included with <link> tag instead of drupals default @import
 * - because browserSync doesn't support @import.
 * Code from: https://www.drupal.org/project/link_css
 */

function gulp_boilerplate_css_alter(&$css) {
  $count = 0;

  foreach ($css as $key => $value) {
    // Skip core files.
    $is_core = (strpos($value['data'], 'misc/') === 0 || strpos($value['data'], 'modules/') === 0);
    if (!$is_core) {
      // This option forces embeding with a link element.
      $css[$key]['preprocess'] = FALSE;
      $count++;
    }
  }

}

// Add functions here


?>
