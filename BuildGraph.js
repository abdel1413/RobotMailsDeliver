//import roads from "./Destination.js";

const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

function BuildGraph(edges) {
  let graph = Object.create(null);

  //create a function to add edge
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
      // console.log(graph[from]); //["Alice's House-Bob's House"...]
    } else {
      graph[from].push(to);

      // console.log(graph);
    }
  }

  //loop thru edges to add each edge to the graph
  for (let [from, to] of edges.map((e) => e.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

const roadGraph = BuildGraph(roads);

// class VillageState {
//   constructor(place, parcels) {
//     this.place = place;
//     this.parcels = parcels;
//   }

//   move(destination) {
//     if (!roadGraph[this.place].includes(destination)) {
//       return this;
//     } else {
//       let parcels = this.parcels
//         .map((p) => {
//           if (p.place != this.place) return p;

//           return { place: destination, address: p.address };
//         })
//         .filter((p) => {
//           p.place != p.address;
//         });
//       return new VillageState(destination, parcels);
//     }
//   }
// }

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}
let first = new VillageState("Post Office", [
  { place: " Post Office", address: "Alice's House" },
]);

console.log(first); //VillageState {place: 'Post Office', parcels: Array(1)}
let next = first.move("Alice's House");
console.log(next.place); //Alice's House

console.log(next.parcels); //[]

//for the robot to move, we need to pass state and memory
//so it can make and execute some plans
function runRobot(state, robot, memmory) {
  //loop thru the turns and check if the parcels are done
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    //robot making action
    let action = robot(state, memmory);
    state = state.move(action.direction);
    memmory = action.memmory;
    console.log(`Moved to ${action.direction}`);
  }
}

//create a function where the robot picks up parcels
// by visiting every location and delivering them to every
//location.
//Remember that the robot could pick random direction at each turn

function RandomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

//random robot
function randomRobot(state) {
  return { direction: RandomPick(roadGraph[state.place]) };
}

//create a nes state with some parcels and add some method to
//to the constructor
VillageState.random = function (parcelsCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelsCount; i++) {
    let address = RandomPick(Object.keys(roadGraph));
    let place;
    do {
      place = RandomPick(Object.keys(roadGraph));
    } while (place == address);

    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

//virtual world
runRobot(VillageState.random(), randomRobot);
