import styled from "@emotion/styled/dist/emotion-styled.cjs.js";

export const TableContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

export const SearchConditions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const Select = styled.select`
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  background-color: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;

export const Badge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: ${props => props.available ? '#28a745' : '#dc3545'};
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageButton = styled.button`
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