<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\SearchController;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/address', [AddressController::class,'address'] );
Route::post('/address/create', [AddressController::class,'create']);
Route::get('/address/{id}', [AddressController::class,'show']);
Route::delete('/address/{id}', [AddressController::class,'destroy']);
Route::put('/address/{id}', [AddressController::class,'update']);


Route::get('/search', [SearchController::class, 'index']);