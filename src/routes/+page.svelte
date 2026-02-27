<script lang="ts">
  import { resolve } from '$app/paths';
</script>

<div class="page-container">
  <div class="image-container">
    <img src="/homescreen_resized.jpg" alt="Adventure Background" class="homescreen-image" />

    <div class="buttons">
      <a href="{resolve('/map/map01')}" class="start-button">
        Start
      </a>
    </div>
  </div>
</div>

<style>
  .page-container {
    height: 100vh;
  }
    
  .image-container {
    height: 100%;
  }

  .homescreen-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .buttons {
    position: absolute;
    bottom: 28%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
  }

  .start-button {
    background: linear-gradient(135deg, var(--danger-500) 0%, var(--danger-600) 100%);
    color: var(--white);
    padding: 13px 22px;
    font-size: 1.2rem;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    letter-spacing: 0.5px;
  }

  .start-button:hover {
    background: linear-gradient(135deg, var(--danger-600) 0%, var(--danger-700) 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px var(--danger-shadow);
  }

  .start-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--danger-outline);
  }
</style>
