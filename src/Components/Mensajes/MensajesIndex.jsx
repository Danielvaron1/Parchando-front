import {Divider, ListItem, ListItemAvatar, ListItemText, Stack} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from 'react';
import {deepPurple} from "@mui/material/colors";
import {Link} from "react-router-dom";


const MensajesIndex = () => {
    return (
        <Stack>
            <div className="scrollable" style={{flexGrow: 1, overflowY: "auto", padding: 16, height: "90vh"}}>
                <ListItem alignItems="flex-start" to={"/Chat"} component={Link} button>
                    <ListItemAvatar>
                        <Avatar alt={"user.name"} sx={{bgcolor: deepPurple[400]}} aria-label="recipe"
                                src="https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jp">
                            A
                            {/*{user.name.charAt(0).toUpperCase()}*/}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Dante Varón"
                        secondary={
                            <React.Fragment>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="middle"/>


            </div>
        </Stack>
    );
}

export default MensajesIndex;