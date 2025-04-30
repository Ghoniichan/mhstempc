import React from 'react';
import Table from 'react-bootstrap/Table';

interface CustomTableProps {
    columnHeadings: string[];
    rows: Array<Array<string>>; 
    className?: string
}

const CustomTable: React.FC<CustomTableProps> = ({ columnHeadings, rows }) => {
    return (
        <div className="table-responsive">
            <Table hover>
                <thead>
                    <tr>
                        {columnHeadings.map((heading, index) => (
                            <th key={index}>{heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CustomTable;