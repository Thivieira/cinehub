<?php

use Illuminate\Http\Request;

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

Route::group(['prefix'=>'movies'], function () {
    Route::get('trending','ApiController@retrieveTrendingMovies');
    Route::get('popular', 'ApiController@retrievePopularMovies');
    Route::get('search', 'ApiController@retrieveSearchedMovies');
});

Route::get('movie/{id}', 'ApiController@retrieveMovieById');

Route::get('configuration', 'ApiController@retrieveImageConfiguration');
