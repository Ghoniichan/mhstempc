import React from 'react';
import Table from 'react-bootstrap/Table';
import './CustomTable.css';

interface CustomTableProps {
  columnHeadings: string[];
  rows: Array<Array<React.ReactNode>>;
  className?: string;
  onRowClick?: (row: Array<React.ReactNode>) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columnHeadings,
  rows,
  className,
  onRowClick
}) => {
  return (
    <div className={`custom-table-wrapper ${className || ''}`}>
      <Table hover bordered className="custom-table w-100">
        <thead>
          <tr>
            {columnHeadings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                onClick={() => onRowClick?.(row)}
              >
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnHeadings.length} className="text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomTable;
