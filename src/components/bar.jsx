import React from "react";
import {Bar} from "react-chartjs-2"
import {Chart as ChartJS } from "chart.js/auto"

function Barchart({data1}) {
    return(
        <Bar data={data1} />
    );
}

export default Barchart;