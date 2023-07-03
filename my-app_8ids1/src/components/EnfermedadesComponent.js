import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FiberNewIcon from '@mui/icons-material/FiberNew';

const EnfermedadesComponent = () => {
  const actions = [
    { icon: <FiberNewIcon />, name: 'New', key: 'new' },
  ];

  const handleFunction = (e, key) => {
    e.preventDefault();
    console.log('Presiono boton ' + key);
    navigate('/enfermedad/nuevo', {
      state: {
        id: 0,
      },
    });
  };

  const navigate = useNavigate();

  const Volver = () => {
    navigate('/home');
  };

  const handleRowClick = (params) => {
    console.log('ID: ' + params.row.id);
    console.log('Nombre: ' + params.row.nombre);
    navigate('/enfermedad/nuevo', {
      state: {
        id: params.row.id,
        nombre: params.row.nombre,
      },
    });
  };

  const columns = [
    { field: 'id', headerName: 'NO.', width: 70 },
    { field: 'nombreE', headerName: 'Enfermedad', width: 130 },
    { field: 'sintomas', headerName: 'Sintomas', width: 130 },
    { field: 'receta', headerName: 'Receta', width: 130 },
    { field: 'diagnostico', headerName: 'Diagnostico', width: 130 },
    { field: 'prevencion', headerName: 'Prevencion', width: 130 },

  ];

  const getData = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/enfermedades').then((response) => {
      console.log(response.data);
      setRows(response.data);
    });
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log('Render');
    getData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, marginTop: '50px' }}>
      <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', bottom: 16, right: 16 }}
       icon={<SpeedDialIcon/>}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(e) => {
              handleFunction(e, action.key);
            }}
          />
        ))}
      </SpeedDial>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        onRowClick={handleRowClick}
      />
      <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={Volver} startIcon={<ArrowBackIcon />}>
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default EnfermedadesComponent;
