// buildStats() function to pull Stats data and create Plotly plots
function buildStats(playerName) {
  // set var url = '<flask_route>' + playerName
  console.log(playerName);

  var url = "/stats/" + playerName;
  // d3.js to fetch data for the plots
  d3.json(url).then(function(response) {
    console.log(response);
    // plot1 xaxis = Year, yaxis = FTM per year

    //trace data
    var trace1 = {
      x: response.year,
      y: response.free_throws_made,
      type: 'scatter',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data1 = [trace1];

    var layout1 = {
      title: 'Free Throws Made by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Free Throws Made',
          titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot1', data1, layout1);

    // plot2 plot 2 xaxis = year, yaxis = fgm per year
    var trace2 = {
      x: response.year,
      y: response.field_goals_made,
      type: 'scatter',
      marker: {
        color: 'rgb(0, 0, 255)',
        size: 12
      }
    };

    var data2 = [trace2];

    var layout2 = {
      title: 'Field Goals Made by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Arial, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Free Throws Made',
          titlefont: {
            family: 'Arial, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot2', data2, layout2);
    // plot3 plot 3
    });
};

function buildStats2(playerName) {
  // set var url = '<flask_route>' + playerName
  console.log(playerName);

  var url = "/stats/" + playerName;
  // d3.js to fetch data for the plots
  d3.json(url).then(function(response) {
    console.log(response);
    // plot1 xaxis = Year, yaxis = FTM per year

    //trace data
    var trace1 = {
      x: response.year,
      y: response.free_throws_made,
      type: 'scatter',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data1 = [trace1];

    var layout1 = {
      title: 'Free Throws Made by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Free Throws Made',
          titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot3', data1, layout1);

    // plot2 plot 2 xaxis = year, yaxis = fgm per year
    var trace2 = {
      x: response.year,
      y: response.field_goals_made,
      type: 'scatter',
      marker: {
        color: 'rgb(0, 0, 255)',
        size: 12
      }
    };

    var data2 = [trace2];

    var layout2 = {
      title: 'Field Goals Made by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Arial, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Free Throws Made',
          titlefont: {
            family: 'Arial, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot4', data2, layout2);
    // plot3 plot 3
    });
};

// buildNews() function to pull News data and insert it into HTML page
function buildNews(playerName) {
  //set var url = '<flask_route>' + playerName

  // d3.js to fetch news data for sample
    // select the div id for where the news is going to go, set it to var news

    // clear html using news.html("")

    // use object.entries to insert the news
};

function init() {
  // first set of stats
  var selector = d3.select("#selDataset");
  // use list of player names to populate the dropdown
  d3.json("/names").then((playerNames) => {
    playerNames.forEach((player) => {
      selector
        .append("option")
        .text(player)
        .property("value", player);
    });

  // use first player name on the list to build initial plots
  const firstPlayer = playerNames[0];
  buildStats(firstPlayer);

  });

  // for the second set of stats
  var secondSelector = d3.select("#selDataset2");

  // use list of player names to populate the dropdown
  d3.json("/names").then((playerNames) => {
    playerNames.forEach((player) => {
      secondSelector
        .append("option")
        .text(player)
        .property("value", player);
    });

  console.log(playerNames);
  // use first player name on the list to build initial plots
  const secondPlayer = playerNames[0];
  buildStats2(secondPlayer);

  });
};

function optionChanged(newPlayer) {
  buildStats(newPlayer);
  // bulidNews(newPlayer);
};

function optionChanged2(newPlayer) {
  buildStats2(newPlayer);
  // bulidNews(newPlayer);
};

init();
