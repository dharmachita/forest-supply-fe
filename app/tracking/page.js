import StripedGrid from '@/components/datagrid/delivergrid';
import { Box,Paper,Typography } from '@mui/material';

export default function Tracking() {

  return (
    <>
      <Typography variant="h4">
        Tracking en tiempo real
      </Typography>
      <Box sx={{maxWidth:'90vw', minHeight:'auto', pt:'0.5rem'}}>
        <Paper>
          <StripedGrid />
        </Paper>
      </Box>
    </>
  )
}
