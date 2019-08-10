<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Http;

class ApiController extends Controller
{

    public $http;
    private $_api_key;

    public function __construct(Http $HttpService) {
        $this->http = $HttpService;
        $this->_api_key = env('TMDB_API_KEY') ?? '1f54bd990f1cdfb230adb312546d765d';
    }

    public function retrieveImageConfiguration()
    {
      $configuration = $this->http->guzzleGet("configuration?"."api_key=".$this->_api_key);

      return response($configuration)->header('Content-Type', 'application/json');
    }

    public function retrieveLatestsMovies(Request $request)
    {
      $lang = 'en-US';
      $page = 1;

      if ($request->filled('lang')) {
          $lang = $request->lang;
      }

      if ($request->filled('page')) {
          $page = $request->page;
      }

      $movies = $this->http->guzzleGet("movie/popular?"."api_key=".$this->_api_key."&language={$lang}&page={$page}");

      return response($movies)->header('Content-Type', 'application/json');
    }
}
