<?php

namespace App\Http\Controllers\Api\Contact;

use App\Models\Contact;
use App\Http\Controllers\Controller;
use Dedoc\Scramble\Attributes\Group;

class ListOneContact extends Controller
{
    /**
     * Lista um unico contato
     *
     * @param Contact $contact
     * @return Contact
     */
     #[Group('Contact')]
    public function __invoke(Contact $contact)
    {
        return $contact;
    }
}
