<?php

namespace App\Http\Controllers\Api\Authentication;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Dedoc\Scramble\Attributes\Group;

class LogoutController extends Controller
{
    /**
     * Logout do usuário
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    #[Group('Authentication')]
    public function __invoke(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout realizado'
        ]);
    }
}
