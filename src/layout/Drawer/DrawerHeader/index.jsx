import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import home from '@/assets/images/home.png';

// ==============================|| DRAWER HEADER ||============================== //

const BannerContainer = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    width: '80%',
    height: '100px', // 배너 높이 설정
    backgroundImage: `url(${home})`, // 배너 이미지 URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '8px', // 모서리 둥글게
}));

export default function DrawerHeader({ open }) {
    const theme = useTheme();

    return (
        <DrawerHeaderStyled theme={theme} open={!!open}>
            <BannerContainer />
        </DrawerHeaderStyled>
    );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
