import React, { useEffect, useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Tooltip, Legend, Title, ArcElement, BarElement, CategoryScale, LinearScale);

const NpmPackageStatsGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [key, setKey] = useState("");
  const [score, setScore] = useState(null);
  const [finalScoreData, setFinalScoreData] = useState(null);
  const [k, setK] = useState(0);

  useEffect(() => {
    if (key) {
      axios.get(`https://api.npmjs.org/downloads/range/last-year/${key}`)
        .then(response => {
          const data = response.data;
          const labels = data.downloads.map(entry => entry.day);
          const values = data.downloads.map(entry => entry.downloads);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Downloads',
                data: values,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                pointBorderColor: '#FF6384',
                pointBackgroundColor: '#FF6384',
                pointHoverBackgroundColor: '#FFCE56',
                pointHoverBorderColor: '#FF6384',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
              }
            ]
          });
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [k, key]);

  useEffect(() => {
    if (key) {
      axios.get(`https://api.npms.io/v2/package/${key}`)
        .then(response => {
          const { popularity, quality, maintenance } = response.data.score.detail;
          setScore({
            labels: ['Popularity', 'Quality', 'Maintenance'],
            datasets: [
              {
                data: [popularity, quality, maintenance],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderWidth: 1,
                borderColor: 'white',
              },
            ],
          });

          setFinalScoreData({
            labels: ['Final Score'],
            datasets: [
              {
                label: 'Score',
                data: [response.data.score.final],
                backgroundColor: '#4BC0C0',
                borderColor: 'white',
                borderWidth: 1,
              }
            ],
          });
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [k, key]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 5,
        caretSize: 6,
      },
      title: {
        display: true,
        text: 'NPM Package Scores',
        color: 'white',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        color: 'white',
      },
    },
    // scales: {
    //   x: {
    //     ticks: {
    //       color: 'white',
    //     },
    //   },
    //   y: {
    //     ticks: {
    //       color: 'white',
    //     },
    //   },
    // },
  };

  const chartOptions1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 5,
        caretSize: 6,
      },
      title: {
        display: true,
        text: 'NPM Package Scores',
        color: 'white',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 5,
        caretSize: 6,
      },
      title: {
        display: true,
        text: 'Final Score of NPM Package',
        color: 'white',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  const handleClick = () => {
    setK(k + 1);
  };

  return (
    <>
      <nav className="px-6 py-2 bg-gray-700 md:flex ">
        <div className="flex justify-between items-center">
          <div className="text-2xl text-white font-bold hover:text-gray-800">
            <a href="#">StatPac</a>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="block text-white hover:text-white focus:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full pb-2 md:flex md:items-center md:justify-between md:pb-0">
          <div className="flex flex-col px-2 md:flex-row">
            <a
              href="#"
              className="py-2 px-2 text-white rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium md:mx-2"
            >
              Home
            </a>
            <a
              href="#"
              className="py-2 px-2 text-white rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium md:mx-2"
            >
              About
            </a>
            <a
              href="#"
              className="py-2 px-2 text-white rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium md:mx-2"
            >
              Contact
            </a>
          </div>
          <div className="flex items-center">
            <input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              type="text"
              className="w-full px-4 py-3 mx-4 leading-tight text-sm text-gray-400 bg-gray-900 rounded placeholder-gray-200 focus:outline-none focus:shadow-outline"
              placeholder="Search NPM Package"
            />
            <button onClick={handleClick} className="text-white hover:text-green-300">
              Search
            </button>
          </div>
        </div>
      </nav>

      <div style={{ position: 'relative', height: '80vh', width: '100vw' }} className='bg-slate-950'>
        {chartData ? (
          <Line data={chartData} options={chartOptions1} />
        ) : (
          <div className="flex flex-col justify-center items-center h-[70vh] bg-gray-950">
            <p className="text-white text-2xl text-center pt-20">Loading data, please search for a package...</p>
            <img src="com.gif" alt="Loading animation" className="h-[70vh]" />
          </div>
        )}
      </div>

      <div className='bg-slate-600 text-white text-center' style={{ height: '400px', width: '100%', padding: '20px' }}>
        {score ? (
          <Pie data={score} options={chartOptions} />
        ) : (
          <p>Loading Pie Chart...</p>
        )}
      </div>

      <div className='bg-slate-800 text-white text-center' style={{ height: '400px', width: '100%', padding: '20px' }}>
        {finalScoreData ? (
          <Bar data={finalScoreData} options={barChartOptions} />
        ) : (
          <p>Loading Bar Chart...</p>
        )}
      </div>
    </>
  );
};

export default NpmPackageStatsGraph;
