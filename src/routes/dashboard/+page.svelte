<script>
     import BoardStore from "../../stores/boardStore";

     let specificId;
     let darkTheme = false;
     let active = false;
     let numberOfBoards = 0;

     const findBoard = (id) => {
          specificId = id;
          active = true;
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
          <div class="flex flex-col bg-white min-h-screen border-r border-[#E4EBFA] w-[18.75rem] text-[#828FA3]">
               <img src="/logo-light.svg" class="mx-auto mt-[2.125rem] mb-14" alt="app manageit logo">
               <span class="pl-8 font-bold text-xs">ALL BOARDS ( {numberOfBoards} )</span>
               <div class="mt-5">
                    <ul>
                         {#each $BoardStore as board (board.id)}
                              <li class="flex items-center space-x-4 pl-8 mr-6 py-[0.8rem] font-bold text-[0.9375rem] rounded-tr-full rounded-br-full cursor-pointer {active ? " bg-[#635FC7] text-white" : ""}" on:click={() => findBoard(board.id)} on:keydown={()=>{}}>
                                   <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor"/></svg>
                                   <span>{board.title}</span>
                              </li>
                         {/each}
                         <li class="flex items-center space-x-4 pl-8 mr-6 py-[0.8rem] font-bold text-[0.9375rem] rounded-tr-full rounded-br-full text-[#635FC7] cursor-pointer" on:click={createBoard} on:keydown={()=>{}}>
                              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor"/></svg>
                              <span class="flex items-center space-x-1">
                                   <span>
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.11001 8V5.09H0.200012V3.395H3.11001V0.5H4.80501V3.395H7.70001V5.09H4.80501V8H3.11001Z" fill="#635FC7"/></svg>
                                   </span>
                                   <span>Create New Board</span>
                              </span>
                         </li>
                    </ul>
               </div>
               <div class="flex-1 flex flex-col items-center justify-end">
                    <div class="flex justify-center items-center space-x-4 max-w-[15.625rem] bg-[#F4F7FD] h-12 w-full rounded-md">
                         <img src="/icon-light-theme.svg" alt="light theme">
                         <button type="button" on:click={changeTheme} class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 {darkTheme ? "bg-gray-200" : "bg-indigo-600"}" role="switch" aria-checked="false">
                              <span class="sr-only">Use setting</span>
                              <span aria-hidden="true" class="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {darkTheme ? "transform translate-x-full" : ""}"></span>
                         </button>
                         <img src="/icon-dark-theme.svg" alt="dark theme">
                    </div>
                    <div class="mt-6 mb-12">
                         <button type="button" class="flex items-center space-x-4">
                              <img src="/icon-hide-sidebar.svg" alt="hide icon">
                              <span>Hide Sidebar</span>
                         </button>
                    </div>
               </div>
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