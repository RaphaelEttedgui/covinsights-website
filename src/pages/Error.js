import React from 'react';
import { Helmet } from 'react-helmet';
 
const Error = () => {
    return (
       <div>
          <Helmet>
            <title>
            404 error
          </title>
            </Helmet>      
          <p>Error: Page does not exist!</p>
       </div>
    );
}
 
export default Error;