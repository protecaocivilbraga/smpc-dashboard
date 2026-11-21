# Integração: Braga Resiliente (app) e painel CCOM

Este ficheiro existe, igual, nos dois repositórios. Quem alterar um lado deve ler-o primeiro e atualizar o outro se for preciso. Última atualização: 21-11-2026.

| | Repositório | O que é |
|---|---|---|
| App pública | `braga-resiliente` | PWA de autoproteção para a população (GitHub Pages) |
| Painel | `smpc-dashboard` | Painel CCOM/SMPC, acesso com utilizador e palavra-passe; só o administrador publica avisos |

Alojamento atual: conta pessoal do administrador. Está prevista a mudança para a conta institucional da Proteção Civil (ver "Pendente").

## Como os avisos chegam à app

1. No painel, botão **Braga Resiliente**, o administrador escreve ou escolhe um modelo e publica.
2. O painel grava `avisos.json` no repositório `braga-resiliente` através da API do GitHub (`PUT /contents/avisos.json`, ramo `main`). A chave do GitHub fica só no `localStorage` do navegador do administrador (constante `BR.REPO` e `BR.KEY` no `index.html` do painel).
3. O GitHub Pages demora cerca de 1 minuto a publicar. A app lê `avisos.json` ao abrir e ao atualizar (com parâmetro anti-cache) e guarda uma cópia para uso offline. Não há notificações no telemóvel.

## Formato de `avisos.json`

```json
{
  "atualizado": "2026-11-21T11:24:00",
  "avisos": [
    {
      "nivel": "laranja",
      "titulo": "Risco de cheias: mantenha-se afastado de zonas inundáveis",
      "texto": "…texto em português…",
      "validoAte": "2026-11-22T11:24:00",
      "modelo": "cheias",
      "trad": { "zh": { "titulo": "…", "texto": "…" } }
    }
  ]
}
```

- `nivel`: `info`, `amarelo`, `laranja` ou `vermelho`.
- `titulo` é obrigatório (a app ignora avisos sem título). `texto` é opcional.
- `validoAte`: hora local de Portugal, sem fuso (`AAAA-MM-DDTHH:MM:SS`). A app deixa de mostrar o aviso depois dessa hora; sem o campo, fica até ser removido. O painel mostra os expirados e permite removê-los.
- `modelo` (opcional): identificador de um modelo traduzido (ver abaixo). O painel só o grava se o título e o texto forem iguais aos do modelo.
- `trad` (opcional): traduções feitas à mão, por código de língua. Só conta se tiver `titulo`.
- O português é sempre o texto oficial.

## Que língua mostra a app

Por esta ordem: `trad[língua]` do aviso, depois o texto do `modelo` na língua do utilizador, e por fim o português com a indicação "em português". Código em `avTxt()` e `cardMun()` no `index.html` da app.

## Modelos de aviso

Identificadores: `cheias`, `incendio`, `calor`, `vento`, `agua`, `apagao`.

- Texto em português: constante `BR_MODELOS` no `index.html` do painel (e `avm` em `lang-pt.js` da app, por consistência).
- Traduções: secção `avm` de cada `lang-xx.js` da app.
- Para alterar um modelo, mexer **nos dois lados**. Para criar um modelo novo: acrescentar o identificador em `BR_MODELOS` e no `<select id="brMod">` do painel, e a entrada `avm` nos oito ficheiros de língua.
- As traduções dos modelos foram feitas por IA e **ainda não foram revistas por falantes nativos**.

## Idiomas da app

`pt`, `en`, `es`, `fr`, `hi` (hindi), `ne` (nepalês), `ur` (urdu, da direita para a esquerda) e `zh` (chinês simplificado). Ficheiros `lang-xx.js` com as mesmas chaves em todos. Ao acrescentar um texto, acrescentá-lo nos oito. O urdu ativa `dir="rtl"` no documento; usar propriedades CSS lógicas (`inline-start`, `inline-end`), não `left`/`right`.

## Outros dados da app (só no repositório da app)

- `bombeiros.json` e `ulpc.json`: editados à mão. O painel não lhes toca.
- Nomes e moradas ficam em português; o tipo de corporação e a nota "Telefone / Emergência" são traduzidos (chaves `bb_*`).

## Regras de manutenção

- Qualquer alteração a ficheiros da app obriga a subir a versão `V` em `sw.js` (atual: `braga-v34`), senão os telemóveis ficam com a versão antiga em cache. Ficheiros novos entram na lista `CASCA`.
- Os avisos são **públicos**. Nada de dados pessoais, nada marcado RESERVADO (o briefing CCOS Cávado nunca sai do painel).
- A app não recolhe dados pessoais: kits e plano ficam no telemóvel.

## Pendente

- Mudança dos dois repositórios para a conta institucional da Proteção Civil: atualizar `BR.REPO` no painel, criar nova chave do GitHub nessa conta, README, código QR e link, e deixar aviso de mudança no endereço antigo.
- Contador anónimo de acessos e instalações: por decidir (proteção de dados).
- Revisão das traduções por falantes nativos (ficheiro de revisão enviado ao administrador).
