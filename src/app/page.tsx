
import { Button, Container } from "@mui/material";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start py-4 px-4">
      <h2 className="text-sec font-bold text-base md:text-2xl text-center my-4">Bem vindo ao sistema de cadastro de Usuários!</h2>
      <Container className="flex items-center justify-center flex-col md:flex-row py-4 gap-10">
        <Button variant="contained" className="bg-pri w-52" href="./usuarios/criar">
          Novo Usuário
        </Button>
        <Button variant="contained" className="bg-pri w-52" href="./usuarios">
          Lista de Usuários
        </Button>
      </Container>
    </main>
  );
}
