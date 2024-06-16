export type SuapResponse = {
  codigo_diario: string;
  disciplina: string;
  segundo_semestre: boolean;
  carga_horaria: number;
  carga_horaria_cumprida: number;
  numero_faltas: number;
  percentual_carga_horaria_frequentada: number;
  situacao: string;
  quantidade_avaliacoes: number;
  nota_etapa_1: {
    nota: string;
    faltas: number;
  };
  nota_etapa_2: {
    nota: string;
    faltas: number;
  };
  nota_etapa_3: {
    nota: string;
    faltas: number;
  };
  nota_etapa_4: {
    nota: string;
    faltas: number;
  };
  media_disciplina: string;
  nota_avaliacao_final: {
    nota: string;
    faltas: number;
  };
  media_final_disciplina: string;
};

export type ReportResponse =
  | "Unauthorized"
  | "Not Found"
  | {
      subjects: {
        name: string;
        grades: string[];
        final: string;
        frequency: number;
        studying: boolean;
      }[];
    };
