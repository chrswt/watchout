// ENVIRONMENT SETUP

var gameOptions = {
  height: 450,
  width: 700,
  numEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
}

// GAME BOARD SETUP

var axes = {
  x: d3.scale.linear()
      .domain([0, 100])
      .range([0, gameOptions.width]),
  y: d3.scale.linear()
      .domain([0, 100])
      .range([0, gameOptions.height])
}

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

// Create enemies
var enemyData = range(0, gameOptions.numEnemies).map(function(i) {
  return {
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100
  };
});

var enemies = gameBoard.selectAll('.enemy')
              .data(enemyData, function(d) {
                return d.id;
              });

enemies.enter()
  .append('svg:circle')
  .attr('class', 'enemy')
  .attr('cx', function(enemy) {
    return enemy.x;
  })
  .attr('cy', function(enemy) {
    return enemy.y;
  })
  .attr('r', 10)
  .style('opacity', 1);
