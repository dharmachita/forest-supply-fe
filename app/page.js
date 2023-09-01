import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Box>
        <Typography
          variant="h2"
          component="div"
        >
          Sistema de Tracking para Cadena de Custodia de Productos Forestales
        </Typography>  
        <Typography
          variant="h4"
          component="div"
          sx={{color:'grey', fontSize:'bold'}}
        >
          Powered by Hyperledger Fabric
        </Typography>     
        <Link href={'/tracking'}>Iniciar</Link>

      </Box>
    </>
  )
}
