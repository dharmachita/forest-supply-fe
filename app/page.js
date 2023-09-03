'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Box className='container' sx={{ justifyContent:'center',alignItems:'center' }}>
        <Stack sx={{ marginX:'3em'}}>
          <Typography
            variant="h2"
            sx={{ paddingBottom:'1em'}}
          >
            Sistema de Tracking para Cadena de Custodia de Productos Forestales
          </Typography>   
          <Grid container>
            <Grid>
              <Button variant="outlined" color="success" size="large" onClick={()=>router.push('/tracking')}>
                Iniciar
              </Button>
            </Grid>          
          </Grid>  
        </Stack>
      </Box>
    </>
  )
}
