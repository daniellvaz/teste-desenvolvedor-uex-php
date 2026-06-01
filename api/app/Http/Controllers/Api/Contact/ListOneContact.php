<?php

namespace App\Http\Controllers\Api\Contact;

use App\Http\Controllers\Controller;
use App\Models\Contact;

class ListOneContact extends Controller
{
    public function __invoke(Contact $contact)
    {
        return $contact;
    }
}
