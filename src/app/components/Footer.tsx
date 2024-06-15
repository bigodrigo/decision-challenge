import Image from "next/image";
import { Container, Box } from "@mui/material";
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full md:fixed md:bottom-0">
        <Container className="flex flex-col md:flex-row items-start justify-start py-4 px-4 text-ter">
            <Box className='flex flex-col justify-between p-2 w-full items-start h-48'>
                <Image
                    src="/logo_footer.png"
                    alt="Decision Logo Rodapé"
                    width={130}
                    height={41}
                    priority
                    className="my-4"
                />
                <p className='text-sm font-bold mb-2  text-pri'>POLÍTICAS DE PRIVACIDADE</p>
                <p className='text-xs text-ter'>© 2019 Direitos Reservados</p>
            </Box>
            <Box className='flex flex-col p-2 w-full items-start h-40'>
                <a href="https://www.google.com.br/maps/place/TREND+Nova+Carlos+Gomes/@-30.0430672,-51.1774352,17z/data=!3m1!4b1!4m5!3m4!1s0x951977f495c9b1ed:0x68d5b8f71f19d7e4!8m2!3d-30.0430672!4d-51.1752465" target="_blank" rel="noopener">Av. Senador Tarso Dutra 565</a>
                <p>Conj. 1302 – Torre Offices&nbsp;</p>
                <p>Porto Alegre-RS</p>
                <Box className="flex gap-2 justify-start mt-4">
                    <a href="https://www.facebook.com/Decision-Systems-235398773856273/" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className='bg-ter text-white p-2 rounded-full' size={34}/>
                    </a>
                    <a href="https://www.linkedin.com/company/decisionsystems" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className='bg-ter text-white p-2 rounded-full' size={34}/>
                    </a>
                    <a href="https://www.instagram.com/sistemadecision/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className='bg-ter text-white p-2 rounded-full' size={34}/>
                    </a>
                </Box>
            </Box>
            <Box className='flex flex-col p-2 w-full items-start h-40'>
                <h2 className="font-bold text-ter mb-2">PARA AQUISIÇÕES</h2>
                <a href="tel:+5505130126747" className='text-pri'>51 99804.0173</a>
                <a href="tel:+5505130126747" className='text-pri'>51 3012.6747</a>
                <p><a href="tel: +55051999689106" className='text-pri'>51 99968.9106</a> (Whats!)</p>
            </Box>
            <Box className='flex flex-col justify-between p-2 w-full items-start h-20'>
			    <h2 className="font-bold text-ter">PARA SUPORTE</h2>
                <p><a href="mailto:suporte@decisionsystems.com.br">suporte@decisionsystems.com.br</a></p>
            </Box>
        </Container>
    </footer>
  );
}
