<script>
     import BoardStore from "../../stores/boardStore";

     let specificId;
     let darkTheme = false;
     let numberOfBoards = 0;

     const findBoard = (id) => {
          specificId = id;
     };

     const createBoard = () => {
          let board = {
               id: 3,
               title: "Board 3",
               status: ["TODO", "DOING", "DONE"],
               tasks: [
                    {
                         id: 1,
                         title: "task 1",
                         status: "TODO",
                    },
                    {
                         id: 2,
                         title: "task 2",
                         status: "DOING",
                    },
               ],
          };

          BoardStore.update(currentBoards => {
               return [...currentBoards, board];
          });
     }

     const createTask = () => {
          let task = {
               id: 3,
               title: "task 3",
               status: "DONE",
          };

          BoardStore.update(currentBoards => {
               let copiedBoards = [...currentBoards];
               let updatedBoard = copiedBoards.find(board => board.id === specificId);
               
               updatedBoard.tasks.push(task);

               return copiedBoards;
          });
     };

     const deleteBoard = () => {
          BoardStore.update(currentBoards => {
               return currentBoards.filter(board => board.id !== specificId);
          });
     };

     const renameBoard = () => {
          BoardStore.update(currentBoards => {
               let copiedBoards = [...currentBoards];
               let updatedBoard = copiedBoards.find(board => board.id === specificId);
               
               updatedBoard.title = "I Renamed this board";

               return copiedBoards;
          });
     };

     const deleteTask = (id) => {
          BoardStore.update(currentBoards => {
               let copiedBoards = [...currentBoards];
               let updatedBoard = copiedBoards.find(board => board.id === specificId);
               let tasks = updatedBoard.tasks;
               let filteredTask = tasks.filter(task => task.id === id);
               filteredTask.forEach(f => tasks.splice(tasks.findIndex(task => task.id === f.id),1));

               return copiedBoards;
          });
     };

     const editTask = (id) => {
          BoardStore.update(currentBoards => {
               let copiedBoards = [...currentBoards];
               let updatedBoard = copiedBoards.find(board => board.id === specificId);

               let tasks = updatedBoard.tasks;
               let filteredTask = tasks.filter(task => task.id === id);
               
               filteredTask[0].title = "task 4";
               filteredTask[0].status = "DONE"

               return copiedBoards;
          });
     };

     const createColumn = () => {
          BoardStore.update(currentBoards => {
               let copiedBoards = [...currentBoards];
               let updatedBoard = copiedBoards.find(board => board.id === specificId);
               
               updatedBoard.status.push("PROCESS");
               
               return copiedBoards;
          });
     }

     const changeTheme = () => {
          darkTheme = !darkTheme;
     }
</script>

<div class:dark={darkTheme}>
     <div class="flex bg-[#F4F7FD] dark:bg-[#20212C]">
          <div class="bg-white min-h-screen w-[18.75rem]">
               <img src="/logo-light.svg" class="mx-auto mt-[2.125rem] mb-14" alt="app manageit logo">
               <span class="px-8 font-bold text-xs text-[#828FA3]">ALL BOARDS ( {numberOfBoards} )</span>
               {#each $BoardStore as board (board.id)}
                    <div on:click={() => findBoard(board.id)} on:keydown={()=>{}}>
                         {board.title}
                    </div>
               {/each}
               <button on:click={createBoard}>create new board</button>
               <br>
               <button on:click={changeTheme}>change theme</button>
          </div>
          <div class="flex-1 flex flex-col">
               <div class="bg-white h-[6.0625rem]">
                    <button on:click={createTask}>create new task</button>
                    <br>
                    <button on:click={deleteBoard}>delete board</button>
                    <br>
                    <button on:click={renameBoard}>edit board</button>
               </div>
               <div class="flex space-x-5">
                    {#each $BoardStore as board (board.id)}
                         {#if board.id === specificId}
                              {#each board.status as status}
                                   <div>
                                        {status}
                                        {#each board.tasks as task, index}
                                             {#if task.status === status}                                            
                                                  <p on:click={() => deleteTask(task.id)} on:keydown={()=>{}}>{task.title}</p>
                                                  <p on:click={() => editTask(task.id)} on:keydown={()=>{}}>edit</p>
                                             {/if}
                                        {/each}
                                   </div>
                              {/each}
                         {/if}
                    {/each}
                    <button on:click={createColumn}>add new column</button>
               </div>
          </div>
     </div>
</div>