<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name'=> 'required|string',
            'email'=> 'required|email|string|unique:users,email',
            'password'=> ['required', Password::min(8)]
        ]);
        Log::info('user data created {user}', ['user'=>$data]);

        /** @var \App\Models\User $user */
        $user = User::create([
            'name'=> $data['name'],
            'email'=> $data['email'],
            'password'=> bcrypt($data['password'])
        ]);

        Log::info('created user in database : {user}', ['user'=>$user]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user'=> $user,
            'token'=> $token
        ]);

    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'=> 'required|email|string|exists:users,email',
            'password'=> 'required',
            'remember'=> 'boolean'
        ]);

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if(!Auth::attempt($credentials, $remember))
        {
            return response([
                'error'=> 'unauthorized'
            ], 422);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user'=> $user,
            'token'=> $token
        ]);
    }

}
