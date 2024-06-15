<script>
  let { board, blocks, avail, winner, drop, easy, ...props } = $props()
  function cellColor (x) {
    const i = Math.floor(x / 9)
    if (blocks[i] !== 0) return 'opacity-0'
    if (board[x] === 1) return 'bg-red-400'
    if (board[x] === 2) return 'bg-blue-500'
    if (board[x] === 3) return 'bg-yellow-500'
    if (winner) return 'bg-gray-300'
    return avail.includes(x) ? 'bg-white' : 'bg-gray-300'
  }
  function blockColor (i) {
    if (blocks[i] === 1) return 'bg-red-400'
    if (blocks[i] === 2) return 'bg-blue-500'
    if (blocks[i] === 3) return 'bg-yellow-500'
    return easy ? 'bg-white' : ''
  }
</script>

<div class="grid grid-cols-3" {...props}>
  {#each {length: 9} as _, i}
    <div class={'border-2 grid grid-cols-3 rounded overflow-hidden transition-all ' + blockColor(i)}>
      {#each {length: 9} as _, j}
        <div class={'transition-all p-6 m-px cursor-pointer rounded ' + cellColor(9 * i + j) + (easy ? ' opacity-0' : ' opacity-100')} onclick={() => drop(9 * i + j)}></div>
      {/each}
    </div>
  {/each}
</div>
