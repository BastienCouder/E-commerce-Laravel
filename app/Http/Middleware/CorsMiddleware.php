<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $response->header('Access-Control-Allow-Origin', 'http://localhost:5173');
        $response->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT,PATCH, DELETE');
        $response->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
        $response->header('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}