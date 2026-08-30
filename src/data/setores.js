// ============================================================
//  src/data/setores.js
//  Define os setores de orçamento disponíveis e os campos
//  específicos de cada um. Adicionar um setor novo = adicionar
//  um objeto aqui, sem precisar mexer nas telas.
// ============================================================

export const setores = [
  {
    id: "eletrico",
    nome: "Elétrico",
    icone: "⚡",
    campos: [
      { id: "tipoServico", label: "Tipo de serviço", tipo: "select", opcoes: ["Instalação nova", "Reparo", "Troca de quadro", "Padrão de entrada", "Iluminação"] },
      { id: "metragemFiacao", label: "Metragem de fiação", tipo: "number", unidade: "m" },
      { id: "quantidadePontos", label: "Quantidade de pontos", tipo: "number" },
      { id: "potenciaInstalada", label: "Potência instalada", tipo: "number", unidade: "kW" },
      { id: "observacoes", label: "Observações técnicas", tipo: "textarea" },
    ],
  },
  {
    id: "design",
    nome: "Design",
    icone: "🎨",
    campos: [
      { id: "tipoProjeto", label: "Tipo de projeto", tipo: "select", opcoes: ["Identidade visual", "Peça gráfica", "Web design", "Social media", "Embalagem"] },
      { id: "horasEstimadas", label: "Horas estimadas", tipo: "number", unidade: "h" },
      { id: "quantidadeArtes", label: "Quantidade de artes/peças", tipo: "number" },
      { id: "quantidadeRevisoes", label: "Revisões incluídas", tipo: "number" },
      { id: "observacoes", label: "Referências e observações", tipo: "textarea" },
    ],
  },
  {
    id: "hidraulico",
    nome: "Hidráulico",
    icone: "🔧",
    campos: [
      { id: "tipoServico", label: "Tipo de serviço", tipo: "select", opcoes: ["Instalação", "Reparo de vazamento", "Troca de tubulação", "Caixa d'água", "Desentupimento"] },
      { id: "metragemTubulacao", label: "Metragem de tubulação", tipo: "number", unidade: "m" },
      { id: "quantidadePontos", label: "Quantidade de pontos", tipo: "number" },
      { id: "observacoes", label: "Observações técnicas", tipo: "textarea" },
    ],
  },
  {
    id: "pintura",
    nome: "Pintura",
    icone: "🖌️",
    campos: [
      { id: "tipoTinta", label: "Tipo de tinta", tipo: "select", opcoes: ["Acrílica", "Látex", "Esmalte", "Textura", "Verniz"] },
      { id: "areaM2", label: "Área a pintar", tipo: "number", unidade: "m²" },
      { id: "quantidadeDemaos", label: "Quantidade de demãos", tipo: "number" },
      { id: "observacoes", label: "Observações", tipo: "textarea" },
    ],
  },
  {
    id: "marcenaria",
    nome: "Marcenaria",
    icone: "🪚",
    campos: [
      { id: "tipoMovel", label: "Tipo de móvel/peça", tipo: "select", opcoes: ["Sob medida", "Reforma de móvel", "Armário", "Bancada", "Painel"] },
      { id: "material", label: "Material principal", tipo: "select", opcoes: ["MDF", "Madeira maciça", "Compensado", "MDP"] },
      { id: "medidas", label: "Medidas (LxAxP)", tipo: "text" },
      { id: "observacoes", label: "Observações", tipo: "textarea" },
    ],
  },
  {
    id: "reforma",
    nome: "Reforma / Obra",
    icone: "🏗️",
    campos: [
      { id: "tipoObra", label: "Tipo de obra", tipo: "select", opcoes: ["Reforma completa", "Ampliação", "Acabamento", "Alvenaria", "Telhado"] },
      { id: "areaM2", label: "Área da obra", tipo: "number", unidade: "m²" },
      { id: "prazoEstimado", label: "Prazo estimado", tipo: "number", unidade: "dias" },
      { id: "observacoes", label: "Observações", tipo: "textarea" },
    ],
  },
];

export function getSetorById(id) {
  return setores.find((s) => s.id === id);
}
