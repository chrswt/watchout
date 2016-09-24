// ENVIRONMENT SETUP

var gameOptions = {
  height: 450,
  width: 700,
  numEnemies: 15,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0
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
                .attr('border', 10)
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height);

// d3.select('svg').append('rect').attr('x', 0).attr('y', 0)
//   .attr('height', gameOptions.height).attr('width', gameOptions.width)
//   .style('stroke', 'black').style('fill', 'none').style('stroke-width', 1);

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

var asteroidStr = 'url(#image2)';
var shurikenStr = 'url(#image)';

var initialize = function() {
  enemies.enter()
    .append('circle')
    .style('fill', shurikenStr)
    // .append('svg:image')
    // .attr('xlink:href', 'asteroid.png')
    // .attr('width', 22)
    // .attr('height', 22)
    // .attr('x', 100)
    // .attr('y', 100)


    .attr('class', 'enemy')
    .attr('cx', function(d) {
      return generateRandom(d) % 700;
    })
    .attr('cy', function(d) {
      return generateRandom(d) % 450;
    })
    .attr('r', 15)
    .style('opacity', 1);
};

var move = function() {
  enemies.data(range(0, gameOptions.numEnemies))
          .transition().duration(900)
          .attr('cx', function(d) {
            return generateRandom(d) % 660 + 20;
          })
          .attr('cy', function(d) {
            return generateRandom(d) % 410 + 20;
          });
};

var playerObj = {
  x: 350,
  y: 225,
};

var drag = d3.behavior.drag()
    .on('drag', function(d, i) {
      d.x += d3.event.dx;
      d.y += d3.event.dy;
      d.x = Math.min(d.x, 680);
      d.y = Math.min(d.y, 430);
      d.x = Math.max(20, d.x);
      d.y = Math.max(20, d.y);
      d3.select(this).attr('transform', function(d, i) {
        return 'translate(' + [ d.x, d.y ] + ')';
      });
    });

var player = gameBoard.selectAll('.player')
             .data([playerObj]).enter().append('circle').attr('class', 'player')
             .attr('transform', 'translate(' + playerObj.x + ',' + playerObj.y + ')')
             .attr('r', 10).attr('fill', 'red').call(drag);

var checkCollision = function() {
  d3.selectAll('.enemy').each(function(d) {
    var enemyX = d3.select(this).attr('cx');
    var enemyY = d3.select(this).attr('cy');
    var xDiff = Math.abs(enemyX - playerObj.x);
    var yDiff = Math.abs(enemyY - playerObj.y);
    var actualDistance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

    if (actualDistance < 20) {
      gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
      gameStats.score = 0;
      gameStats.collisions++;
      return true;
    }
  });

  d3.select('.current').text('Current Score: ' + gameStats.score++);
  d3.select('.highscore').text('High Score: ' + gameStats.bestScore);
  d3.select('.collisions').text('Collisions: ' + gameStats.collisions);
};

setInterval(checkCollision, 40);
initialize();
setInterval(move, 1000);
