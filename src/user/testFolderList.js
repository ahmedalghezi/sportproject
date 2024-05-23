


import React from 'react';
import LinkList from './LinkList';

const links = [
    { folder1: [
            { name: "File 1", url: "https://example.com/folder1/file1" },
            { name: "File 2", url: "https://example.com/folder1/file2" },
            { name: "File 3", url: "https://example.com/folder1/file3" },
            { name: "File 1", url: "https://example.com/folder1/file1" },
            { name: "File 2", url: "https://example.com/folder1/file2" },
            { name: "File 3", url: "https://example.com/folder1/file3" },
            { name: "File 1", url: "https://example.com/folder1/file1" },
            { name: "File 2", url: "https://example.com/folder1/file2" },
            { name: "File 3", url: "https://example.com/folder1/file3" },
            { name: "File 1", url: "https://example.com/folder1/file1" },
            { name: "File 2", url: "https://example.com/folder1/file2" },
            { name: "File 3", url: "https://example.com/folder1/file3" },
            { name: "File 1", url: "https://example.com/folder1/file1" },
            { name: "File 2", url: "https://example.com/folder1/file2" },
            { name: "File 3", url: "https://example.com/folder1/file3" },
        ]
    },
    { folder2: [
            { name: "File 1", url: "https://example.com/folder2/file1" },
            { name: "File 2", url: "https://example.com/folder2/file2" },
        ]
    },
    { folder3: [
            { name: "File 1", url: "https://example.com/folder3/file1" },
        ]
    },
];

const TestFolderList = () => (
    <div>
        <h1>Links</h1>
        <LinkList links={links} />
    </div>
);

export default TestFolderList;

