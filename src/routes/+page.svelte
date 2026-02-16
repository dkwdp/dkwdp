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
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    color: #ffffff;
    padding: 13px 22px;
    font-size: 1.2rem;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    letter-spacing: 0.5px;
  }

  .start-button:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(231, 76, 60, 0.5);
  }

  .start-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
  }
</style>
