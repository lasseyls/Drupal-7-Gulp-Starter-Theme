<?php

/**
 * Implements hook_form_system_theme_settings_alter() function.
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function gulp_boilerplate_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {


  //////////////////////////////
  // Remove a bunch of useless theme settings
  //////////////////////////////

  unset($form['theme_settings']['toggle_favicon']);
  //////////////////////////////
  // Logo and Favicon
  //////////////////////////////

  unset($form['logo']);
  unset($form['favicon']); //These are defined in templates/html.tpl.php
}