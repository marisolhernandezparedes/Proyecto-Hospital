import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function HomeComponent() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: '50px' }}>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Menú de Inicio - Hospital
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <img src={require('../img/paciente.png')} alt="Imagen 1" style={{ width: '100%', marginBottom: '20px', width: '100px' }} />
            <Typography variant="h6" gutterBottom>
              Pacientes
            </Typography>
            <Typography variant="body2">
              Administración de pacientes del hospital.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button component={Link} to="/pacientes" variant="contained" color="primary">
                Ver Pacientes
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <img src={require('../img/enfermedad.png')} alt="Imagen 2" style={{ width: '100%', marginBottom: '20px', width: '100px' }} />
            <Typography variant="h6" gutterBottom>
              Enfermedades
            </Typography>
            <Typography variant="body2">
              Gestión de enfermedades y diagnósticos.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button component={Link} to="/enfermedades" variant="contained" color="primary">
                Ver Enfermedades
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <img src={require('../img/calendar.png')} alt="Imagen 3" style={{ width: '100%', marginBottom: '20px', width: '100px' }} />
            <Typography variant="h6" gutterBottom>
              Citas
            </Typography>
            <Typography variant="body2">
              Manejo de citas médicas y agenda.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button component={Link} to="/citas" variant="contained" color="primary">
                Ver Citas
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '50px' }}>
        <Typography variant="body2" align="center" color="textSecondary">
          Avisos de Privacidad | Hospital XYZ
        </Typography>
      </Box>
    </Box>
  );
}

export default HomeComponent;
