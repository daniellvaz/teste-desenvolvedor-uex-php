<?php

namespace App\Http\Controllers\Api\Account;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Dedoc\Scramble\Attributes\Group;

class DeleteAccountController extends Controller
{
    /**
     * Deleta a conta do usuario
     *
     * @param Request $request
     * @return void
     */
    #[Group("Account")]
    public function __invoke(Request $request)
    {
        $user = $request->user();

        User::destroy($user->id);
    }
}
