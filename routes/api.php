<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/post', 'PostController@store');
Route::put('/post/{id}', 'PostController@update');
Route::get('/post/all', 'PostController@allPostData');
Route::delete('/post/delete/{id}', 'PostController@destroy');

Route::post('/category', 'CategoryController@store');
Route::put('/category/{id}', 'CategoryController@update');
Route::get('/category/all', 'CategoryController@allData');
Route::delete('/category/delete/{id}', 'CategoryController@destroy');


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
