<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'max:255']
        ]);

        if (! Auth::attempt($attributes)) {
            return back()
                ->withErrors(['password' => 'We were unable to authenticate with the provided credentials'])
                ->withInput();
        }

        $request->session()->regenerate();

        return redirect('/movies/index')->with('success', 'You are now logged in.');
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
