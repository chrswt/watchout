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

var initialize = function() {
  enemies.enter()
    .append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(d) {
      return generateRandom(d) % 700;
    })
    .attr('cy', function(d) {
      return generateRandom(d) % 450;
    })
    .attr('r', 10)
    .style('opacity', 1);
};

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

var playerObj = {
  x: 350,
  y: 225,
};

var drag = d3.behavior.drag()
    .on('drag', function(d, i) {
      console.log('d.x', d.x, 'eventx', d3.event.dx);
      d.x += d3.event.dx;
      d.y += d3.event.dy;
      d3.select(this).attr('transform', function(d, i) {
        return 'translate(' + [ d.x, d.y ] + ')';
      });
    });

var player = gameBoard.selectAll('.player')
             .data([playerObj]).enter().append('circle')
             .attr('transform', 'translate(' + playerObj.x + ',' + playerObj.y + ')')
             .attr('r', 10).attr('fill', 'red').call(drag);




initialize();
setInterval(move, 1000);
