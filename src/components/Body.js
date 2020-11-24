import React from "react";
import Container from '@material-ui/core/Container';

const Body = ({ children }) => {
        return (
            <div className="behind_body">
                <Container maxWidth="sm" className="my_body">
                    <div className="inside_body">
                {children}
                    </div>
                </Container>
            </div>
        )
}

export default Body;