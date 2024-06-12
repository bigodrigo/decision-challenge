import Image from "next/image";
import { Button, Container } from "@mui/material";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <Container className="flex flex-col items-center justify-center">
        <Image
          src="/logo_decision.png"
          alt="Decision Logo"
          width={180}
          height={120}
          priority
          className="mb-8"
        />
        <Button variant="contained" color="primary">
          Clique aqui
        </Button>
      </Container>
    </main>
  );
}
