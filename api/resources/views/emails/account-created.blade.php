<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Conta criada</title>
</head>
<body>
    <h1>Olá, {{ $user->name }}!</h1>

    <p>Sua conta foi criada com sucesso.</p>

    <p>
        Você já pode acessar a plataforma utilizando seu e-mail:
        <strong>{{ $user->email }}</strong>
    </p>

    <p>Obrigado por utilizar nosso sistema.</p>
</body>
</html>
