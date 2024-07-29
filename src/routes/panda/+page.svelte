<script>
  import srpc from '$lib/utilities/srpc.js'
  srpc('https://lsh.yzzx.tech/srpc/')
  let code = $state(''), email = $state(''), tip = $state('')
  async function submit () {
    if (!email || code.length !== 24 || tip === 'Loading...') return
    tip = 'Loading...'
    try {
      await srpc.panda(code, email)
      tip = 'Success'
    } catch (e) { tip = 'Error: ' + e.toString() }
  }
</script>

<div class="flex flex-col w-full h-screen bg-gray-200">
  <h1 class="mx-2 my-4 font-bold text-3xl">Panda Express</h1>
  <input class="p-2 font-mono font-bold m-2" type="text" inputmode="numeric" bind:value={code} placeholder="Survey Code">
  <input class="p-2 m-2" type="email" bind:value={email} placeholder="Email">
  <button onclick={submit} class="p-2 m-2 text-white font-bold bg-blue-500 rounded shadow hover:shadow-md transition-all">Submit</button>
  <p class="m-2">{tip}</p>
</div>
