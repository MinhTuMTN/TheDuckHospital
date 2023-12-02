import { Breadcrumbs, styled } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BreadcrumbRoot = styled(`div`)(({ theme }) => ({
    padding: `${theme.spacing(5)} 0 0 ${theme.spacing(5)}`,
    width: "100%",
    height: "15vh",
    background: "linear-gradient(to right, #006451, #86C8BC)",
}));

const BreadcrumbLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    fontFamily: "sans-serif",
    color: "#E4FFEB",
    fontSize: "22px",

    "&:hover": {
        color: "#FFFFFF"
    }
}));

function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((crumb) => crumb !== '');

    return (
        <BreadcrumbRoot>
            <Breadcrumbs separator="›" color="#FFFFFF">
                <BreadcrumbLink to="/">Home</BreadcrumbLink>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return <BreadcrumbLink key={name} to={routeTo}>{name.charAt(0).toUpperCase() + name.slice(1)}</BreadcrumbLink>

                })}
            </Breadcrumbs>
        </BreadcrumbRoot>
    );
}

export default Breadcrumb;