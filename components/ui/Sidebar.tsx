import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {
  return (
    <Drawer
      anchor='left'
      open={true}
      onClose={() => console.log('cerrando')}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 2px' }}>
          <Typography variant='h4'>
            Menú
          </Typography>
        </Box>
        <List>
          {
            menuItems.map((menuItem, index) => (
              <ListItem button key={menuItem}>
                <ListItemIcon>
                  { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon /> }
                </ListItemIcon>
                <ListItemText primary={menuItem} />
              </ListItem>
            ) )
          }
        </List>
        <Divider />
        <List>
          {
            menuItems.map((menuItem, index) => (
              <ListItem button key={menuItem}>
                <ListItemIcon>
                  { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon /> }
                </ListItemIcon>
                <ListItemText primary={menuItem} />
              </ListItem>
            ) )
          }
        </List>
      </Box>
    </Drawer>
  )
};
