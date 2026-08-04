Contexto: conceito Host vs Guest na API Deskly

A API passou por um refactor onde quase todo endpoint autenticado agora existe em duas versões, de acordo com o papel que o usuário está exercendo: guest (quem busca/reserva workspaces) e host (quem é dono de workspace e recebe reservas/pagamentos/avaliações). Preciso que o frontend saiba, a partir do usuário logado, quando ele pode operar como host e direcionar as chamadas certas.

1. Modelo de dados

Cada usuário tem um campo booleano is_host (tabela user, migration V3__add_is_host_to_user.sql). Um mesmo usuário pode ser guest e host ao mesmo tempo — is_host = true não desliga o modo guest, só habilita o modo host. Pense no padrão "Switch to hosting" do Airbnb: é uma troca de contexto na UI, não uma conta separada.

is_host vem no UserResponse, retornado dentro da resposta de login:

POST /public/api/v1/auth/authenticate
Body: { "idToken": "<firebase-id-token>" }

Response:
{
"accessToken": "...",
"refreshToken": "...",
"expiresIn": 3600,
"user": {
"id": "...",
"name": "...",
"email": "...",                                                                                                                                                                                                                                                                                            "phone_number": "...",
"is_host": true | false                                                                                                                                                                                                                                                                                  }
}                                                                                                                                                                                                                                                                                                          
O que o front precisa fazer: guardar is_host no estado da sessão após o login. Se false, nem mostrar a opção de alternar para modo host. Se true, mostrar o switch guest/host na UI (esse "modo atual" é 100% client-side — o backend não guarda "em qual modo o usuário está agora", só valida se ele tem permissão de host a cada chamada).

Existe também um campo is_admin, mas ele é totalmente invisível pela API — não aparece em nenhum request/response, só é setado manualmente. Não precisa (e não tem como) construir nenhuma UI em cima disso neste app.

2. Autenticação

Todas as chamadas (exceto /public/** e /actuator/**) exigem:
Authorization: Bearer <accessToken>

3. Perfil do usuário logado

- GET /api/v1/users/me — retorna o UserResponse atualizado do usuário logado (id, name, email, phone_number, is_host). Use isso pra re-sincronizar o estado da sessão sempre que precisar (ex: depois de reabrir o app), em vez de confiar só no snapshot do login.
- PUT /api/v1/users/{userId} — update de perfil, incluindo is_host. Um usuário só pode atualizar a própria conta (userId no path == id do ro id retorna 403. Isso significa que o fluxo "tornar-se host" já está disponível: basta o front chamar PUT /api/v1/users/{seuPróprioId}com { "is_host": true } no corpo. Depois disso, chame GET /api/v1/me (ou refaça login) pra atualizar o estado local com o novo is_host.

Body de UpdateUserRequest:
{
"name": "...",
"phone_number": "...",
"is_host": true
}
Todos os campos são opcionais — mande só o que quer alterar.

4. Mapa de endpoints por domínio
http://localhost:8080/swagger-ui/index.html

Fora desse padrão:
- POST /public/api/v1/auth/authenticate — compartilhado, sem papel.
- GET /api/v1/users/me — self-service, qualquer usuário autenticado.
- /api/v1/users/{userId} (PUT/GET/DELETE) — self-or-admin: liberado pro próprio usuário mexer na própria conta, ou pra um admin mexer em qly como antes.
- GET /api/v1/users (lista) e /api/v1/amenities/** (tudo) — esses sim são admin-only. Não construir UI de usuário final em cima deles; são painéis internos.

5. Tratamento de erros

- 403 em endpoint /host/**: o usuário não tem is_host = true. Trate como "não é host" — sinal pra voltar pro modo guest / esconder a opção de hosting.
- 403 em /api/v1/users/{userId} ou /api/v1/amenities/**: fora do fluxo normal de usuário final (o primeiro só acontece tentando editar con nem deveria ter tela no app). Trate como acesso negado genérico.
- 403 em recurso individual guest (ex: GET /guest/reservations/{id} de uma reserva de outro usuário): é checagem de ownership, não de papel. Também acesso negado genérico — não deveria acontecer via UI normal, só via manipulação de URL/ID.

6. Gaps conhecidos no backend

- Lado host de reservas/pagamentos/avaliações é só leitura — não há endpoints de escrita ainda (host confirmar reserva, responder avaliação, etc.). Se o fluxo de produto precisar disso, avisem que a gente prioriza.