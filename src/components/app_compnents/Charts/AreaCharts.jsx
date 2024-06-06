import Chart from 'react-apexcharts';

const AreaCharts = () => {
    const series = [{
        name: "Sample Data",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }];
      const options = {
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        grid: {
          show: false
        },
        tooltip: {
          enabled: false
        },
        fill: {
          opacity: 1
        },
        legend: {
          show: false
        }
      };

      return (
        <div>
          <Chart options={options} series={series} type="area" height={350} />
        </div>
      );

};

export default AreaCharts;