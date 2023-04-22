<script>
     import BoardStore from "../../stores/boardStore";

     let specificId;
     let currentTaskId;
     let currentBoardTitle = "";
     let darkTheme = false;
     let showBoardSettings = false;
     let showTaskSettings = false;
     let enableButton = true;
     let hideWelcomeMessage = false;
     let numberOfBoards = 0;
     let hideSidebar = false;
     let createBoard = false;
     let deleteBoardModal = false;
     let createAnotherBoard = false;
     let showAddNewColumn = false;
     let addNewColumn = false;
     let addNewTask = false;
     let previewTask = false;

     let boardFields = { 
          title: "", 
          newCol: "", 
          newTaskTitle: "", 
          newTaskDescription: "", 
          newTaskStatus: "", 
          newTaskSubtask: [],
          taskCurrentStatus: "",
          taskCurrentCheck: []
     };
     let numberOfColumns = [1];
     let arrayOfStatuses = [];

     const findBoard = (id, title) => {
          specificId = id;
          currentBoardTitle = title;
          enableButton = false;
          hideWelcomeMessage = true;
          showAddNewColumn = true;
     };

     const createTask = () => {
          if (specificId == null) {
               return;
          }

          addNewTask = true;
     };

     const handleCreateNewTask = (id) => {
          let newId = id + 1;

          let task = {
               id: newId,
               title: boardFields.newTaskTitle.trim(),
               description: boardFields.newTaskDescription.trim(),
               status: boardFields.newTaskStatus,
               subtasks: [...boardFields.newTaskSubtask]
          };

          BoardStore.update(currentBoards => {
               let copiedBoards = [...currentBoards];
               let updatedBoard = copiedBoards.find(board => board.id === specificId);

               updatedBoard.tasks.map((task) => {
                    if (task.id === newId) {
                         newId += 1;
                         task.id = newId;
                    }
               });

               updatedBoard.tasks = [...updatedBoard.tasks, task];
               
               return copiedBoards;
          });

          boardFields.newTaskTitle = "";
          boardFields.newTaskDescription = "";
          boardFields.newTaskStatus = "";
          boardFields.newTaskSubtask = [];
          numberOfColumns = [1];
          addNewTask = false;
     }

     const deleteBoard = () => {
          if (specificId == null) {
               return;
          }

          deleteBoardModal = true;
     };

     const handleDeleteBoard = () => {
          BoardStore.update(currentBoards => {
               return currentBoards.filter(board => board.id !== specificId);
          });

          deleteBoardModal = false;
          showBoardSettings = false;
          showAddNewColumn = false;
          enableButton = true;
          currentBoardTitle = "";
     }

     const renameBoard = () => {
          if (specificId == null) {
               return;
          }

          createBoard = true;
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

          showTaskSettings = false;
          previewTask = false;
     };

     const editTask = (id) => {
          BoardStore.update(currentBoards => {
               let copiedBoards = [...currentBoards];
               let updatedBoard = copiedBoards.find(board => board.id === specificId);

               let tasks = updatedBoard.tasks;
               let filteredTask = tasks.filter(task => task.id === id);

               filteredTask[0].status = boardFields.taskCurrentStatus;

               return copiedBoards;
          });

          previewTask = false;
     };

     const createColumn = () => {
          addNewColumn = true;
     }
     
     const handleCreateNewColumn = (col) => {
          BoardStore.update(currentBoards => {
               let copiedBoards = [...currentBoards];
               let updatedBoard = copiedBoards.find(board => board.id === specificId);
               
               updatedBoard.status = [...updatedBoard.status, col.toUpperCase().trim()];

               return copiedBoards;
          });

          addNewColumn = false;
     }

     const changeTheme = () => {
          darkTheme = !darkTheme;
     }

     const handleBoardCreation = (id) => {
          const upper = arrayOfStatuses.map(element => {
               return element.toUpperCase();
          });

          if (specificId == null || createAnotherBoard) {
               let newId = id + 1;

               let board = {
                    id: newId,
                    title: boardFields.title.trim(),
                    status: [...upper],
                    tasks: [],
               };

               BoardStore.update(currentBoards => {
                    currentBoards.map((board) => {
                         if (board.id === newId) {
                              newId += 1;
                              board.id = newId;
                         }
                    });
                    
                    return [...currentBoards, board];
               });
          } else {
               BoardStore.update(currentBoards => {
                    let copiedBoards = [...currentBoards];
                    let updatedBoard = copiedBoards.find(board => board.id === specificId);
                    
                    updatedBoard.title = boardFields.title.trim();
                    currentBoardTitle = updatedBoard.title;

                    return copiedBoards;
               });
          }

          boardFields.title = "";
          arrayOfStatuses = [];
          numberOfColumns = [1];
          createBoard = false;
          createAnotherBoard = false;
     }

     const addColumnOptions = (i, x, viewingTask) => {
          const index = numberOfColumns.indexOf(i);

          if (viewingTask && index > -1) {
               numberOfColumns.splice(index, 1);
               boardFields.newTaskSubtask.splice(x, 1);
               numberOfColumns = [...numberOfColumns];
               boardFields.newTaskSubtask = [...boardFields.newTaskSubtask];

               return;
          }

          if (index > -1) {
               numberOfColumns.splice(index, 1);
               arrayOfStatuses.splice(x, 1);
               numberOfColumns = [...numberOfColumns];
               arrayOfStatuses = [...arrayOfStatuses];
          }
     }

     const showTaskPreview = (id) => {
          currentTaskId = id;

          previewTask = true;
     }

     const test = (item, index) => {
          item.map((i) => {
               if (!i && index > -1) {
                    item.splice(index, 1);
               }
          })
          boardFields.taskCurrentCheck = [...item]
     }
</script>

<div class:dark={darkTheme}>
     <div class="relative flex min-h-screen bg-[#F4F7FD] dark:bg-[#20212C] overflow-hidden">
          <div class="absolute top-0 flex flex-col min-w-[18.75rem] max-w-[18.75rem] bg-white min-h-screen border-r border-[#E4EBFA] text-[#828FA3] {hideSidebar ? "-left-[18.75rem]" : "left-0"} ease-in-out duration-500">
               <img src="/logo-light.svg" class="mx-auto mt-[2.125rem] mb-14" alt="app manageit logo">
               <span class="pl-8 font-bold text-xs">ALL BOARDS ( {$BoardStore.length} )</span>
               <div class="mt-5">
                    <ul>
                         {#each $BoardStore as board (board?.id)}
                              <li class="flex items-center space-x-4 pl-8 mr-6 py-[0.8rem] font-bold text-[0.9375rem] capitalize rounded-tr-full rounded-br-full cursor-pointer {(board?.id === specificId) ? " bg-[#635FC7] text-white" : ""}" on:click={() => findBoard(board?.id, board?.title)} on:keydown={()=>{}}>
                                   <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor"/></svg>
                                   <span>{board?.title}</span>
                              </li>
                         {/each}
                         <li class="flex items-center space-x-4 pl-8 py-[0.8rem] font-bold text-[0.9375rem] rounded-tr-full rounded-br-full text-[#635FC7] cursor-pointer" on:click={()=>{createBoard = true; createAnotherBoard = true;}} on:keydown={()=>{}}>
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
                    <h1 class="font-bold text-black capitalize text-2xl">{currentBoardTitle}</h1>
                    <div class="flex items-center space-x-6">
                         <button type="button" class="flex items-center justify-center space-x-1 text-white font-bold text-[0.9375rem] h-12 w-[10.5rem] bg-[#635FC7] rounded-full {enableButton ? "bg-opacity-20" : ""}" on:click={createTask} disabled={enableButton}>
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
                              {#if showBoardSettings}
                                   <div class="absolute right-0 z-10 mt-0.5 w-36 py-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none overflow-hidden" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-1-button" tabindex="-1">
                                        <button type="button" on:click={renameBoard} class="block w-full px-3 py-1 font-medium text-[0.8125rem] leading-6 text-[#828FA3] text-left hover:bg-gray-50" role="menuitem" tabindex="-1" id="options-menu-1-item-0">Edit Board<span class="sr-only" disabled={enableButton}>Edit Board</span></button>
                                        <button type="button" on:click={deleteBoard} class="block w-full px-3 py-1 font-medium text-[0.8125rem] leading-6 text-[#EA5555] text-left hover:bg-gray-50" role="menuitem" tabindex="-1" id="options-menu-1-item-1">Delete Board<span class="sr-only" disabled={enableButton}>Delete Board</span></button>
                                   </div>
                              {/if}
                         </div>
                    </div>
               </div>
               <div class="relative flex-1 flex w-full space-x-5 py-6 px-6 overflow-x-auto">
                    {#if $BoardStore.length > 0}
                         {#if !hideWelcomeMessage}
                              <div class="flex-1 flex flex-col justify-center items-center">
                                   <p class="font-bold text-lg text-[#828FA3] opacity-50">Select a board to manage.</p>
                              </div>
                         {/if}
                         {#each $BoardStore as board (board?.id)}
                              {#if board?.id === specificId}
                                   {#each board?.status as status}
                                        <div class="max-w-[17.5rem] space-y-5" style="flex: 0 0 100%;">
                                             <h4 class="flex items-center space-x-3 mb-6 font-bold text-sm text-[#828FA3]">
                                                  <span class="block bg-red-500 rounded-full w-[0.9375rem] h-[0.9375rem]"></span>
                                                  <span class="uppercase">{status} ( {numberOfBoards} )</span>
                                             </h4>
                                             {#each board?.tasks as task}
                                                  {#if task?.status === status}
                                                       <div on:click={()=>{showTaskPreview(task?.id)}} on:keydown={()=>{}} class="bg-white rounded-lg pt-[1.625rem] px-4 pb-6 drop-shadow-md cursor-pointer">
                                                            <h5 class="font-bold">{task?.title}</h5>
                                                            <span class="font-bold text-xs text-[#828FA3]">{task.subtasks.length} of 2 substasks</span>
                                                            <p on:click={() => editTask(task?.id)} on:keydown={()=>{}}>edit</p>
                                                       </div>                                        
                                                  {/if}
                                             {/each}
                                        </div>
                                   {/each}
                              {/if}
                         {/each}
                         {#if showAddNewColumn}
                              <div on:click={createColumn} on:keydown={()=>{}} class="flex items-center justify-center space-x-2 max-w-[17.5rem] rounded-lg text-[#828FA3] text-2xl font-bold bg-[#E9EFFB] cursor-pointer" style="flex: 0 0 100%;">
                                   <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/></svg>
                                   <span>Add New Column</span>
                              </div>
                         {/if}
                    {:else}
                         <div class="flex-1 flex justify-center items-center">
                              <div class="flex flex-col items-center space-y-6">
                                   <p class="font-bold text-lg text-[#828FA3]">There are no boards. Create a new board to get started.</p>
                                   <button type="button" on:click={()=>{createBoard = true; createAnotherBoard = true;}} class="flex items-center justify-center space-x-1 text-white font-bold text-[0.9375rem] h-12 w-48 bg-[#635FC7] rounded-full">
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


     <!-- modals -->
     {#if createBoard}
          <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <!--
          Background backdrop, show/hide based on modal state.

          Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
          Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
          -->
               <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

               <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <!--
                    Modal panel, show/hide based on modal state.

                    Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                    Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    -->
                         <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                              <form on:submit|preventDefault={()=>{handleBoardCreation($BoardStore.length)}}>
                                   <div>
                                        <div class="mt-3">
                                             <h3 class="text-base font-semibold leading-6 text-gray-900 text-center" id="modal-title">Add New Board</h3>
                                             <div class="mt-2">
                                                  {#if specificId == null || createAnotherBoard}
                                                       <div>
                                                            <label for="title" class="block text-xs font-bold leading-6 text-[#828FA3]">Name</label>
                                                            <div class="mt-2">
                                                                 <input type="text" bind:value={boardFields.title} name="title" id="title" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. Web Design" required>
                                                            </div>
                                                       </div>
                                                       <div class="mt-5">
                                                            <span class="block text-xs font-bold leading-6 text-[#828FA3]">Columns</span>
                                                            <div class="mt-2 space-y-4">
                                                                 {#each numberOfColumns as item, i}
                                                                      <div class="flex items-center space-x-4">
                                                                           <input type="text" bind:value={arrayOfStatuses[i]} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. ToDo" required>
                                                                           <button type="button" on:click={()=>{addColumnOptions(item, i)}} class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                                                <span class="sr-only">Close</span>
                                                                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                           </button>
                                                                      </div>
                                                                 {/each}
                                                            </div>
                                                       </div>
                                                  {:else}
                                                       {#each $BoardStore as board (board?.id)}
                                                            {#if board?.id === specificId}
                                                                 <div>
                                                                      <label for="title" class="block text-xs font-bold leading-6 text-[#828FA3]">Name</label>
                                                                      <div class="mt-2">
                                                                           <input type="text" bind:value={boardFields.title} name="title" id="title" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder={board.title} required>
                                                                      </div>
                                                                 </div>
                                                            {/if}
                                                       {/each}
                                                  {/if}
                                             </div>
                                        </div>
                                   </div>
                                   <div class="mt-5 sm:mt-8">
                                        {#if specificId == null || createAnotherBoard}
                                             <button type="button" on:click={()=>{numberOfColumns = [...numberOfColumns, numberOfColumns.length + 1]}} class="inline-flex w-full justify-center items-center rounded-md bg-[#635FC7] bg-opacity-20 px-3 h-10 text-sm font-semibold text-[#635FC7] hover:text-white shadow-sm hover:bg-opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">
                                                  <span class="flex items-center space-x-1">
                                                       <span>
                                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.11001 8V5.09H0.200012V3.395H3.11001V0.5H4.80501V3.395H7.70001V5.09H4.80501V8H3.11001Z" fill="currentColor"/></svg>
                                                       </span>
                                                       <span>Add New Column</span>
                                                  </span>
                                             </button>
                                        {/if}
                                   </div>
                                   <div class="mt-5 sm:mt-4 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button type="submit" class="inline-flex w-full justify-center items-center rounded-md bg-[#635FC7] px-3 h-10 text-sm font-semibold text-white shadow-sm hover:bg-[#A8A4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">{(specificId == null || createAnotherBoard) ? "Create Board" : "Update Board"}</button>
                                        <button type="button" on:click={()=>{createBoard = false; createAnotherBoard = false; showBoardSettings = false;}} class="mt-3 inline-flex w-full justify-center items-center rounded-md bg-[#EA5555] px-3 h-10 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#FF9898] sm:col-start-1 sm:mt-0">Cancel</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     {/if}

     {#if deleteBoardModal}
          <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <!--
          Background backdrop, show/hide based on modal state.

          Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
          Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
          -->
               <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

               <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <!--
                    Modal panel, show/hide based on modal state.

                    Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                    Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    -->
                         <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[30rem] sm:p-6">
                              <div class="mt-3">
                                   <h3 class="text-base font-semibold leading-6 text-[#EA5555] text-center" id="modal-title">Delete this board?</h3>
                                   <p class="font-medium text-[0.8125rem] text-[#828FA3] pb-4 pt-6">Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
                              </div>
                              <div class="mt-5 sm:mt-4 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                   <button type="button" on:click={()=>{deleteBoardModal = false; showBoardSettings = false;}} class="inline-flex w-full justify-center items-center rounded-md bg-[#635FC7] px-3 h-10 text-sm font-semibold text-white shadow-sm hover:bg-[#A8A4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">Cancel</button>
                                   <button type="button" on:click={handleDeleteBoard} class="mt-3 inline-flex w-full justify-center items-center rounded-md bg-[#EA5555] px-3 h-10 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#FF9898] sm:col-start-1 sm:mt-0">Delete</button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     {/if}

     {#if addNewColumn}
          <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <!--
          Background backdrop, show/hide based on modal state.

          Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
          Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
          -->
               <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

               <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <!--
                    Modal panel, show/hide based on modal state.

                    Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                    Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    -->
                         <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[30rem] sm:p-6">
                              <form on:submit|preventDefault={()=>{handleCreateNewColumn(boardFields.newCol)}}>
                                   <div class="mt-3">
                                        <h3 class="text-base font-semibold leading-6 text-gray-900 text-center" id="modal-title">Add New Column</h3>
                                        <div class="mt-2">
                                             <label for="status" class="block text-xs font-bold leading-6 text-[#828FA3]">Name</label>
                                             <div class="mt-2">
                                                  <input type="text" bind:value={boardFields.newCol} name="status" id="status" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. Review" required>
                                             </div>
                                        </div>
                                   </div>
                                   <div class="mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button type="submit" class="inline-flex w-full justify-center items-center rounded-md bg-[#635FC7] px-3 h-10 text-sm font-semibold text-white shadow-sm hover:bg-[#A8A4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">Add Column</button>
                                        <button type="button" on:click={()=>{addNewColumn = false;}} class="mt-3 inline-flex w-full justify-center items-center rounded-md bg-[#EA5555] px-3 h-10 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#FF9898] sm:col-start-1 sm:mt-0">Cancel</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     {/if}

     {#if addNewTask}
          <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <!--
          Background backdrop, show/hide based on modal state.

          Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
          Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
          -->
               <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

               <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <!--
                    Modal panel, show/hide based on modal state.

                    Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                    Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    -->
                         <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                              <form on:submit|preventDefault={()=>{handleCreateNewTask($BoardStore.length)}}>
                                   <div>
                                        <div class="mt-3">
                                             <h3 class="text-base font-semibold leading-6 text-gray-900 text-center" id="modal-title">Add New Task</h3>
                                             <div class="mt-2">
                                                  <div>
                                                       <label for="title" class="block text-xs font-bold leading-6 text-[#828FA3]">Title</label>
                                                       <div class="mt-2">
                                                            <input type="text" bind:value={boardFields.newTaskTitle} name="title" id="title" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. Take coffee break" required>
                                                       </div>
                                                  </div>
                                                  <div class="mt-5">
                                                       <label for="description" class="block text-xs font-bold leading-6 text-[#828FA3]">Description</label>
                                                       <div class="mt-2">
                                                            <textarea type="text" bind:value={boardFields.newTaskDescription} name="description" id="description" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. It is always good to take a break. This 15 minute break will recharge the batteries a little." rows="4" required></textarea>
                                                       </div>
                                                  </div>
                                                  <div class="mt-5">
                                                       <span class="block text-xs font-bold leading-6 text-[#828FA3]">Subtasks</span>
                                                       <div class="mt-2 space-y-4">
                                                            {#each numberOfColumns as item, i}
                                                                 <div class="flex items-center space-x-4">
                                                                      <input type="text" bind:value={boardFields.newTaskSubtask[i]} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. Make coffee" required>
                                                                      <button type="button" on:click={()=>{addColumnOptions(item, i, true)}} class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                                           <span class="sr-only">Close</span>
                                                                           <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                      </button>
                                                                 </div>
                                                            {/each}
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div class="mt-5">
                                        <button type="button" on:click={()=>{numberOfColumns = [...numberOfColumns, numberOfColumns.length + 1]}} class="inline-flex w-full justify-center items-center rounded-md bg-[#635FC7] bg-opacity-20 px-3 h-10 text-sm font-semibold text-[#635FC7] hover:text-white shadow-sm hover:bg-opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">
                                             <span class="flex items-center space-x-1">
                                                  <span>
                                                       <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.11001 8V5.09H0.200012V3.395H3.11001V0.5H4.80501V3.395H7.70001V5.09H4.80501V8H3.11001Z" fill="currentColor"/></svg>
                                                  </span>
                                                  <span>Add New Subtask</span>
                                             </span>
                                        </button>
                                   </div>
                                   <div class="mt-5">
                                        <label for="status" class="block text-xs font-bold leading-6 text-[#828FA3]">Status</label>
                                        <div class="mt-2">
                                             <select bind:value={boardFields.newTaskStatus} id="status" name="status" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                  {#each $BoardStore as board (board?.id)}
                                                       {#if board?.id === specificId}
                                                            {#each board?.status as status}
                                                                 <option>{status}</option>
                                                            {/each}
                                                       {/if}
                                                  {/each}
                                             </select>
                                        </div>
                                   </div>
                                   <div class="mt-5 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button type="submit" class="inline-flex w-full justify-center items-center rounded-md bg-[#635FC7] px-3 h-10 text-sm font-semibold text-white shadow-sm hover:bg-[#A8A4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">Create Task</button>
                                        <button type="button" on:click={()=>{addNewTask = false;}} class="mt-3 inline-flex w-full justify-center items-center rounded-md bg-[#EA5555] px-3 h-10 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#FF9898] sm:col-start-1 sm:mt-0">Cancel</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     {/if}

     {#if previewTask}
     <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <!--
          Background backdrop, show/hide based on modal state.

          Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
          Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
          -->
               <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

               <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <!--
                    Modal panel, show/hide based on modal state.

                    Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                    Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    -->
                         <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[30rem] sm:p-6">
                              {#each $BoardStore as board (board?.id)}
                                   {#if board?.id === specificId}
                                        {#each board?.tasks as task}
                                             {#if task?.id === currentTaskId}
                                             <div class="absolute top-[2.3rem] right-6">
                                                  <button on:click={() => { showTaskSettings = !showTaskSettings; }} type="button" class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500" id="options-menu-1-button" aria-expanded="false" aria-haspopup="true">
                                                       <span class="sr-only">Open options</span>
                                                       <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                                                  </button>
                                                  {#if showTaskSettings}
                                                       <div class="absolute right-0 z-10 mt-0.5 w-36 py-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none overflow-hidden" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-1-button" tabindex="-1">
                                                            <button type="button" class="block w-full px-3 py-1 font-medium text-[0.8125rem] leading-6 text-[#828FA3] text-left hover:bg-gray-50" role="menuitem" tabindex="-1" id="options-menu-1-item-0">Edit Task<span class="sr-only">Edit Task</span></button>
                                                            <button type="button" on:click={() => deleteTask(task?.id)} class="block w-full px-3 py-1 font-medium text-[0.8125rem] leading-6 text-[#EA5555] text-left hover:bg-gray-50" role="menuitem" tabindex="-1" id="options-menu-1-item-1">Delete Task<span class="sr-only">Delete Task</span></button>
                                                       </div>
                                                  {/if}
                                             </div>
                                                  <form on:submit|preventDefault={()=>{editTask(task?.id)}}>
                                                       <div class="mt-3">
                                                            <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">{task.title}</h3>
                                                            <p class="font-medium mt-6 text-[0.8125rem] text-[#828FA3] leading-loose">{task.description}</p>
                                                            <fieldset class="mt-6">
                                                                 <legend class="font-bold text-xs text-[#828FA3]">Subtasks ({boardFields.taskCurrentCheck.length} of {task.subtasks.length})</legend>
                                                                      <div class="space-y-2 mt-4">
                                                                           {#each task?.subtasks as subtask, i}
                                                                                <div class="relative flex items-start bg-[#F5F7FD] py-2 px-2 rounded-md">
                                                                                     <div class="flex h-6 items-center">
                                                                                          <input bind:checked={boardFields.taskCurrentCheck[i]} on:change={()=>{test(boardFields.taskCurrentCheck, i)}} aria-describedby="comments-description" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                                                                                     </div>
                                                                                     <div class="ml-3 text-sm leading-6">
                                                                                          <span class="text-gray-900 {boardFields.taskCurrentCheck[i] ? "line-through text-gray-600" : ""}">{subtask}</span>
                                                                                     </div>
                                                                                </div>
                                                                           {/each}
                                                                      </div>
                                                            </fieldset>
                                                            <div class="mt-5">
                                                                 <label for="status" class="block text-xs font-bold leading-6 text-[#828FA3]">Current Status</label>
                                                                 <div class="mt-2">
                                                                      <select bind:value={boardFields.taskCurrentStatus} name="status" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" required>
                                                                           {#each board?.status as status}
                                                                                <option>{status}</option>
                                                                           {/each}
                                                                      </select>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div class="mt-5 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                            <button type="submit" class="inline-flex w-full justify-center items-center rounded-md bg-[#635FC7] px-3 h-10 text-sm font-semibold text-white shadow-sm hover:bg-[#A8A4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">Update Task</button>
                                                            <button type="button" on:click={()=>{previewTask = false;}} class="sm:col-start-1 inline-flex w-full justify-center items-center rounded-md bg-[#635FC7] bg-opacity-20 px-3 h-10 text-sm font-semibold text-[#635FC7] hover:text-white shadow-sm hover:bg-opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Back</button>
                                                       </div>
                                                  </form>
                                             {/if}
                                        {/each}
                                   {/if}
                              {/each}
                         </div>
                    </div>
               </div>
          </div>
     {/if}
</div>