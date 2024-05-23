import React, { useState, useEffect } from "react";
import { useTable, useExpanded } from 'react-table';
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import axios from 'axios';

const AthleteFilesTable = () => {
    const [data, setData] = useState([]);
    const [renamingFile, setRenamingFile] = useState(null);
    const [newFileName, setNewFileName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://inprove-sport.info/files/getMyFiles');
            setData(result.data);
        };
        fetchData();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                id: 'expander',
                Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                    <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? <FiChevronDown /> : <FiChevronRight />}
          </span>
                ),
                Cell: ({ row }) =>
                    row.canExpand ? (
                        <span
                            {...row.getToggleRowExpandedProps({
                                style: {
                                    paddingLeft: `${row.depth * 2}rem`,
                                },
                            })}
                        >
              {row.isExpanded ? <FiChevronDown /> : <FiChevronRight />}
            </span>
                    ) : null,
            },
            {
                Header: 'File Name',
                accessor: 'file_name',
                Cell: ({ cell: { value } }) => {
                    if (renamingFile === value) {
                        return (
                            <input
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                                onBlur={() => {
                                    renameFile(value, newFileName);
                                    setRenamingFile(null);
                                }}
                                autoFocus
                            />
                        );
                    }
                    return (
                        <span
                            onDoubleClick={() => {
                                setNewFileName(value);
                                setRenamingFile(value);
                            }}
                        >
              {value}
            </span>
                    );
                },
            },
            {
                Header: 'Folder Name',
                accessor: 'folder_name',
            },
        ],
        [renamingFile, newFileName]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        { columns, data },
        useExpanded
    );

    const renameFile = (oldName, newName) => {
        // Logic to rename file goes here
        console.log(`Rename ${oldName} to ${newName}`);
    };

    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} key={i}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default AthleteFilesTable;
