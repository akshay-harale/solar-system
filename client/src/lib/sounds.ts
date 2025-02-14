let enabled = true;

const select = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");

export function toggleSound() {
  enabled = !enabled;
}

export function playSelect() {
  if (enabled) {
    select.currentTime = 0;
    select.play().catch(() => {
      // Ignore autoplay errors
    });
  }
}
