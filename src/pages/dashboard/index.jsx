// material-ui
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown'; // react-markdown 임포트
import { dashboardInfo } from '@pages/dashboard/dashboardInfo.js';
import { styled } from '@mui/system';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    marginBottom: theme.spacing(2), // 각 Accordion 간의 여백
    backgroundColor: theme.palette.background.paper, // 배경색
    border: '1px solid #ccc', // 경계선
    boxShadow: 'none', // 그림자 제거
    '&:before': {
        display: 'none', // 기본 스타일의 경계선 제거
    },
}));

export default function DashboardDefault() {
    return (
        <>
            <Container
                maxWidth={false} // 전체 화면을 감싸도록 설정
                style={{ minHeight: '100vh', padding: '16px' }} // 최소 높이를 100vh로 설정
            >
                <Typography variant="h4" gutterBottom>
                    홈페이지
                </Typography>
                {dashboardInfo.map((item, index) => (
                    <StyledAccordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{item.subTitle}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                        </AccordionDetails>
                    </StyledAccordion>
                ))}
            </Container>
        </>
    );
}
