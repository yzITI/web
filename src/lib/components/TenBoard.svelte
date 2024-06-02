<script>
  let { board, blocks, avail, winner, drop, ...props } = $props()
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
    return ''
  }
</script>

<div class="grid grid-cols-3" {...props}>
  {#each {length: 9} as _, i}
    <div class={'border-2 grid grid-cols-3 rounded overflow-hidden ' + blockColor(i)}>
      {#each {length: 9} as _, j}
        <div class={'transition-all p-6 cursor-pointer border rounded ' + cellColor(9 * i + j)} onclick={() => drop(9 * i + j)}></div>
      {/each}
    </div>
  {/each}
</div>
