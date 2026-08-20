import React from "react";
import Mainbar from '../components/Mainbar'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Statscard from '../components/Statscard'
import Topscorer from '../components/Topscorer'
function Statistics() {
    return (
        <>
            <Navbar />
            <section className="hero">
                <Sidebar />
                <Mainbar />
            </section>

        </>
    )
}
export default Statistics;