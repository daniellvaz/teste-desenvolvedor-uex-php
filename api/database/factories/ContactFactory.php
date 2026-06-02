<?php

namespace Database\Factories;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'         => fake()->name(),
            'cpf'          => $this->generateCpf(),
            'phone'        => fake()->phoneNumber(),
            'zipCode'      => fake()->postcode(),
            'street'       => fake()->address(),
            'number'       => fake()->randomNumber(),
            'complement'   => fake()->text(20),
            'neighborhood' => fake()->text(10),
            'city'         => fake()->text(10),
            'state'        => fake()->text(10),
            'latitude'     => fake()->latitude(),
            'longitude'    => fake()->longitude(),
            "user_id"      => User::factory()
        ];
    }

    private function generateCpf(): string
    {
        $cpf = [];

        for ($i = 0; $i < 9; $i++) {
            $cpf[$i] = random_int(0, 9);
        }

        $sum = 0;
        for ($i = 0; $i < 9; $i++) {
            $sum += $cpf[$i] * (10 - $i);
        }

        $cpf[9] = (($sum * 10) % 11) % 10;

        $sum = 0;
        for ($i = 0; $i < 10; $i++) {
            $sum += $cpf[$i] * (11 - $i);
        }

        $cpf[10] = (($sum * 10) % 11) % 10;

        return sprintf(
            '%d%d%d.%d%d%d.%d%d%d-%d%d',
            ...$cpf
        );
    }
}
