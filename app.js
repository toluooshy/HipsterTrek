const express = require('express');
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
  
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'graphics')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');

app.use('/', routes);

app.post('/console', function(req, res) {
  var startgenre = req.body.start.toLowerCase();
  var endgenre = req.body.end.toLowerCase();
  async function fetch(){
    var payload = [];
    class PriorityQueue {
      constructor() {
        this.collection = [];
      }
      enqueue(element){
        if (this.isempty()){ 
          this.collection.push(element);
        } else {
          let added = false;
          for (let i = 1; i <= this.collection.length; i++){
            if (element[1] < this.collection[i-1][1]){ 
              this.collection.splice(i-1, 0, element);
              added = true;
              break;
            }
          }
          if (!added){
              this.collection.push(element);
          }
        }
      };
      dequeue() {
        let value = this.collection.shift();
        return value;
      };
      isempty() {
        return (this.collection.length === 0) 
      };
    }
    
    class Graph {
      constructor() {
        this.nodes = [];
        this.adjlist = {};
      }
      addnode(node) {
        this.nodes.push(node); 
        this.adjlist[node] = [];
      }
      addedge(nodeA, nodeB, weight) {
        this.adjlist[nodeA].push({node:nodeB, weight: weight});
        this.adjlist[nodeB].push({node:nodeA, weight: weight});
      }
      dijkstra(startnode, endnode) {
        let pathtimes = {};
        let backtrace = {};
        let pq = new PriorityQueue();
  
        pathtimes[startnode] = 0;
    
        this.nodes.forEach(node => {
          if (node !== startnode) {
            pathtimes[node] = Infinity
          }
        });
  
        pq.enqueue([startnode, 0]);
  
        while (!pq.isempty()) {
          let minstep = pq.dequeue();
          let currnode = minstep[0];
          
          this.adjlist[currnode].forEach(neighbor => {
            let time = pathtimes[currnode] + neighbor.weight;
            if (time < pathtimes[neighbor.node]) {
              pathtimes[neighbor.node] = time;
              backtrace[neighbor.node] = currnode;
              pq.enqueue([neighbor.node, time]);
            }
          });
        }
  
        let path = [endnode];
        let laststep = endnode;
        
        while(laststep !== startnode) {
          path.unshift(backtrace[laststep])
          laststep = backtrace[laststep]
        }
        return [path, pathtimes[endnode]]
      }
    }

    let map = new Graph();
    map.addnode("rap");
    map.addnode("drumandbass");
    map.addnode("randb");
    map.addnode("pop");
    map.addnode("rock");
    map.addnode("gospel");
    map.addnode("industrial");
    map.addnode("metal");
    map.addnode("lofi");
    map.addnode("reggae");
    map.addnode("funk");
    map.addnode("edm");
    map.addnode("jazz");
    map.addnode("blues");
    map.addnode("country");
    map.addnode("latin");
    map.addnode("theatre");
    map.addnode("world");
    map.addnode("hymns");
    map.addnode("classical");
    map.addnode("scores");
    map.addnode("alternative");
    map.addnode("band");
    map.addnode("traditional");
    map.addnode("grunge");
    map.addnode("motown");
    map.addnode("folk");

    // Core Genre Loop
    map.addedge("drumandbass", "industrial", 3);
    map.addedge("industrial", "rock", 3);
    map.addedge("rock", "pop", 3);
    map.addedge("pop", "country", 3);
    map.addedge("country", "blues", 3);
    map.addedge("blues", "motown", 3);
    map.addedge("motown", "jazz", 3);
    map.addedge("jazz", "reggae", 3);
    map.addedge("reggae", "rap", 3);
    map.addedge("rap", "drumandbass", 3);

    // Intertwined Genres
    map.addedge("metal", "industrial", 3);
    map.addedge("metal", "rock", 3);
    map.addedge("grunge", "rock", 3);
    map.addedge("grunge", "alternative", 3);
    map.addedge("alternative", "pop", 3);
    map.addedge("alternative", "country", 3);
    map.addedge("alternative", "folk", 3);
    map.addedge("folk", "country", 3);
    map.addedge("folk", "theatre", 3);
    map.addedge("folk", "hymns", 3);
    map.addedge("folk", "rock", 3);
    map.addedge("hymns", "traditional", 3);
    map.addedge("hymns", "classical", 3);
    map.addedge("hymns", "gospel", 3);
    map.addedge("traditional", "world", 3);
    map.addedge("classical", "scores", 3);
    map.addedge("classical", "world", 3);
    map.addedge("classical", "band", 3);
    map.addedge("world", "latin", 3);
    map.addedge("world", "edm", 3);
    map.addedge("theatre", "scores", 3);
    map.addedge("theatre", "band", 3);
    map.addedge("theatre", "motown", 3);
    map.addedge("theatre", "gospel", 3);
    map.addedge("latin", "reggae", 3);
    map.addedge("latin", "rap", 3);
    map.addedge("band", "jazz", 3);
    map.addedge("motown", "blues", 3);
    map.addedge("motown", "gospel", 3);
    map.addedge("motown", "jazz", 3);
    map.addedge("blues", "gospel", 3);
    map.addedge("blues", "randb", 3);
    map.addedge("gospel", "randb", 3);
    map.addedge("funk", "jazz", 3);
    map.addedge("funk", "randb", 3);
    map.addedge("lofi", "rap", 3);
    map.addedge("lofi", "drumandbass", 3);
    map.addedge("edm", "drumandbass", 3);
    map.addedge("edm", "pop", 3);
    map.addedge("randb", "jazz", 3);
    map.addedge("randb", "rap", 3);

    // Leaf Genres (add leaves to the aformentioned genres)

    payload = map.dijkstra(startgenre,endgenre);
    res.render('console', {data:payload});

  }
  fetch();
});

app.use('/', function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening at http://localhost:5000`)
});