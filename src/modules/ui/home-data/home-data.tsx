import React, {FunctionComponent} from 'react';
import './all-graph-container/all-graphs-container.scss'
import Summary from "./summary/summary";
import AllGraphsContainer from "./all-graph-container/all-graphs-container";

const HomeData: FunctionComponent = () => {
    return (
        <div className="home-data">
            <div className="home-data-summary">
                <Summary/>
            </div>
            <div className="home-data-graphs">
                <AllGraphsContainer/>
            </div>
        </div>
    )
}


export default HomeData;
