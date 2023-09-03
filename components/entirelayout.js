'use client'
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const forestMainTheme = createTheme({
  palette: {
    mode:'light',
    primary: {
      main: '#5F8575',
    },
  },
});

export default function AlmostRootLayout({children}) {
  const router = useRouter();
  const nav = [
    {title:'Home',url:'/'},
    {title:'Tracking',url:'/tracking'},
    {title:'Block Viewer',url:'/blockviewer'},
    {title:'Profile',url:'/profile'}
  ];
  
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNav=(url)=>{
    router.push(url);
  }

   return (
    <Stack>
        <CssBaseline />
        <ThemeProvider theme={forestMainTheme}>
        <AppBar component="nav">
        <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            >
            <MenuIcon />
            </IconButton>
            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
            Forest Supply
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {nav.map((item,index) => (
                <Button key={index} sx={{ color: '#fff' }} onClick={()=>handleNav(item.url)}>
                {item.title}
                </Button>
            ))}
            </Box>
        </Toolbar>
        </AppBar>
        </ThemeProvider>
        <Box component="main">
            {children}
        </Box>
    </Stack>
  )
}