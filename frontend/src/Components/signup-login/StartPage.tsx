import { ReactElement } from "react";
import { Outlet } from 'react-router-dom';

const StartPage = (): ReactElement => {
    // React Element with Router Outlet to switch between login/signup
    return (
        <section className="start-page">
            <h1>Wedding Photographer</h1>
            <Outlet />
        </section>
    )
}

export default StartPage;