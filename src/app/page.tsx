import Image from "next/image";
import { Button, Container } from "@mui/material";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12 md:p-24 bg-white">
      <Image
        src="/logo_decision.png"
        alt="Decision Logo"
        width={240}
        height={100}
        priority
        className="my-4"
      />
      <h2 className="text-sec font-bold text-base md:text-2xl text-center my-4">Bem vindo ao sistema de cadastro de Usuários!</h2>
      <Container className="flex items-center justify-center flex-col md:flex-row gap-8">
        <Button variant="contained" className="bg-pri w-52" href="./usuario/criar">
          Novo Usuário
        </Button>
        <Button variant="contained" className="bg-pri w-52" href="./usuario">
          Lista de Usuários
        </Button>
      </Container>
    </main>
  );
}
