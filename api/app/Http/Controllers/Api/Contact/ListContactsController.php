<?php

namespace App\Http\Controllers\Api\Contact;

use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\QueryParameter;

class ListContactsController extends Controller
{
    /**
     * Listar os contatos cadastrado
     *
     * @param Request $request
     * @return void
     */
    #[Group('Contact')]
    #[QueryParameter("name", type: "string", description: "Busca contatos pelo nome")]
    #[QueryParameter("cpf", type: "string", description: "Busca contatos pelo cpf")]
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

        $result = $query->get();

        return $result;
    }
}
