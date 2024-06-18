<script>
  import TenBoard from '$lib/components/TenBoard.svelte'
  let { data } = $props()
  const status = ['Draw', 'Red win!', 'Blue win!', 'Yellow win!', 'Red turn', 'Blue turn', 'Yellow turn']
  let board = $state([]), last = $state(-1), l = $state(1), blocks = $state([]), winner = $state(0), avail = $state([])
  let easy = $state(data.easy || false), type = $state(data.type || 2)

  function getAvailable (board, last) {
    const all = [], b = last % 9
    for (let i = 0; i < 81; i++) all.push(i)
    if (last < 0 || easy) return all.filter(x => !board[x])
    const res = all.filter(x => Math.floor(x / 9) === b && !board[x])
    if (!res.length) return all.filter(x => !board[x])
    return res
  }

  function check9 (board, l, s = 0) {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    for (const li of lines) {
      if (board[s + li[0]] === l && board[s + li[1]] === l && board[s + li[2]] === l) return true
    }
    return false
  }

  function drop (x) {
    if (winner) return restart()
    if (!avail.includes(x)) return
    board[x] = l
    last = x
    const b = Math.floor(x / 9)
    if (easy) {
      blocks[b] = l
      if (check9(blocks, l, 0)) winner = l
    } else if (check9(board, l, 9 * b)) { // win the current block
      if (type == 3) winner = l // win!
      else { // occupy block & check for win
        for (let c = 0; c < 9; c++) board[9 * b + c] = l
        blocks[b] = l
        if (check9(blocks, l, 0)) winner = l // win!
      }
    }
    if (!winner && !board.filter(v => !v).length) winner = -1
    if (!winner) l = l % type + 1
    avail = getAvailable(board, last)
  }
  function restart () {
    l = 1, winner = 0, last = -1
    board = new Array(81).fill(0)
    blocks = new Array(9).fill(0)
    avail = getAvailable(board, last)
  }
  restart()
</script>

<svelte:head>
  <title>Ten Local | ITI</title>
</svelte:head>

<div class="h-screen w-screen bg-slate-200 flex flex-col justify-around items-center">
  {#if !data.simple}
    <div class="flex flex-col items-center">
      <div class="font-serif text-4xl my-4">Ten for {type}</div>
      <div class="py-2 px-6 rounded-full bg-white font-bold">{winner ? (winner < 0 ? status[0] : status[winner]) : status[l + 3]}</div>
    </div>
  {/if}
  <TenBoard {...{ board, blocks, avail, drop, winner, easy }}></TenBoard>
  {#if !data.simple}
    <button onclick={() => restart()} class="py-2 px-6 rounded-full bg-purple-500 text-white font-bold transition-all hover:shadow-md">Restart</button>
  {/if}
</div>
