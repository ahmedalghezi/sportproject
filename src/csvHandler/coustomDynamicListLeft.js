import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const ResizablePaper = ({ children, initialHeight = 230, width = 200 }) => {
    const [height, setHeight] = useState(initialHeight);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e) => {
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newHeight = Math.max(50, e.clientY - e.target.offsetTop);
            setHeight(newHeight);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            style={{
                width,
                height,
                position: "relative",
                overflow: "auto",
                border: "1px solid #ccc",
            }}
            onMouseMove={isDragging ? handleMouseMove : undefined}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {children}
            <div
                style={{
                    height: "5px",
                    background: "#ccc",
                    cursor: "row-resize",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

const customListLeftDynamic2 = (items, handleToggleLeft, checkedLeft) => (
    <ResizablePaper>
        <Paper sx={{ width: 200, height: "100%", overflow: "auto" }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.testid}-label`;

                    return (
                        <ListItem
                            key={value.testid}
                            role="listitem"
                            button
                            onClick={handleToggleLeft(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checkedLeft.indexOf(value.testid) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        "aria-labelledby": labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.testname}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    </ResizablePaper>
);


const customListLeftDynamic = (items, handleToggleLeft, checkedLeft) => (
    <ResizablePaper>
        <Paper sx={{ width: 200, height: "100%", overflow: "auto" }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.testid}-label`;

                    return (
                        <ListItem
                            key={value.testid}
                            role="listitem"
                            button
                            onClick={() => handleToggleLeft(value)} // Corrected here
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checkedLeft.indexOf(value.testid) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        "aria-labelledby": labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.testname}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    </ResizablePaper>
);


export default customListLeftDynamic;
