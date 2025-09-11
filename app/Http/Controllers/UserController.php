<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 15);
        $users = User::select('id','name','email','created_at')->paginate($perPage);

        return response()->json($users);
    }
}
