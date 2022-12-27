<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\UsersController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\TransactionsController;
use App\Http\Controllers\API\BalanceController;
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

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);

Route::middleware('auth:api')->group( function () {
    Route::resource('transactions', TransactionsController::class);
    Route::resource('users', UsersController::class);
    //Route::post('transactions/{transactions}/balance', 'BalanceController@store');
});
