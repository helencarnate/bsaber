<script lang="ts">
  import Listing from '$lib/Listing.svelte'
  import scoreSaberLogo from '/static/scoresaber-logo.svg'

  let players = []

  getPlayers()

  async function getPlayers() {
    let response = await fetch(
      `${import.meta.env.VITE_BSABER_API_BASE || 'https://api.bsaber.com'}/top-players`,
    )
    let json = await response.json()
    players = json
  }
</script>

<Listing title="ScoreSaber Leaderboards" img={scoreSaberLogo}>
  {#each players as player, index}
    {#if index > 0}
      <hr />
    {/if}
    <div class="player">
      <div class="rank">#{player.rank}</div>
      <img class="avatar" src={player.avatar} alt="" />
      <div class="name">{player.name}</div>
      <div class="score">
        {player.score.toLocaleString(undefined, { minimumFractionDigits: 2 })}pp
      </div>
      <div class="change" class:up={player.change >= 1} class:down={player.change <= -1}>
        {player.change >= 1 ? '+' : ''}{player.change}
      </div>
    </div>
  {/each}
</Listing>

<style lang="scss">
  hr {
    height: 1px;
    margin: 8px -12px;
    border: none;
    background-color: #444;
  }

  .player {
    display: grid;
    grid-template-columns: 28px 16px 1fr 88px 40px;
    gap: 8px;
    align-items: center;
  }

  .rank {
  }

  .avatar {
    width: 16px;
    height: 16px;
    border-radius: 100%;
  }

  .name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .score {
    text-align: right;
  }

  .up {
    color: #00bc8c;
  }

  .down {
    color: #e74c3c;
  }

  .change {
    text-align: right;
  }
</style>
