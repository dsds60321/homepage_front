import { FaHome } from 'react-icons/fa';

const menuItems = [
  {
    category: '체육시설',
    icon: 'FaHome', // 아이콘 이름을 문자열로 저장
    subcategories: [
      {
        name: '예약시설',
        pages: ['테니스', '풋살장'],
        url: ['/reservation/tennis', '/reservation/football'] // URL 배열 추가
      }
    ]
  }
];

export default menuItems;