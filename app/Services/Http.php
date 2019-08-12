<?php

namespace App\Services;

use \GuzzleHttp\Client;

class Http {

    const API_URL = 'https://api.themoviedb.org/3/';
    const CACHE_EXPIRATION_TIME = 1440;

    public function guzzleGet($query, $headers = [], $ajax=false)
    {
        $url = self::API_URL . $query;
        try {

           $client = new \GuzzleHttp\Client(['timeout'  => 60.0]);

            $headers = $headers;

            $request = new \GuzzleHttp\Psr7\Request('GET', $url, $headers);
            $promise = $client->sendAsync($request);

            return $promise->wait()->getBody()->getContents();

        } catch (\Exception $e) {
            // if(!$ajax){
            //     if($e->getCode() !== 404) {
            //         app('sentry')->captureMessage('STAGE 1 - GUZZLEGET URL:' . $url);
            //         app('sentry')->captureException($e, array(
            //             'tags' => array('canal' => 'GRADUACAO CONTROLLER')
            //         ));
            //     }
            // }
            return null;
        }
    }

}
