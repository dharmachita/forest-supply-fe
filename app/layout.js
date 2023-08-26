'use client'

import './globals.css'
import { useState } from 'react';
import { Inter } from 'next/font/google'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const inter = Inter({ subsets: ['latin'] })
const drawerWidth = 240;
const navItems = ['Home', 'Tracking', 'Block Viewer', 'Profile'];

export const metadata = {
  title: 'Forest Supply Tracking Viewer',
  description: 'Forest supply viewer',
}

export default function RootLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNav=(index)=>{
    switch (index) {
      case 0:
        router.push('/')
        break;
      case 1:
        router.push('/tracking')
        break;      
      case 2:
        router.push('/blockviewer')
        break;
      case 3:
         router.push('/profile')
        break;
      default:
        break;
    }
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
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
                {navItems.map((item,index) => (
                  <Button key={item} sx={{ color: '#fff' }} onClick={()=>handleNav(index)}>
                    {item}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
          </nav>
          <Box component="main" sx={{ p: 3 }} className="flex min-h-screen flex-col items-center justify-between p-24">
            {props.children}
          </Box>
        </Box>
      </body>
    </html>
  )
}