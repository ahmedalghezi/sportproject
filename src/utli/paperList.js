import React, { useState } from "react";
import { Paper, List, ListItem, ListItemIcon, Checkbox, ListItemText } from "@material-ui/core";

const PaperList = ({ items, onCheckedItemsChanged }) => {
    const [checked, setChecked] = useState([]);

    const clearChecked = () => {
        setChecked([]);
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value.testid);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value.testid);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        onCheckedItemsChanged(newChecked);
    };

    return (
        <Paper sx={{ width: 200, maxHeight: 230, overflowY: "auto" }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.testid}-label`;

                    return (
                        <ListItem key={value.testid} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
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
    );
};


export default PaperList;

