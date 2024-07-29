<script>
  import srpc from '$lib/utilities/sprc.js'
  srpc('https://lsh.yzzx.tech/panda')
  let code = $state(''), email = $state(''), tip = $state('')
  async function submit () {
    if (!email || !code || tip === 'Loading...') return
    tip = 'Loading...'
    try {
      await srpc.panda(code, email)
      tip = 'Success'
    } catch (e) { tip = 'Error: ' + e.toString() }
  }
</script>

<div>
  <input class="p-2 font-mono font-bold m-2" bind:value={code} placeholder="Survey Code">
  <input class="p-2 m-2" type="email" bind:value={email} placeholder="Email">
  <button onclick={submit} class="p-2 m-2 font-bold bg-blue-500 rounded shadow hover:shadow-md transition-all">Submit</button>
  <p class="m-2">{tip}</p>
</div>
