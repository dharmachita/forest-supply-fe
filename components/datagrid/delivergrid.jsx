'use client'

import { useState,useEffect } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses,esES  } from '@mui/x-data-grid';
import { Chip,IconButton,Tooltip } from '@mui/material';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { useRouter } from 'next/navigation';

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

const data=[
    {
        id:1,
        fecha: "01-01-2023"         ,
        remito: "1111-1111"         ,
        producto: "Pino Ellioti"    ,
        proveedor: "Forestal Eldorado"     ,
        origen: "AR"        ,
        responsable: "Forestal Eldorado"   ,
        estado: "En Tránsito"        ,
        ubicacion: "Eldorado" 
    },
    {
        id:2,
        fecha: "01-01-2023"         ,
        remito: "1111-1111"         ,
        producto: "Pino Ellioti"    ,
        proveedor: "Forestal Eldorado"     ,
        origen: "AR"        ,
        responsable: "Forestal Eldorado"   ,
        estado: "Entregado"        ,
        ubicacion: "Eldorado" 
    },
    {
        id:3,
        fecha: "01-01-2023"         ,
        remito: "1111-1111"         ,
        producto: "Pino Ellioti"    ,
        proveedor: "Forestal Eldorado"     ,
        origen: "AR"        ,
        responsable: "Forestal Eldorado"   ,
        estado: "Depósito"        ,
        ubicacion: "Eldorado" 
    },
    {
        id:4,
        fecha: "01-01-2023"         ,
        remito: "1111-1111"         ,
        producto: "Pino Ellioti"    ,
        proveedor: "Forestal Eldorado"     ,
        origen: "AR"        ,
        responsable: "Forestal Eldorado"   ,
        estado: "Cosecha"        ,
        ubicacion: "Eldorado" 
    }
]

export default function StripedGrid() {

    const [loading,setLoading]=useState(false);
    const [rows,setRows]=useState([]);
    const router = useRouter();

    useEffect(() => {  
      const cargaDatos=async()=>{
        setTimeout(() => {
            setRows(data);
            setLoading(false);
        }, 3000);
      }
      setLoading(true);
      cargaDatos();

    }, [])
    
    const columns = [
        {
            field: 'fecha',
            headerName: 'Fecha',
            minWidth: 80,
        },
        {
            field: 'remito',
            headerName: 'Remito',
            minWidth: 80,
        },
        {
            field: 'producto',
            headerName: 'Producto',
            minWidth: 120,
        },
        {
            field: 'proveedor',
            headerName: 'Proveedor',
            minWidth: 200,
        },
        {
            field: 'responsable',
            headerName: 'Responsable',
            minWidth: 200,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            minWidth: 120,
            renderCell: ({row}) => {
                if (row.estado==='Cosecha') {
                    return <Chip label={row.estado} color="primary" variant="outlined" />
                }
                if (row.estado==='En Tránsito') {
                    return <Chip label={row.estado} color="warning" variant="outlined" />
                }
                if (row.estado==='Depósito') {
                    return <Chip label={row.estado} color="warning" variant="outlined" />
                }
                if (row.estado==='Entregado') {
                    return <Chip label={row.estado} color="success" variant="outlined" />
                }
                return null;
              },
        },
        {
            field: 'ubicacion',
            headerName: 'Ubicación',
            minWidth: 120,
        },
        {
            field: 'action',
            headerName: '',
            minWidth: 80,
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
        <div style={{ height:'500px', width: '100%'}}>
        <StripedDataGrid
            loading={loading}
            columns={columns}
            rows={rows}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
        />
        </div>
    );
}
