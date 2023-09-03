'use client'

import { useState,useEffect } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses,esES  } from '@mui/x-data-grid';
import { Chip,IconButton,Tooltip } from '@mui/material';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { useRouter } from 'next/navigation';
import { CircularProgress,Box } from '@mui/material';

//data
import { trackingData } from '@/utils/data/trackingData';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

const CustomLoading=()=>{
  return(
    <Box className='container' sx={{ justifyContent:'center',alignItems:'center' }}>
      <CircularProgress color="success" />
    </Box>
  )
}

const formatoFecha=(fecha)=>{
  return `${fecha.slice(8,10)}-${fecha.slice(5,7)}-${fecha.slice(0,4)} ${fecha.slice(11)}`
}

export default function StripedGrid() {

    const [loading,setLoading]=useState(false);
    const [rows,setRows]=useState([]);
    const router = useRouter();

    useEffect(() => {  
      const cargaDatos=async()=>{
        setTimeout(() => {
            setRows(trackingData);
            setLoading(false);
        }, 2500);
      }
      setLoading(true);
      cargaDatos();

    }, [])
    
    const columns = [
        {
            field: 'fecha',
            headerName: 'Fecha',
            minWidth: 80,
            flex:1,
            valueGetter: ({row}) => {
              const mov=row?.movimientos;
              const track=mov[mov.length-1]?.tracking;
              return formatoFecha(track[track.length-1]?.timestamp);
            },
        },
        {
            field: 'remito',
            headerName: 'Remito',
            minWidth: 80,
            flex:1,
            valueGetter: ({row}) => {
              const mov=row?.movimientos;
              return mov[mov.length-1]?.remito;
            },
        },
        {
            field: 'producto',
            headerName: 'Producto',
            minWidth: 120,
            flex:1,
        },
        {
            field: 'proveedor',
            headerName: 'Proveedor',
            minWidth: 200,
            flex:1,
        },
        {
            field: 'responsable',
            headerName: 'Responsable',
            minWidth: 200,
            flex:1,
            valueGetter: ({row}) => {
              const mov=row?.movimientos;
              return mov[mov.length-1]?.responsable;
            },
        },
        {
            field: 'estado',
            headerName: 'Estado',
            minWidth: 120,
            flex:1,
            renderCell: ({row}) => {
                const mov=row?.movimientos;
                if (mov[mov.length-1]?.status==='Cosecha') {
                    return <Chip label={mov[mov.length-1]?.status} color="primary" variant="outlined" />
                }
                if (mov[mov.length-1]?.status==='En Tránsito') {
                    return <Chip label={mov[mov.length-1]?.status} color="warning" variant="outlined" />
                }
                if (mov[mov.length-1]?.status==='Depósito') {
                    return <Chip label={mov[mov.length-1]?.status} color="warning" variant="outlined" />
                }
                if (mov[mov.length-1]?.status==='Entregado') {
                    return <Chip label={mov[mov.length-1]?.status} color="success" variant="outlined" />
                }
                return null;
              },
        },
        {
            field: 'action',
            headerName: '',
            minWidth: 80,
            flex:1,
            renderCell: ({row}) => (
                <Tooltip title="Detalle">
                    <IconButton aria-label="fingerprint" color="success" onClick={() => router.push(`tracking/${row.id}`)}>
                        <Fingerprint />
                    </IconButton>
                </Tooltip>
            )
          },
    
      ];

    return (
        <div style={{ height:'100%', width: '100%', paddingLeft:'1rem',paddingRight:'1rem'}}>
          <StripedDataGrid
              slots={{
                loadingOverlay: CustomLoading,
              }}
              loading={loading}
              columns={columns}
              rows={rows}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              autoPageSize
              getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              }
          />
        </div>
    );
}
