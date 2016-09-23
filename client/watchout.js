// ENVIRONMENT SETUP

var gameOptions = {
  height: 450,
  width: 700,
  numEnemies: 15,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

// GAME BOARD SETUP

var axes = {
  x: d3.scale.linear()
      .domain([0, 100])
      .range([0, gameOptions.width]),
  y: d3.scale.linear()
      .domain([0, 100])
      .range([0, gameOptions.height])
};

var gameBoard = d3.select('.board')
                .append('svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height);

var updateScore = function() {
  return d3.select('.current')
          .text('Fix Me With Score Later');
};

var bestScore = 0;

var updateBestScore = function() {
  // var bestScore = Math.max(bestScore, currentScore)
  return d3.select('.highscore')
          .text('Fix me with Score Later');
};

// Helper function to implement range()

var range = function(start, count) {
  return Array.apply(0, Array(count))
    .map(function(e, i) {
      return i + start;
    });
};

var generateRandom = function(num) {
  return (num + 10) * Math.random() * 1753;
};

// Create enemies
var enemyData = range(0, gameOptions.numEnemies).map(function(i) {
  return i;
});

var enemies = gameBoard.selectAll('.enemy')
              .data(enemyData);

enemies.enter()
  .append('svg:circle')
  .attr('class', 'enemy')
  .attr('cx', function(d) {
    return generateRandom(d) % 700;
  })
  .attr('cy', function(d) {
    return generateRandom(d) % 450;
  })
  .attr('r', 10)
  .style('opacity', 1);

var move = function() {
  enemies.data(range(0, gameOptions.numEnemies))
          .transition().duration(900)
          .attr('cx', function(d) {
            return generateRandom(d) % 700;
          })
          .attr('cy', function(d) {
            return generateRandom(d) % 450;
          });
};

