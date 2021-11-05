import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

type MainContentProps = {
    children: JSX.Element;
};
const MainContent: React.FunctionComponent<MainContentProps> = ({ children }): JSX.Element => {
    return (
        <div className="mainContain" style={{ paddingRight: '0px', paddingLeft: '0px', marginTop: '1.2rem' }}>
            <div className="layout-px-spacing">
                <div className="widget-content widget-content-area br-6">{children}</div>
            </div>
        </div>
    );
};

export default MainContent;
