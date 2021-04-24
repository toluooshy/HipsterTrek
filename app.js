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
    map.addnode("Rap");
    map.addnode("DrumNBass");
    map.addnode("RNB");
    map.addnode("Pop");
    map.addnode("Rock");
    map.addnode("Gospel");
    map.addnode("Industrial");
    map.addnode("Metal");
    map.addnode("LoFi");
    map.addnode("Reggae");
    map.addnode("Funk");
    map.addnode("EDM");
    map.addnode("Jazz");
    map.addnode("Blues");
    map.addnode("Country");
    map.addnode("Latin");
    map.addnode("Theatre");
    map.addnode("International");
    map.addnode("Hynms");
    map.addnode("Classical");
    map.addnode("Scores");
    map.addnode("Alternative");
    map.addnode("Band");
    map.addnode("Traditional");
    map.addnode("Grunge");
    map.addnode("Mowtown");
    map.addnode("Folk");

    // Core Genre Loop
    map.addedge("DrumNBass", "Industrial", 3);
    map.addedge("Industrial", "Rock", 3);
    map.addedge("Rock", "Pop", 3);
    map.addedge("Pop", "Country", 3);
    map.addedge("Country", "Blues", 3);
    map.addedge("Blues", "Mowtown", 3);
    map.addedge("Mowtown", "Jazz", 3);
    map.addedge("Jazz", "Reggae", 3);
    map.addedge("Reggae", "Rap", 3);
    map.addedge("Rap", "DrumNBass", 3);

    // Intertwined Genres
    map.addedge("Metal", "Industrial", 3);
    map.addedge("Metal", "Rock", 3);
    map.addedge("Grunge", "Rock", 3);
    map.addedge("Grunge", "Alternative", 3);
    map.addedge("Alternative", "Pop", 3);
    map.addedge("Alternative", "Country", 3);
    map.addedge("Alternative", "Folk", 3);
    map.addedge("Folk", "Country", 3);
    map.addedge("Folk", "Theatre", 3);
    map.addedge("Folk", "Hynms", 3);
    map.addedge("Folk", "Rock", 3);
    map.addedge("Hynms", "Traditional", 3);
    map.addedge("Hynms", "Classical", 3);
    map.addedge("Hynms", "Gospel", 3);
    map.addedge("Traditional", "International", 3);
    map.addedge("Classical", "Scores", 3);
    map.addedge("Classical", "International", 3);
    map.addedge("Classical", "Band", 3);
    map.addedge("International", "Latin", 3);
    map.addedge("International", "EDM", 3);
    map.addedge("Theatre", "Scores", 3);
    map.addedge("Theatre", "Band", 3);
    map.addedge("Theatre", "Mowtown", 3);
    map.addedge("Theatre", "Gospel", 3);
    map.addedge("Latin", "Reggae", 3);
    map.addedge("Latin", "Rap", 3);
    map.addedge("Band", "Jazz", 3);
    map.addedge("Mowtown", "Blues", 3);
    map.addedge("Mowtown", "Gospel", 3);
    map.addedge("Mowtown", "Jazz", 3);
    map.addedge("Blues", "Gospel", 3);
    map.addedge("Blues", "RNB", 3);
    map.addedge("Gospel", "RNB", 3);
    map.addedge("Funk", "Jazz", 3);
    map.addedge("Funk", "RNB", 3);
    map.addedge("LoFi", "Rap", 3);
    map.addedge("LoFi", "DrumNBass", 3);
    map.addedge("EDM", "DrumNBass", 3);
    map.addedge("EDM", "Pop", 3);
    map.addedge("RNB", "Jazz", 3);
    map.addedge("RNB", "Rap", 3);

    // Leaf Genres (add leaves to the aformentioned genres)

    payload = map.dijkstra(req.body.start,req.body.end);
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

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server listening at http://localhost:8000`)
});