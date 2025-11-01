import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <AppBar position='fixed' color='primary' sx={{ zIndex: 10 }}>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          GeoMapping Studio
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
