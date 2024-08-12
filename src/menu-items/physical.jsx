// assets

// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const physical = {
    id: '체육시설',
    title: '체육시설',
    type: 'group',
    children: [
        {
            id: '테니스',
            title: '테니스',
            type: 'item',
            url: '/physical/reservation',
            icon: icons.ChromeOutlined,
        },
    ],
};

export default physical;
