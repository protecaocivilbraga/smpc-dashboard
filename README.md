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
