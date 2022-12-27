<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;

class UsersController extends BaseController
{
    public function index()
    {
        $users = User::all();
        return $this->sendResponse($users, 'Users Retrieved Successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        if (is_null($user)) {
            return $this->sendError('User Not Found.');
        }

        return $this->sendResponse($user, 'User Retrieved Successfully');
    }
}
