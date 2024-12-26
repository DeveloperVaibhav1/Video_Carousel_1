document.addEventListener('DOMContentLoaded', function () {
  const loaderOverlay = document.createElement('div');
  loaderOverlay.classList.add('loader-overlay');

  const loader = document.createElement('div');
  loader.classList.add('loader');

  for (let i = 0; i < 4; i++) {
      const loaderBar = document.createElement('div');
      loader.appendChild(loaderBar);
  }

  loaderOverlay.appendChild(loader);

  document.body.appendChild(loaderOverlay);

  const style = document.createElement('style');
  style.innerHTML = `
  .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(0, 0, 0);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
  }

  .loader {
      display: flex;
      justify-content: center; 
      width: 120px; 
      height: 50px; 
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
  }

  
  .loader div {
      width: 12px; 
      height: 100%;
      margin: 0 4px; 
      background-color: rgb(238, 130, 130);
      box-shadow: 0 0 10px rgba(123, 72, 243, 0.5);
      animation: bar-animation 1.5s ease-out infinite;
      z-index: 1000;
  }


  @keyframes bar-animation {
      0% {
          height: 100%;
          background-color: rgb(238, 130, 130);
      }
      50% {
          height:-150%;
          background-color: white;
      }
      100% {
          height: 100%;
          background-color: rgb(238, 130, 130);
      }
  }
  `;
  document.head.appendChild(style);

  window.onload = function() {
      setTimeout(() => {
          loaderOverlay.style.display = 'none'; 
      }, 2000); 
  };
});
