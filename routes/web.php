<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('{reactRoutes}', function () {
    return view('welcome');
})->where('reactRoutes', '^((?!api).)*$');

Route::post('/post', 'PostController@store');
Route::post('/category', 'CategoryController@store');
Route::get('/category/all', 'CategoryController@allData');

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
