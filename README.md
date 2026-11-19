# Blox Fruits — Edição Épica

Projeto de Matheus Bucher · Tema 14 · HTML5, CSS e JavaScript puro.

## Abrir

O site está em `dist`. Abra `dist/index.html`, ou execute `node preview.mjs` e acesse http://127.0.0.1:4173. Não é necessário instalar dependências.

## Páginas e requisitos da atividade

Início, Frutas, Os mares, Guia e Quiz possuem seus próprios HTMLs. Todos preservam a sequência inicial de metadados solicitada, `lang="pt-BR"`, ícone PNG, CSS externo, menu em lista, âncora temática à direita e `<h5>Desenvolvido por Matheus</h5>` no rodapé.

## Catálogo completo

- 42 frutas atuais da descrição oficial, organizadas por Comum (7), Incomum (6), Rara (4), Lendária (11) e Mítica (14).
- Cada card mostra nome, raridade, tipo, preço em Beli e preço em Robux da versão permanente.
- Busca em tempo real por nome, nome anterior, raridade ou tipo; filtros de raridade e tipo podem ser combinados.
- Chop encontra Blade, Rumble encontra Lightning, Leopard encontra Tiger; os nomes anteriores não duplicam frutas atuais.
- Catálogo estático também pode ser lido com JavaScript desativado.
- Dados conferidos em 19/11/2026. Skins, variantes e mutações não são contadas como frutas separadas.
- Beli representa o preço no vendedor quando disponível; Robux representa a versão permanente. Não são valores de troca entre jogadores.

Fontes consultadas:

- Lista oficial: https://www.roblox.com/games/2753915549/Blox-Fruits
- Raridades, tipos e preços: https://oofwiki.com/blox-fruits/fruits
- Conferência independente de preços: https://bloxfruitscalculator.cc/stock/

## Efeitos

- Frutas em três camadas parallax, com rotação, trajetórias, velocidades e brilho neon diferentes.
- Partículas ascendentes em Canvas, descargas periódicas e faíscas elétricas ao passar o mouse sobre cards e controles.
- Explosão radial de partículas, anel de energia e tremor de 2 pixels por 210 ms ao clicar em botões.
- Auras pulsantes de fogo, raio, gelo e trevas.
- Botão para pausar os efeitos, preferência persistida e respeito automático a movimento reduzido.
- Um único requestAnimationFrame, partículas limitadas, DPR limitado, ajuste de qualidade e suspensão quando a aba fica oculta. Animações de cards fora da tela são pausadas.
- A prévia de teste registrou média de 16,7 ms por quadro, aproximadamente 60 fps. Desempenho varia conforme o aparelho e o navegador.

## Arquivos

`estilo.css`: visual original e layout; `catalogo.css` e `cores-frutas.css`: catálogo; `efeitos.css` e `efeitos.js`: efeitos; `frutas-dados.js`: dados carregados sem fetch; `catalogo-frutas.json`: snapshot com fontes; `script.js`: menus, filtros, detalhes, mares, guia e quiz.

Para atualizar os dados, edite `dist/catalogo-frutas.json` e execute `node build-catalog.mjs`, seguido de `node check-catalog.mjs`. Os SVGs preservam a linguagem visual das ilustrações anteriores. São artes estilizadas, não ícones oficiais. As capas anteriores e seus prompts estão incluídos.

## Verificação realizada

As cinco páginas foram conferidas quanto a estrutura, referências locais, âncoras, menus e imagens. Catálogo: 42 registros e nomes oficiais, cinco grupos, valores inteiros e 42 SVGs válidos. No navegador: busca por Chop/Rumble/Leopard/Magnet/Control, combinação Mítica + Elemental (Dough e Gas), busca sem resultados e reset, preços no modal, pausa persistida, movimento reduzido, celular e tablet sem rolagem horizontal. Quiz concluído com 5/5 e reiniciado. Nenhum erro ou aviso no console durante os testes.

## Hospedagem e entrega

https://blox-fruits-matheus-bucher.m995108281.chatgpt.site

O site permanece privado, conforme a escolha do usuário. O envio do ZIP ao chat The Truth Aura é separado do envio no item da tarefa escolar. Para outra hospedagem estática, envie o conteúdo de `dist` para a pasta pública do provedor (por exemplo, `htdocs` no InfinityFree).

Site de fã, sem vínculo oficial com Roblox ou Gamer Robot Inc. Preços e mecânicas podem mudar. Este projeto não se conecta à conta do jogo e não distribui frutas ou Robux.
