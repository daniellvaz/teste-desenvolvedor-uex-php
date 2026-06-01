<?php

namespace Tests\Feature\Contact;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteContactTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Contact $contact;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            'password' => bcrypt('password123'),
        ]);

        $this->contact = Contact::factory()->create([
            'user_id' => $this->user->id,
        ]);
    }

    /**
     * Testa a deleção bem-sucedida de um contato com senha correta.
     */
    public function test_should_delete_contact_with_correct_password()
    {
        $response = $this->actingAs($this->user)->deleteJson(
            "/api/contacts/{$this->contact->id}",
            ['password' => 'password123']
        );

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Contato deletado com sucesso',
            ]);

        $this->assertDatabaseMissing('contacts', [
            'id' => $this->contact->id,
        ]);
    }

    /**
     * Testa a rejeição da deleção com senha incorreta.
     */
    public function test_should_reject_delete_with_incorrect_password()
    {
        $response = $this->actingAs($this->user)->deleteJson(
            "/api/contacts/{$this->contact->id}",
            ['password' => 'wrongpassword']
        );

        $response->assertStatus(422)
            ->assertJsonValidationErrors('password');

        $this->assertDatabaseHas('contacts', [
            'id' => $this->contact->id,
        ]);
    }

    /**
     * Testa a rejeição quando senha não é fornecida.
     */
    public function test_should_reject_delete_without_password()
    {
        $response = $this->actingAs($this->user)->deleteJson(
            "/api/contacts/{$this->contact->id}",
            []
        );

        $response->assertStatus(422)
            ->assertJsonValidationErrors('password');

        $this->assertDatabaseHas('contacts', [
            'id' => $this->contact->id,
        ]);
    }

    /**
     * Testa a rejeição quando senha é muito curta.
     */
    public function test_should_reject_delete_with_short_password()
    {
        $response = $this->actingAs($this->user)->deleteJson(
            "/api/contacts/{$this->contact->id}",
            ['password' => '123']
        );

        $response->assertStatus(422)
            ->assertJsonValidationErrors('password');

        $this->assertDatabaseHas('contacts', [
            'id' => $this->contact->id,
        ]);
    }
}
