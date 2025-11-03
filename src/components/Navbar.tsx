import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { isDarkMode, toggleDarkMode } = useTheme();
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
        <IconButton
          color='inherit'
          aria-label='toggle dark mode'
          onClick={toggleDarkMode}
          sx={{ ml: 2 }}
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
