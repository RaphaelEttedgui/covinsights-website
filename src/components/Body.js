import React from "react";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

/*
The Paper will be hidden on mobile, and serves to contrast
with the background in a blog-like style.
*/

const Body = ({ children }) => {
        return (
            <div className="behind_body">
                    <Paper elevation={3} className="paper_body">
                    <div className="inside_body">
                {children}
                    </div>
                    </Paper>
            </div>
        )
}

export default Body;