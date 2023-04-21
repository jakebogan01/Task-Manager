<script>
     import BoardStore from "../../stores/boardStore";

     let specificId;
     let currentBoardTitle = "";
     let darkTheme = false;
     let showBoardSettings = true;
     let enableButton = true;
     let hideWelcomeMessage = false;
     let numberOfBoards = 0;
     let hideSidebar = false;

     const findBoard = (id, title) => {
          specificId = id;
          currentBoardTitle = title;
          enableButton = false;
          hideWelcomeMessage = true;
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
          if (specificId == null) {
               return;
          }
          
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
          if (specificId == null) {
               return;
          }

          BoardStore.update(currentBoards => {
               return currentBoards.filter(board => board.id !== specificId);
          });
     };

     const renameBoard = () => {
          if (specificId == null) {
               return;
          }

          BoardStore.update(currentBoards => {
               let copiedBoards = [...currentBoards];
               let updatedBoard = copiedBoards.find(board => board.id === specificId);
               
               updatedBoard.title = "I Renamed this board";
               currentBoardTitle = updatedBoard.title;

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
     let a;
</script>

<div class:dark={darkTheme}>
     <div class="relative flex min-h-screen bg-[#F4F7FD] dark:bg-[#20212C] overflow-hidden">
          <div class="absolute top-0 flex flex-col min-w-[18.75rem] max-w-[18.75rem] bg-white min-h-screen border-r border-[#E4EBFA] text-[#828FA3] {hideSidebar ? "-left-[18.75rem]" : "left-0"} ease-in-out duration-500">
               <img src="/logo-light.svg" class="mx-auto mt-[2.125rem] mb-14" alt="app manageit logo">
               <span class="pl-8 font-bold text-xs">ALL BOARDS ( {$BoardStore.length} )</span>
               <div class="mt-5">
                    <ul>
                         {#each $BoardStore as board (board?.id)}
                              <li class="flex items-center space-x-4 pl-8 mr-6 py-[0.8rem] font-bold text-[0.9375rem] rounded-tr-full rounded-br-full cursor-pointer {(board?.id === specificId) ? " bg-[#635FC7] text-white" : ""}" on:click={() => findBoard(board?.id, board?.title)} on:keydown={()=>{}}>
                                   <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor"/></svg>
                                   <span>{board?.title}</span>
                              </li>
                         {/each}
                         <li class="flex items-center space-x-4 pl-8 py-[0.8rem] font-bold text-[0.9375rem] rounded-tr-full rounded-br-full text-[#635FC7] cursor-pointer" on:click={createBoard} on:keydown={()=>{}}>
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
                         <button type="button" on:click={() => { hideSidebar = true; }} class="flex items-center space-x-4">
                              <img src="/icon-hide-sidebar.svg" alt="hide icon">
                              <span>Hide Sidebar</span>
                         </button>
                    </div>
               </div>
          </div>
          <div class="flex-1 flex flex-col {hideSidebar ? "ml-0" : "ml-[18.75rem]"} ease-in-out duration-500">
               <div class="flex items-center justify-between bg-white px-6 h-[6.0625rem] border-b border-[#E4EBFA]">
                    <h1 class="font-bold text-black text-2xl">{currentBoardTitle}</h1>
                    <div class="flex items-center space-x-6">
                         <button type="button" class="flex items-center justify-center space-x-1 text-white font-bold text-[0.9375rem] h-12 w-[10.5rem] bg-[#635FC7] bg-opacity-20 rounded-full" on:click={createTask} disabled={enableButton}>
                              <span>
                                   <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.11001 8V5.09H0.200012V3.395H3.11001V0.5H4.80501V3.395H7.70001V5.09H4.80501V8H3.11001Z" fill="currentColor"/></svg>
                              </span>
                              <span>Add New Task</span>
                         </button>
                         <div class="relative">
                              <button on:click={() => { showBoardSettings = !showBoardSettings; }} type="button" class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500" id="options-menu-1-button" aria-expanded="false" aria-haspopup="true">
                                   <span class="sr-only">Open options</span>
                                   <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                              </button>
                              <div class:hidden={showBoardSettings} class="absolute right-0 z-10 mt-0.5 w-36 py-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none overflow-hidden" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-1-button" tabindex="-1">
                                   <button type="button" on:click={renameBoard} class="block w-full px-3 py-1 font-medium text-[0.8125rem] leading-6 text-[#828FA3] text-left hover:bg-gray-50" role="menuitem" tabindex="-1" id="options-menu-1-item-0">Edit Board<span class="sr-only" disabled={enableButton}>Edit Board</span></button>
                                   <button type="button" on:click={deleteBoard} class="block w-full px-3 py-1 font-medium text-[0.8125rem] leading-6 text-[#EA5555] text-left hover:bg-gray-50" role="menuitem" tabindex="-1" id="options-menu-1-item-1">Delete Board<span class="sr-only" disabled={enableButton}>Delete Board</span></button>
                              </div>
                         </div>
                    </div>
               </div>
               <div class="relative flex-1 flex w-full space-x-5 pt-6 pl-6 overflow-x-auto">
                    {#if $BoardStore.length > 0}
                         <div class:hidden={hideWelcomeMessage} class="flex-1 flex flex-col justify-center items-center">
                              <p class="font-bold text-lg text-[#828FA3] opacity-50">Welcome back!</p>
                              <p class="font-bold text-lg text-[#828FA3] opacity-50">Select one of your boards.</p>
                         </div>
                         {#each $BoardStore as board (board?.id)}
                              {#if board?.id === specificId}
                                   {#each board?.status as status}
                                        <div class="max-w-[17.5rem] space-y-5" style="flex: 0 0 100%;">
                                             <h4 class="flex items-center space-x-3 mb-6 font-bold text-sm text-[#828FA3]">
                                                  <span class="block bg-red-500 rounded-full w-[0.9375rem] h-[0.9375rem]"></span>
                                                  <span>{status} ( {0} )</span>
                                             </h4>
                                             {#each board?.tasks as task}
                                                  {#if task?.status === status}
                                                  {a = task?.status}
                                                       <div class="bg-white rounded-lg pt-[1.625rem] px-4 pb-6 drop-shadow-md">
                                                            <p on:click={() => deleteTask(task?.id)} on:keydown={()=>{}}>{task?.title}</p>
                                                            <p on:click={() => editTask(task?.id)} on:keydown={()=>{}}>edit</p>
                                                       </div>                                        
                                                  {/if}
                                             {/each}
                                        </div>
                                   {/each}
                              {/if}
                         {/each}
                    {:else}
                         <!-- <div class="flex-1 flex justify-center items-center">
                              <div class="flex flex-col items-center space-y-6">
                                   <p class="font-bold text-lg text-[#828FA3]">This board is empty. Create a new column to get started.</p>
                                   <button type="button" class="flex items-center justify-center space-x-1 text-white font-bold text-[0.9375rem] h-12 w-[10.5rem] bg-[#635FC7] rounded-full" on:click={createColumn}>
                                        <span>
                                             <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.11001 8V5.09H0.200012V3.395H3.11001V0.5H4.80501V3.395H7.70001V5.09H4.80501V8H3.11001Z" fill="currentColor"/></svg>
                                        </span>
                                        <span>Add New Column</span>
                                   </button>
                              </div>
                         </div> -->
                         <div class="flex-1 flex justify-center items-center">
                              <div class="flex flex-col items-center space-y-6">
                                   <p class="font-bold text-lg text-[#828FA3]">There are no boards. Create a new board to get started.</p>
                                   <button type="button" class="flex items-center justify-center space-x-1 text-white font-bold text-[0.9375rem] h-12 w-48 bg-[#635FC7] rounded-full" on:click={createBoard}>
                                        <span>
                                             <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.11001 8V5.09H0.200012V3.395H3.11001V0.5H4.80501V3.395H7.70001V5.09H4.80501V8H3.11001Z" fill="currentColor"/></svg>
                                        </span>
                                        <span>Create New Board</span>
                                   </button>
                              </div>
                         </div>
                    {/if}
                    <button type="button" on:click={() => { hideSidebar = false; }} class="absolute bottom-8 -left-6 justify-center items-center w-14 h-12 bg-[#635FC7] rounded-tr-full rounded-br-full {hideSidebar ? "flex" : "hidden"}">
                         <img src="/icon-show-sidebar.svg" alt="show sidebar icon" class="object-contain">
                    </button>
               </div>
          </div>
     </div>
</div>