# Deskly Frontend

Documento de referência para desenvolvimento do frontend do Deskly: produto, stack, arquitetura e identidade visual adotada.

## 1. Produto

Deskly é uma plataforma de reserva de workspaces — o "Airbnb de espaços para trabalho". O usuário reserva locais para trabalhar por hora ou por dia:

- Home offices
- Coworkings
- Escritórios privados
- Salas de reunião
- Cafés preparados para trabalho remoto

**Público-alvo:** profissionais remotos, freelancers, desenvolvedores, designers e empreendedores que precisam de um bom ambiente para trabalhar fora de casa.

**Papéis de usuário:** todo usuário pode ser *guest* (quem busca/reserva) e, opcionalmente, também *host* (quem anuncia um espaço e recebe reservas). Ver [`frontend-guestHostConcept.md`](./frontend-guestHostConcept.md) para o conceito original de modelo de dados e autorização por papel — mas para o **shape exato de request/response de cada endpoint, o Swagger (`/v3/api-docs` ou `/swagger-ui/index.html` do backend) é a fonte mais confiável e atualizada**, ver seção 7.

## 2. Stack tecnológica

- **React 19** — biblioteca de UI
- **TypeScript** — tipagem estática
- **Vite** — build tool e dev server
- **React Router v7** — roteamento
- **TanStack Query** — data fetching e cache
- **Axios** — cliente HTTP
- **Tailwind CSS** — estilização utilitária
- **shadcn/ui** (Radix + CVA) — componentes de UI
- **Lucide Icons** — ícones
- **Firebase Auth** — autenticação (email/senha e Google), trocada por um token de sessão próprio da API
- **ESLint + Prettier** — lint e formatação

## 3. Arquitetura

Camadas, do mais próximo da rede ao mais próximo da tela:

```
API layer       → src/api/api.ts             (instância Axios, interceptor de auth)
Service layer   → src/services/*.service.ts  (chamadas de API, uma função por operação)
Type layer      → src/types/*.ts             (DTOs da API + mappers para tipos de domínio)
State/Context   → src/context/*.tsx          (estado de sessão + papel ativo, ex: AuthContext)
Page layer      → src/pages/*.tsx            (telas roteadas)
Component layer → src/components/            (UI reutilizável; components/ui = shadcn)
```

### Estrutura de pastas

```
src/
  api/
    api.ts                        # instância Axios + interceptor que injeta Bearer token
  components/
    ui/                           # componentes shadcn/ui (button, card, input...)
    AppHeader.tsx                 # header global: nav, switch guest/host, conta
    AppFooter.tsx
    ProtectedRoute.tsx            # exige isAuthenticated
    PublicOnlyRoute.tsx           # exige !isAuthenticated (login/signup/home)
    HostRoute.tsx                 # exige isAuthenticated + user.isHost
    WorkspaceCard.tsx             # card reutilizável (Home, WorkspacesList)
    WorkspaceIllustration.tsx     # ilustração SVG própria (padrão da identidade)
    EmailPasswordLoginForm.tsx / EmailPasswordSignUpForm.tsx / GoogleSignInButton.tsx
  context/
    AuthContext.tsx               # sessão de auth + activeRole (guest|host) + detecção de conta nova
  firebase/
    firebase.ts                   # inicialização do Firebase app
  lib/
    utils.ts                      # cn() — helper clsx + tailwind-merge
    token-storage.ts              # persistência da sessão (localStorage)
    role-storage.ts               # persistência do papel ativo (guest|host, localStorage)
  pages/
    Home.tsx / Login.tsx / SignUp.tsx
    EditProfile.tsx               # mode="onboarding" (/perfil/completar) | "settings" (/perfil/editar)
    WorkspacesList.tsx / WorkspaceDetail.tsx   # catálogo público (guest)
    host/
      HostWorkspacesList.tsx      # meus workspaces
      HostWorkspaceForm.tsx       # mode="create" | "edit"
      HostWorkspacePhotos.tsx     # gerenciar fotos de um workspace
  services/
    auth.service.ts               # POST /public/api/v1/auth/authenticate
    user.service.ts                # GET /api/v1/users/me, PUT /api/v1/users/{id}
    workspace.service.ts           # público: list/getById/listPhotos
    host-workspace.service.ts      # host: list/getById/create/update/remove
    host-workspace-photo.service.ts # host: create/update/remove de fotos
  types/
    auth.ts / user.ts
    pagination.ts                  # PageResponseDto<T> + mapPage genérico
    workspace.ts / workspace-photo.ts
  showcase/                        # protótipos de identidade visual (ver seção 6)
  App.tsx                          # rotas
  main.tsx                         # entry point
  index.css                        # estilos globais + tokens shadcn (CSS vars)
```

### Convenções

- Alias de import `@/*` aponta para `src/*` (configurado em `tsconfig.json` e `vite.config.ts`).
- DTOs da API (snake_case, formato do backend) ficam isolados em `types/*.ts` e são convertidos para tipos de domínio (camelCase) via função `mapX`. Componentes e services nunca devem falar DTO diretamente — sempre o tipo de domínio.
- `api.ts` já injeta `Authorization: Bearer <accessToken>` via interceptor lendo de `token-storage`; services não devem montar esse header manualmente.
- Variáveis de ambiente: `VITE_API_BASE_URL` e credenciais Firebase (`VITE_FIREBASE_*`), com `.env.development` / `.env.production` diferentes por modo do Vite (ver `.env.example`).
- Endpoints guest (`/public/api/v1/...`) não exigem auth; endpoints host (`/api/v1/host/...`) exigem `user.isHost === true` no papel ativo — sempre checar o Swagger antes de assumir um path (ver seção 7).

## 4. Identidade visual — decisão

Foram exploradas 5 direções visuais em `src/showcase/` (ver seção 6). **A direção escolhida para seguir em frente é a Landing 05 — "SaaS Startup" (cards & ilustrações)**, e os tokens já foram promovidos para o tema global (`tailwind.config.js` + `src/index.css`) — não são mais CSS local do showcase.

### Tokens

**Cor** (classes Tailwind já configuradas)
| Classe | Hex | Uso |
|---|---|---|
| `bg-indigo` / `text-indigo` | `#4F46E5` | Cor primária — CTAs, links ativos, ícones de destaque (também é `--primary`) |
| `bg-lime` / `text-lime` | `#A3E635` | Acento secundário — badges, rating, contraponto ao indigo (também é `--accent`) |
| `bg-ink` / `text-ink` | `#0B1220` | Texto principal, fundo do footer (também é `--foreground`) |
| `bg-lavender` | `#F5F6FF` | Fundo de seções alternadas (também é `--secondary`) |
| `text-muted-foreground` | — | Texto secundário (`--muted-foreground`) |

**Tipografia**
- `font-display` → **Outfit** (geométrica, arredondada, pesos 500–800), carregada globalmente via `index.html`
- `font-sans` (padrão do body) → **DM Sans** (pesos 400–700)

**Layout e componentes**
- Cantos bem arredondados: `rounded-2xl` / `rounded-3xl` em cards, `rounded-full` em botões e pills de navegação. `--radius` global é `1rem`.
- Sombras suaves coloridas (`shadow-indigo-200`) em vez de sombras cinza genéricas.
- `.blob-shape` (utilitário global em `index.css`) para thumbnails/decoração orgânica em vez de retângulos puros.
- Ilustração vetorial simples (SVG próprio, sem assets externos) — `WorkspaceIllustration.tsx` é o padrão de referência.
- Micro-interações: hover com `-translate-y` em cards, transições suaves. Showcase tem exemplos de fade/float mais elaborados (`l05-pop`, `l05-float`) se precisar de algo mais expressivo numa seção específica.

## 5. Autenticação e papéis (guest/host)

- Login/signup (email+senha ou Google) trocam o Firebase ID token por uma sessão da API (`authService.authenticate`), persistida em `token-storage`.
- **Detecção de conta nova**: `AuthContext` usa `firebaseUser.metadata.creationTime` — se a conta foi criada há menos de 5 minutos, é tratada como "primeira autenticação" e o app redireciona para `/perfil/completar` em vez de `/workspaces`. Signup por e-mail é sempre tratado como nova conta; login/Google usam a checagem de recência (Google pode criar conta na hora, sem um passo de "signup" explícito).
- **`is_host`** vem do backend (`user.isHost`) e é ativado pelo próprio usuário em `/perfil/editar` (checkbox "Quero anunciar meus espaços" → `PUT /api/v1/users/{id}`).
- **`activeRole` (`guest` | `host`)** é 100% client-side (`lib/role-storage.ts`, localStorage), exatamente como descrito em `frontend-guestHostConcept.md` — o backend nunca sabe "em que modo" o usuário está, só valida `is_host` a cada chamada a `/api/v1/host/**`. Só pode ser `host` se `user.isHost === true`; volta pra `guest` automaticamente se isHost virar `false` ou no logout.
- O switch guest/host fica no `AppHeader` (só aparece se `user.isHost`). `HostRoute` também força `activeRole = 'host'` ao acessar uma URL `/host/**` diretamente, pra manter o header consistente.

## 6. Showcase de identidades (`src/showcase/`)

Mantido no projeto como referência de design, **não é código de produção** e não deve ser importado por telas reais.

- `landing-01` — Minimal (Linear/Stripe)
- `landing-02` — Modern Gradient
- `landing-03` — Airbnb Style
- `landing-04` — Apple/Notion Style
- `landing-05` — SaaS Startup ← **direção escolhida, tokens já promovidos pro tema global (seção 4)**

Acesso: `npm run dev` e navegar para `/showcase`.

## 7. Fonte de verdade para APIs

Existem três fontes de documentação da API do backend, nessa ordem de confiabilidade:

1. **Swagger** (`{{deskly_url}}/swagger-ui/index.html`, spec em `{{deskly_url}}/v3/api-docs`) — **use sempre que possível**, é gerado a partir do código e reflete o backend real.
2. `postman-collection.json` — útil pra ver exemplos de request, mas não documenta responses e teve paths inconsistentes entre o campo `raw` da URL e o array `path` (ex: `guest` aparecia num mas não no outro).
3. `frontend-guestHostConcept.md` — bom pra entender o *conceito* (guest vs host, is_host, tratamento de 403), mas alguns paths estão desatualizados (ex: documenta `GET /api/v1/me`, o real é `GET /api/v1/users/me`).

Discrepâncias já corrigidas no código a partir do Swagger:
- Workspaces público: `GET /public/api/v1/workspaces` (sem `guest` no path).
- `WorkspaceResponse` **não** inclui `description`/`address`/`neighborhood`/`latitude`/`longitude` — só `id`, `host_id`, `title`, `city`, `price_per_hour`, `rating` (nullable), `review_count`, `status`, `created_at`. Esses campos de endereço só existem no *request* de criação/edição, não voltam na leitura.
- Paginação real: `{ content, total_elements, total_pages, size }` (snake_case, sem campo de página atual — o front usa a página que ele mesmo pediu). O backend às vezes retorna `total_pages: 0` mesmo com itens na página atual; o front blinda isso com `Math.max(totalPages, 1)`.
- `POST` de criação (workspace e foto) retorna só um UUID cru (`"a841dfc3-..."`), não um objeto.
- `PUT`/`DELETE` de workspace e foto retornam corpo vazio/irrelevante — não tentar parsear resposta.

## 8. Gaps conhecidos / próximos passos

- Edição de workspace não consegue pré-preencher descrição/endereço/bairro (a API não devolve esses campos na leitura) — o formulário avisa isso e só envia o que o host redigitar.
- Reservas, pagamentos, avaliações e favoritos ainda não têm UI (fora do escopo até agora).
- Upload de foto é só por URL (`photo_url`) — não há endpoint de upload de arquivo documentado no Swagger.
- Bundle principal (`index-*.js`) já passou de 500kB — considerar `manualChunks` ou lazy-loading de rotas menos acessadas (ex: telas de host) se isso virar problema real de performance.
