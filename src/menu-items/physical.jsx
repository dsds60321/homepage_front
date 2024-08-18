// assets

// assets
import { TrophyOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    TrophyOutlined,
    QuestionOutlined,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const physical = {
    id: 'Exercise',
    title: 'Exercise',
    type: 'group',
    children: [
        {
            id: 'Tennis',
            title: 'Tennis',
            type: 'item',
            url: '/physical/reservation',
            icon: icons.TrophyOutlined,
        },
    ],
};

export default physical;
