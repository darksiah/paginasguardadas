document.addEventListener('DOMContentLoaded', () => {
  const numStars = 1500;
  const numPlanets = 15;

  // Create stars
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.width = star.style.height = `${Math.random() * 3}px`;
    document.body.appendChild(star);
  }

  // Create planets
  for (let i = 0; i < numPlanets; i++) {
    const planet = document.createElement('div');
    planet.className = 'planet';
    planet.style.left = `${Math.random() * 100}vw`;
    planet.style.top = `${Math.random() * 100}vh`;
    planet.style.width = planet.style.height = `${Math.random() * 20 + 10}px`;
    document.body.appendChild(planet);
  }

  // Create twinkling stars
  for (let i = 0; i < numStars / 5; i++) {
    const star = document.createElement('div');
    star.className = 'star twinkle';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.width = star.style.height = `${Math.random() * 3}px`;
    document.body.appendChild(star);
  }

  // Create orbits
  const planets = document.querySelectorAll('.planet');
  planets.forEach((planet) => {
    const orbit = document.createElement('div');
    orbit.className = 'orbit';
    const orbitSize = parseFloat(planet.style.width) * 2;
    orbit.style.width = orbit.style.height = `${orbitSize}px`;
    orbit.style.left = `${parseFloat(planet.style.left) - orbitSize / 4}vw`;
    orbit.style.top = `${parseFloat(planet.style.top) - orbitSize / 4}vh`;
    document.body.appendChild(orbit);
  });


const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

  // Create more planets with random colors
  for (let i = 0; i < numPlanets * 2; i++) {
    const planet = document.createElement('div');
    planet.className = `planet ${colors[Math.floor(Math.random() * colors.length)]}`;
    planet.style.left = `${Math.random() * 100}vw`;
    planet.style.top = `${Math.random() * 100}vh`;
    planet.style.width = planet.style.height = `${Math.random() * 20 + 10}px`;
    document.body.appendChild(planet);
  }

  // Mouse interaction
  document.body.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const planets = document.querySelectorAll('.planet');
    planets.forEach((planet) => {
      const planetX = parseFloat(planet.style.left);
      const planetY = parseFloat(planet.style.top);

      const dx = (mouseX / window.innerWidth) * 100 - planetX;
      const dy = (mouseY / window.innerHeight) * 100 - planetY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 10) {
        planet.style.left = `${planetX - dx / 10}vw`;
        planet.style.top = `${planetY - dy / 10}vh`;
      }
    });
  });
});
