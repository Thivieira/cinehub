<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Http;

class ApiController extends Controller
{

    public $http;

    public function __construct(Http $HttpService) {
        $this->http = $HttpService;
    }

    public function retrieveImageConfiguration()
    {
      $configuration = $this->http->guzzleGet("configuration?"."api_key=".env('TMDB_API_KEY'));

      return response($configuration)->header('Content-Type', 'application/json');
    }

    public function retrieveLatestsMovies(Request $request)
    {
      $lang = 'pt-BR';
      $page = 1;

      if ($request->filled('lang')) {
          $lang = $request->lang;
      }

      if ($request->filled('page')) {
          $page = $request->page;
      }

      $movies = $this->http->guzzleGet("movie/popular?"."api_key=".env('TMDB_API_KEY')."&language={$lang}&page={$page}");

      return response($movies)->header('Content-Type', 'application/json');
    }
}
