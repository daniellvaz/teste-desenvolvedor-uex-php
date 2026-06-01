<?php

namespace App\Http\Controllers\Api\Contact;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ListContactsController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        $query = Contact::where('user_id', $user->id);

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        if ($request->has('cpf')) {
            $query->where('cpf', 'like', '%' . $request->input('cpf') . '%');
        }

        return $query->get();
    }
}
