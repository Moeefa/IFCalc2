import type {
  ReportResponse,
  SuapResponse,
  Subject,
} from "../../../types/responses";

import List from "@/app/subjects/list";
import { auth } from "@/auth";

async function getData(): Promise<ReportResponse> {
  const session = await auth();

  /*
   * If the user isn't authenticated, we return an "Unauthorized" message.
   */
  if (!session) return "Unauthorized";

  /*
   * We fetch the data from the API and parse it to JSON.
   * It isn't caching the response so we can get the most recent data.
   */
  const res = await fetch(
    `https://suap.ifmt.edu.br/api/v2/minhas-informacoes/boletim/${new Date().getFullYear()}/1/`,
    {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );
  const data: SuapResponse[] & { detail?: string } = await res.json();

  /*
   * If the response contains a `detail` key, it means that the API returned an error or didn't find any data.
   * Currently handling it as a "Not Found" message only.
   */
  if (data.detail) return "Not Found";

  /*
   * We filter out the subjects that have been transferred to another course.
   * Then we map the subjects to an array of objects with a simplified and readable structure.
   */
  const filtered = data.filter((a) => a.situacao !== "Transferido");
  const subjects = filtered.reduce((a: Subject[], b) => {
    /*
     * We create an array with the grades of each bimester and replace the comma with a dot to parse it to a number later.
     */
    const grades = [
      b.nota_etapa_1.nota,
      b.nota_etapa_2.nota,
      b.nota_etapa_3.nota,
      b.nota_etapa_4.nota,
    ].map((a) => a.replace(",", "."));

    return [
      ...a,
      {
        id: b.codigo_diario,
        /*
         * We get the name of the subject and remove the roman numerals from the end.
         */
        name: b.disciplina
          .slice(b.disciplina.indexOf("-") + 1, b.disciplina.length)
          .replace(/I{1,3}$/, "")
          .trim(),
        grades,
        /*
         * We get the final grade of the subject and replace the comma with a dot to parse it to a number later.
         * If the final grade is empty, we calculate it based on the bimester grades.
         */
        final:
          b.media_final_disciplina?.replace(",", ".") ||
          (
            grades
              .map((a) => Number(a))
              .reduce((a, b, i) => a + (i > 1 ? b * 3 : b * 2) || 0, 0) /
            (2 + 2 + 3 + 3)
          ).toFixed(1),
        frequency: b.percentual_carga_horaria_frequentada,
        studying: grades.every((a) => a === "" || a === null),
      },
    ];
  }, []);

  return subjects;
}

export default async function Data() {
  const data = await getData();

  if (data === "Unauthorized")
    return (
      <div className="flex items-center justify-center">
        <p className="leading-7 max-w-48 text-center text-pretty">
          Entre com o SUAP para visualizar suas matérias e notas.
        </p>
      </div>
    );

  if (data === "Not Found")
    return (
      <div className="flex items-center justify-center">
        <p className="leading-7 max-w-48 text-center text-pretty">
          Nenhuma matéria encontrada.
        </p>
      </div>
    );

  return <List data={data} />;
}
