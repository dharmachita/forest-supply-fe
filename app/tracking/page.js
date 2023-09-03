import StripedGrid from '@/components/datagrid/delivergrid.js';
import { Box,Paper,Typography,Stack } from '@mui/material';

export default function Tracking() {

  return (
    <Box className='container' sx={{ justifyContent:'center',alignItems:'center' }}>
      <StripedGrid />
    </Box>
  )
}