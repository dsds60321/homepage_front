/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { format } from 'date-fns';

const TableContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const SearchConditions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;

const Badge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: ${props => props.available ? '#28a745' : '#dc3545'};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ced4da;
  background-color: ${props => props.active ? '#007bff' : '#fff'};
  color: ${props => props.active ? '#fff' : '#007bff'};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.active ? '#007bff' : '#e9ecef'};
  }
`;

const ReservationTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 예시 데이터
  const reservations = useMemo(() => [
    { id: 1, name: 'John Doe', date: new Date(2023, 7, 1, 14, 30), available: true },
    { id: 2, name: 'Jane Smith', date: new Date(2023, 7, 2, 10, 0), available: false },
    // ... 더 많은 예약 데이터 추가
  ], []);

  const filteredReservations = useMemo(() => {
    return reservations.filter(reservation => {
      if (searchType === 'name') {
        return reservation.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchType === 'date') {
        return format(reservation.date, 'yyyy-MM-dd').includes(searchTerm);
      } else {
        return (
          reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          format(reservation.date, 'yyyy-MM-dd').includes(searchTerm)
        );
      }
    });
  }, [reservations, searchTerm, searchType]);

  const pageCount = Math.ceil(filteredReservations.length / itemsPerPage);
  const currentItems = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <TableContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchConditions>
          <Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="all">All</option>
            <option value="name">Name</option>
            <option value="date">Date</option>
          </Select>
        </SearchConditions>
      </SearchContainer>
      <Table>
        <thead>
        <tr>
          <Th>Name</Th>
          <Th>Date</Th>
          <Th>Status</Th>
        </tr>
        </thead>
        <tbody>
        {currentItems.map(reservation => (
          <tr key={reservation.id}>
            <Td>{reservation.name}</Td>
            <Td>{format(reservation.date, 'yyyy-MM-dd HH:mm')}</Td>
            <Td>
              <Badge available={reservation.available}>
                {reservation.available ? 'Available' : 'Unavailable'}
              </Badge>
            </Td>
          </tr>
        ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(number => (
          <PageButton
            key={number}
            active={number === currentPage}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </PageButton>
        ))}
      </Pagination>
    </TableContainer>
  );
};

export default ReservationTable;