import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function FallBack() {
  const rootStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const contentStyle = {
    textAlign: 'center' as const,
  };

  const titleStyle = {
    marginBottom: '16px',
  };

  const paragraphStyle = {
    marginBottom: '32px',
  };

  const linkStyle = {
    textDecoration: 'none',
  };

  return (
    <div style={rootStyle}>
      <Container maxWidth="sm" style={contentStyle}>
        <Typography variant="h1" component="h1" style={titleStyle}>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" style={paragraphStyle}>
          Siden du leder efter er muligvis blevet fjernet, har ændret navn, eller er midlertidigt utilgængelig.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          style={linkStyle}
        >
          Gå til Hjem
        </Button>
      </Container>
    </div>
  );
}

export default FallBack;