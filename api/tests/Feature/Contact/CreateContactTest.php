<?php

namespace Tests\Feature\Contact;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CreateContactTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /**
     * Testa a criação de um contato com dados válidos.
     */
    public function test_should_create_contact_with_valid_data()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'João Silva',
            'cpf' => '111.444.777-35',
            'phone' => '(11) 98765-4321',
            'zipcode' => '12345-678',
            'street' => 'Rua Principal',
            'number' => '123',
            'complement' => 'Apartamento 45',
            'neighborhood' => 'Centro',
            'city' => 'São Paulo',
            'state' => 'SP',
            'latitude' => -23.5505,
            'longitude' => -46.6333,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Contato criado com sucesso',
            ]);

        $this->assertDatabaseHas('contacts', [
            'name' => 'João Silva',
            'cpf' => '111.444.777-35',
            'user_id' => $this->user->id,
        ]);
    }

    /**
     * Testa a criação de contato com dados mínimos.
     */
    public function test_should_create_contact_with_minimal_data()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'Maria Santos',
            'cpf' => '123.456.789-09',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Contato criado com sucesso',
            ]);

        $this->assertDatabaseHas('contacts', [
            'name' => 'Maria Santos',
            'cpf' => '123.456.789-09',
            'user_id' => $this->user->id,
        ]);
    }

    /**
     * Testa a rejeição quando nome está vazio.
     */
    public function test_should_reject_when_name_is_empty()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => '',
            'cpf' => '111.444.777-35',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('name');
    }

    /**
     * Testa a rejeição quando CPF está vazio.
     */
    public function test_should_reject_when_cpf_is_empty()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'João Silva',
            'cpf' => '',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('cpf');
    }

    /**
     * Testa a rejeição de CPF inválido.
     */
    public function test_should_reject_invalid_cpf()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'João Silva',
            'cpf' => '111.444.777-36', // CPF com dígito verificador incorreto
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('cpf');
    }

    /**
     * Testa a rejeição de CPF com todos dígitos iguais.
     */
    public function test_should_reject_cpf_with_all_equal_digits()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'João Silva',
            'cpf' => '111.111.111-11',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('cpf');
    }

    /**
     * Testa a rejeição de CPF duplicado.
     */
    public function test_should_reject_duplicate_cpf()
    {
        // Cria um primeiro contato
        $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'João Silva',
            'cpf' => '111.444.777-35',
        ]);

        // Tenta criar outro contato com o mesmo CPF
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'Outro João',
            'cpf' => '111.444.777-35',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('cpf');
    }

    /**
     * Testa a aceitação de CPF sem formatação.
     */
    public function test_should_accept_cpf_without_formatting()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'João Silva',
            'cpf' => '11144477735',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Contato criado com sucesso',
            ]);
    }

    /**
     * Testa a validação de telefone com formato inválido.
     */
    public function test_should_reject_invalid_phone_format()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'João Silva',
            'cpf' => '111.444.777-35',
            'phone' => '1198765432', // Formato inválido
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('phone');
    }

    /**
     * Testa a validação de CEP com formato inválido.
     */
    public function test_should_reject_invalid_zipcode_format()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'João Silva',
            'cpf' => '111.444.777-35',
            'zipcode' => '12345', // Formato inválido
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('zipcode');
    }

    /**
     * Testa a validação de estado com formato inválido.
     */
    public function test_should_reject_invalid_state_format()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'João Silva',
            'cpf' => '111.444.777-35',
            'state' => 'SP123', // Formato inválido
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('state');
    }

    /**
     * Testa a validação de latitude fora do intervalo.
     */
    public function test_should_reject_latitude_out_of_range()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'João Silva',
            'cpf' => '111.444.777-35',
            'latitude' => 95, // Fora do intervalo -90 a 90
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('latitude');
    }

    /**
     * Testa a validação de longitude fora do intervalo.
     */
    public function test_should_reject_longitude_out_of_range()
    {
        $response = $this->actingAs($this->user)->postJson('/api/contacts', [
            'name' => 'João Silva',
            'cpf' => '111.444.777-35',
            'longitude' => 181, // Fora do intervalo -180 a 180
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('longitude');
    }
}
