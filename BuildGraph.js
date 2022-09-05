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
  for (let [from, to] of edges.map((e) => e.split("_"))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

const roadGraph = BuildGraph(roads);

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
        .filter((p) => {
          p.place != p.address;
        });
      return new VillageState(destination, parcels);
    }
  }
}
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
//         .filter((p) => p.place != p.address);
//       return new VillageState(destination, parcels);
//     }
//   }
// }

let first = new VillageState("Post Office", [
  { place: " Post Office", address: "Alice's House" },
]);

console.log(first);
let next = first.move("Alice's House");
console.log(next.place);

console.log(first.place);
console.log(first.address);
console.log(first.move("Alice's House"));
