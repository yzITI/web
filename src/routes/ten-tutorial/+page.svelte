<script>
  const status = ['It turns to player1(red)', 'It turns to player2(blue)', 'It turns to player3(green)', 'Player1 wins', 'Player2 wins', 'Game ends with a draw']
  let board = $state([]), block = $state(0), choose = $state(1)
  const type = 2
  function act (i, j) {
    if (board[0][0] || board[i][j]) return
    if ((!checkEnd(board[block])) && block !== 0 && i !== block) return
    if (board[i][j] === 0) board[i][j] = choose    
    if (board[0][i] === 0 && checkWin(board[i])) board[0][i] = choose
    choose++
    if (choose > type) choose = 1
    if (checkEnd(board[i])) board[i][0] = 1
    if (type === 2) {
      let sum = 0
      for (let c = 1; c < 10; c++) {
        if (board[c][0]) sum++
      }
      if (checkWin(board[0]) || sum === 9) board[0][0] = 1
    }
    block = j
  }
  function cellColor (i, j) {
    if (board[0][i] != 0) return 'opacity-0'
    if (board[i][j] === 1) return 'bg-red-400'
    if (board[i][j] === 2) return 'bg-blue-500'
    if (board[i][j] === 3) return 'bg-green-500'
    if (checkWin(board[0])) return 'bg-gray-300'
    if ((!checkEnd(board[block])) && block && i !== block) return 'bg-gray-300'
    return 'bg-white'
  }
  function blockColor (i) {
    if (board[0][i] === 1) return 'bg-red-400'
    if (board[0][i] === 2) return 'bg-blue-500'
    if (board[0][i] === 3) return 'bg-green-500'
    return ''
  }
  function checkWin (arr) {
    // if (Math.abs(arr[1] + arr[5] + arr[9]) === 3) return true
    // if (Math.abs(arr[3] + arr[5] + arr[7]) === 3) return true
    // for (let i = 1; i < 8; i += 3) if (Math.abs(arr[i] + arr[i+1] + arr[i+2]) === 3) return true
    // for (let i = 1; i < 4; i++) if (Math.abs(arr[i] + arr[i+3] + arr[i+6]) === 3) return true
    return false
  }
  function checkEnd (arr) {
    if (checkWin(arr)) return true
    for (let i = 1; i < 10; i++) {
      if (arr[i] === 0) return false
    }
    return true
  }
  function restart () {
    choose = 1, block = 0
    for (let i = 0; i < 10; i++) {
      board[i] = []
      for (let j = 0; j < 10; j++) board[i][j] = 0
    }
  }
  restart()
</script>

<div>
  <div class="h-screen w-screen bg-slate-200 flex flex-col justify-around items-center">
    <div class="font-serif text-3xl">Ten</div>
    {#if checkWin(board[0])}
      <div class="py-2 px-3 rounded-full bg-white font-bold">{status[choose + 2]}</div>
    {:else if checkEnd[board[0]]}
      <div class="py-2 px-3 rounded-full bg-white font-bold">{status[status.length - 1]}</div>
    {:else}
      <div class="py-2 px-3 rounded-full bg-white font-bold">{status[choose - 1]}</div>
    {/if}
    <div class="grid grid-cols-3">
      {#each {length: 9} as _, i}
        <div class={'border-2 grid grid-cols-3 ' + blockColor(i + 1)}>
          {#each {length: 9} as _, j}
            <div class={'all-transition p-6 cursor-pointer border ' + cellColor(i + 1, j + 1)} onclick={() => act(i + 1, j + 1)}></div>
          {/each}
        </div>
      {/each}
    </div>
    <button onclick={() => restart()} class="py-2 px-6 rounded-full bg-purple-500 text-white font-bold all-transition hover:shadow-md">Restart</button>
  </div>
</div>