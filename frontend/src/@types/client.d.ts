interface Client {
  id: number;
  name: string;
  company: string;
  status: "Ativo" | "Inativo" | "Pendente";
  createdAt: string;
}
