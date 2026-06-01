<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinir senha</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f2f4f6;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #374151;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 24px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }
        h1 {
            font-size: 24px;
            margin-bottom: 16px;
        }
        p {
            line-height: 1.6;
            margin: 16px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
        }
        .footer {
            font-size: 14px;
            color: #374151;
            margin-top: 24px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Redefinir senha</h1>
        <p>Olá {{ $user->name ?? 'usuário' }},</p>
        <p>Recebemos uma solicitação para redefinir a sua senha. Clique no botão abaixo para criar uma nova senha.</p>
        <p style="text-align: center;">
            <a href="{{ env("APP_URL") }}/password/reset/{{ $token }}" class="button">Redefinir senha</a>
        </p>
        <p>Se você não solicitou essa alteração, pode ignorar este e-mail. O link expira em breve.</p>
        <p class="footer">Atenciosamente,<br>Equipe de Suporte</p>
    </div>
</body>
</html>
