// DataTable.js
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const DataTable = ({ data, isSmallScreen }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    {isSmallScreen ? (
                        <TableCell>서비스 이름</TableCell>
                    ) : (
                        <>
                            <TableCell>구분</TableCell>
                            <TableCell>서비스 ID</TableCell>
                            <TableCell>최대 클래스 이름</TableCell>
                            <TableCell>최소 클래스 이름</TableCell>
                            <TableCell>서비스 상태</TableCell>
                            <TableCell>서비스 이름</TableCell>
                            <TableCell>결제 상태</TableCell>
                            <TableCell>장소 이름</TableCell>
                            <TableCell>사용 대상 정보</TableCell>
                            <TableCell>서비스 URL</TableCell>
                            <TableCell>좌표 X</TableCell>
                            <TableCell>좌표 Y</TableCell>
                            <TableCell>서비스 오픈 시작일</TableCell>
                            <TableCell>서비스 오픈 종료일</TableCell>
                            <TableCell>접수 시작일</TableCell>
                            <TableCell>접수 종료일</TableCell>
                            <TableCell>지역 이름</TableCell>
                            <TableCell>이미지 URL</TableCell>
                        </>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        {isSmallScreen ? (
                            <TableCell>{item.SVCNM}</TableCell>
                        ) : (
                            <>
                                <TableCell>{item.GUBUN}</TableCell>
                                <TableCell>{item.SVCID}</TableCell>
                                <TableCell>{item.MAXCLASSNM}</TableCell>
                                <TableCell>{item.MINCLASSNM}</TableCell>
                                <TableCell>{item.SVCSTATNM}</TableCell>
                                <TableCell>{item.SVCNM}</TableCell>
                                <TableCell>{item.PAYATNM}</TableCell>
                                <TableCell>{item.PLACENM}</TableCell>
                                <TableCell>{item.USETGTINFO}</TableCell>
                                <TableCell>
                                    <a
                                        href={item.SVCURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        링크
                                    </a>
                                </TableCell>
                                <TableCell>{item.X}</TableCell>
                                <TableCell>{item.Y}</TableCell>
                                <TableCell>{item.SVCOPNBGNDT}</TableCell>
                                <TableCell>{item.SVCOPNENDDT}</TableCell>
                                <TableCell>{item.RCPTBGNDT}</TableCell>
                                <TableCell>{item.RCPTENDDT}</TableCell>
                                <TableCell>{item.AREANM}</TableCell>
                                <TableCell>
                                    <a
                                        href={item.IMGURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        이미지
                                    </a>
                                </TableCell>
                            </>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default DataTable;
