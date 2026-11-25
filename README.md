# SMPC Braga · Painel de situação meteorológica e risco de cheias

Painel de apoio à consciência situacional (ficheiro único `index.html`, sem servidor). Não substitui os avisos oficiais nem o sistema de despacho.

**Conteúdo:** previsão multimodelo (6 ensembles), avisos IPMA, satélite EUMETSAT, ocorrências em curso e risco relativo de cheias por freguesia.

**Fontes abertas:** Open-Meteo (ensembles e caudais GloFAS), IPMA, EUMETSAT View, Fogos.pt/ANEPC, OpenStreetMap, geoapi.pt.

**Nota:** o risco por freguesia é um indicador relativo; não substitui a cartografia oficial de zonas inundáveis. Os níveis Normal, Vigilância e Prontidão são propostas a validar pelo CorMPC.

## Briefing técnico-operacional do CCOS Cávado e aviso Planoclima

Quadro "Briefing técnico-operacional CCOS Cávado" no painel: carrega-se o PDF do boletim (e o aviso da Planoclima em .msg, .eml, .txt ou texto colado). A leitura é feita **no navegador** (pdf.js, carregado do cdnjs) e o resultado fica só no `localStorage` deste navegador (`smpc_bol`, `smpc_aviso`). **O boletim é RESERVADO: nunca é enviado nem incluído neste repositório.**

- Estados de prontidão (DIOPS, DECIR, DIONRBQ, DIRACAERO, DCDFCI-PNPG) e estados de alerta do SFN estão desenhados a cores; são lidos pela cor das caixas. Confirmar sempre no documento original.
- Entra no relatório PDF e no email (opções "Briefing CCOS Cávado" e "Aviso Planoclima") e na mensagem **Entidades · grupos CCOM e Agentes de PC**. Nunca nas mensagens à população (WhatsApp e SMS).

O aviso da Planoclima nunca altera o nível sozinho. Se tiver menos de 48 h, ultrapassar os limiares do painel e coincidir com um nível já proposto ou com um aviso do IPMA, aparece uma sugestão de subir um nível nos diálogos "Relatório" e "Mensagens", com o botão "Aplicar sugestão".

## Botão "Braga Resiliente" (só administrador)

Publica avisos municipais na aplicação pública Braga Resiliente (repositório `protecaocivilbraga/protecaocivilbraga.github.io`, ficheiro `avisos.json`). Mostra-se apenas à conta administrador. A publicação usa a API do GitHub com uma chave pessoal (fine-grained, criada na conta `protecaocivilbraga`, só para o repositório da app, Contents: Read and write) que fica **apenas no `localStorage` do navegador do administrador**; nunca é enviada para este repositório. Os avisos ficam **públicos**.

## Relatórios semanal e de período (CorMPC e SMPC)

Botões **Semanal** e **Período** no cabeçalho, visíveis só aos perfis CorMPC e SMPC (`CFG.RP_PERFIS`). Nada é enviado automaticamente: o relatório é gerado ao carregar no botão, cada secção é editável antes de enviar e o envio faz-se como no relatório de apoio à decisão (PDF, rascunho .eml, Outlook, impressão com número). O cabeçalho é o mesmo (funções `pdfCabecalho` e `pdfRodape`, partilhadas pelos três relatórios).

- **Semanal:** histórico da semana anterior (por defeito de segunda a segunda, 00h), total de ocorrências e tipologias, ocorrências significativas, freguesias afetadas, estados de prontidão do briefing CCOS Cávado guardado neste navegador e previsão diária até à segunda-feira seguinte (ensembles Open-Meteo, mesmo método do painel; o nível só existe nas primeiras 72 h).
- **Período (1 página):** últimas 6, 12 ou 24 h e previsão para as horas seguintes, ocorrências significativas, por freguesia e por tipologia.
- **Ocorrência significativa:** mais de 2 meios (veículos, campo `Materials` do Ifprotec; `CFG.SIG`). A API não indica as entidades que intervieram (só a que regista a ocorrência), por isso o critério "mais de 1 entidade" não é aplicado: quem gera o relatório retira à mão as que não se justifiquem.
- **Numeração:** atribuída só ao imprimir. Por defeito usa a mesma série do relatório de apoio à decisão (`CFG.SERIE`); para uma série própria basta mudar o texto (p. ex. `'CCOM-S'`).
- **Histórico:** vem do Apps Script (ficheiro `Historico.gs`, ação `hist`), que grava as ocorrências numa folha de cálculo Google da conta da Proteção Civil a cada 5 minutos. Só há histórico completo a partir do dia em que for ligado; antes disso o painel avisa e usa as últimas 24 h que já recebe. A folha não guarda moradas, nomes, contactos, vítimas nem texto livre; as naturezas de saúde ficam sem localização e só contam nos totais.
- **Briefing CCOS Cávado:** continua só no `localStorage` do navegador onde foi carregado; noutro navegador o campo dos estados de prontidão preenche-se à mão.


## Equipas SMPC no terreno (conta EQUIPAS)

As equipas do SMPC entram no painel com a conta **EQUIPAS**, normalmente no telemóvel (pode instalar-se como aplicação). Essa conta vê só o ecrã das equipas: **Nova ocorrência** com localização (GPS, com acerto por toque no mapa), equipa, viatura, descrição curta e hora de início; e **Concluir**, com hora de conclusão, km de fecho da viatura e observações. Sem rede, o registo fica no telemóvel e é enviado quando houver ligação, sem duplicar.

- Os registos ficam numa folha **RESERVADA** na conta da Proteção Civil (ficheiro `Equipas.gs` do Apps Script, que não está neste repositório). Nada fica no GitHub.
- CorMPC e SMPC veem os registos no mapa (camada "Equipas SMPC no terreno": laranja em curso, cinzento concluída) e no botão **Equipas**. O CorMPC também pode registar e concluir; o SMPC só vê. As outras entidades não recebem estes dados (o servidor recusa).
- A conta das equipas só vê o que está em curso e o que foi concluído nas últimas 24 h. Correções faz-se diretamente na folha.
- Permissões: módulo `equipas` no `AUTH_PERFIS` do `Auth.gs` (editar = regista e conclui; ver = só consulta). Quem edita `equipas` e não vê `mapa` entra no modo terreno, que não carrega modelos, satélite nem avisos.
