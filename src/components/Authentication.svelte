<script>
     let email = "";
     let password = "";
     let confirmPass = "";
     let error = false;
     let register = false;

     const handleAuthentication = () => {
          if (!email || !password || (register && !confirmPass)) {
               error = true;
               return;
          }
     }

     const handleRegister = () => {
          register = !register;
     }
</script>

<div class="flex flex-col items-center justify-center flex-1 p-6 text-white min-h-screen bg-gradient-to-r from-[#BD00FF] to-[#51ABFF]">
     <form class="flex flex-col gap-3.5 w-[25rem] max-w-full mx-auto">
         <h1 class="text-center text-5xl mb-4">{register ? "Register" : "Login"}</h1>
         {#if error}
             <p class="text-[#F77B4D] text-[0.9rem] text-center">The information you have entered is not correct</p>
         {/if}
         <label class="relative border border-black rounded-md">
             <p class={email ? " above" : " center"}>Email</p>
             <input 
               bind:value={email}
               type="email"
               placeholder="Email"
               class="block w-full text-gray-800 outline-none outline-0 p-3.5 border-none border-0 border-transparent bg-white caret-white placeholder-[#BDC0C2] focus:border-transparent focus:bg-white focus:text-gray-800 focus:placeholder-gray-500 focus:outline-none ring-0 focus:ring-0 focus:ring-transparent focus:placeholder:text-transparent font-light text-[0.9375rem] rounded-md"
               required />
         </label>
         <label class="relative border border-black rounded-md">
             <p class={password ? " above" : " center"}>Password</p>
             <input
                 bind:value={password}
                 type="password"
                 placeholder="Password"
                 class="w-full border-none bg-white text-gray-800 p-3.5 border-2 border-black focus:border-none focus:outline-none outline-none focus-within:border-black"
                 required
             />
         </label>
         {#if register}
             <label class="relative border border-black rounded-md">
                 <p class={confirmPass ? " above" : " center"}>
                     Confirm Password
                 </p>
                 <input
                     bind:value={confirmPass}
                     type="password"
                     placeholder="Confirm Password"
                     class="w-full border-none bg-white text-gray-800 p-3.5 border-2 border-black focus:border-none focus:outline-none outline-none focus-within:border-black"
                     required
                 />
             </label>
         {/if}
         <button on:click={handleAuthentication} type="button" class="grid place-items-center bg-indigo-700 hover:bg-indigo-600 text-white border-none py-3.5 px-0 rounded-md cursor-pointer text-base">
               Submit
         </button>
     </form>
     <div class="options flex flex-col gap-1 text-[0.9rem] py-3.5 px-0 w-[25rem] max-w-full mx-auto overflow-hidden">
         <p>Or</p>
         {#if register}
             <div class="flex items-center gap-2 justify-center">
                 <p>Already have an account?</p>
                 <p on:click={handleRegister} on:keydown={() => {}}>Login</p>
             </div>
         {:else}
             <div class="flex items-center gap-2 justify-center">
                 <p>Don't have an account?</p>
                 <p on:click={handleRegister} on:keydown={() => {}}>Register</p>
             </div>
         {/if}
     </div>
 </div>

<style>
    .above,
    .center {
        position: absolute;
        transform: translateY(-50%);
        pointer-events: none;
        color: white;
        border-radius: 4px;
        padding: 0 6px;
        font-size: 0.8rem;
    }
    .above {
        top: 0;
        left: 24px;
        background: navy;
        border: 1px solid blue;
        font-size: 0.7rem;
    }
    .center {
        top: 50%;
        left: 6px;
        border: 1px solid transparent;
        opacity: 0;
    }
    .options > p {
        position: relative;
        text-align: center;
        width: fit-content;
        margin: 0 auto;
        padding: 0 8px;
    }
    .options > p::after,
    .options > p::before {
        position: absolute;
        content: "";
        top: 50%;
        transform: translateY(-50%);
        width: 100vw;
        height: 1.5px;
        background: white;
    }
    .options > p::after {
        right: 100%;
    }
    .options > p::before {
        left: 100%;
    }
    .options div p:last-of-type {
        color: cyan;
        cursor: pointer;
    }
</style>