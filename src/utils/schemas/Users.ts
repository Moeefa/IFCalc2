import mongoose from "mongoose";

export interface IUsers {
  _id: string;
  materias_anual: {
    nome: string;
    notas: {
      [index: number]: number;
    };
    suap: boolean;
  }[];
  materias_bimestral: {
    nome: string;
    bimestre: number;
    notas: {
      nota: number;
      conceito: number;
    }
  }[];
};

const usersSchema = new mongoose.Schema<IUsers>({
  _id: String,
  materias_anual: Array,
  materias_bimestral: Array
});

export default mongoose.model<IUsers>("Users", usersSchema);
