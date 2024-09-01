import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import EditOutlined from '@ant-design/icons/EditOutlined';
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import WalletOutlined from '@ant-design/icons/WalletOutlined';
import { useAuth } from '@hooks/useAuth.jsx';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { logout } = useAuth();

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <List
            component="nav"
            sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}
        >
            <ListItemButton onClick={logout}>
                <ListItemIcon>
                    <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </List>
    );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
