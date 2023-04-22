import { writable } from "svelte/store";

const BoardStore = writable([
  {
    id: 1,
    title: "Board 1",
    status: ["TODO", "DOING", "DONE"],
    tasks: [
      {
        id: 1,
        title: "Eat more donuts",
        description: "Donuts are healthy, I don't care what other people think.",
        status: "TODO",
      },
      {
        id: 2,
        title: "Eat more donuts",
        description: "Donuts are healthy, I don't care what other people think.",
        status: "DOING",
      },
    ],
  },
  {
    id: 2,
    title: "Board 2",
    status: ["TODO", "DOING", "DONE", "EXAMPLE", "TESTING"],
    tasks: [
      {
        id: 1,
        title: "Eat more donuts",
        description: "Donuts are healthy, I don't care what other people think.",
        status: "TODO",
      },
      {
        id: 2,
        title: "Eat more donuts",
        description: "Donuts are healthy, I don't care what other people think.",
        status: "DOING",
      },
      {
        id: 3,
        title: "Eat more donuts",
        description: "Donuts are healthy, I don't care what other people think.",
        status: "DOING",
      },
      {
        id: 4,
        title: "Eat more donuts",
        description: "Donuts are healthy, I don't care what other people think.",
        status: "DONE",
      },
    ],
  },
]);

export default BoardStore;
