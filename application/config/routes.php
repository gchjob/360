<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

Route::root ('main');
Route::get ('/(:id)', 'main@index($1)');
Route::get ('content/(:id)', 'main@content($1)');
Route::get ('login', 'main@login');
Route::post ('login', 'main@signin');
Route::delete ('logout', 'main@logout');
Route::get ('register', 'main@register');
Route::post ('uploads', 'uploads@upload');
Route::get ('edit/(:id)', 'uploads@edit($1)');
Route::put ('/(:id)', 'uploads@update($1)');
Route::delete ('/(:id)', 'uploads@destroy($1)');
