document.addEventListener('DOMContentLoaded', function() {
    const texts = ['Boundaries', 'Borders', 'Gender'];
    let index = 0;
    const changingText = document.getElementById('changing-text');

    function changeText() {
        changingText.style.opacity = 0;
        setTimeout(() => {
            changingText.textContent = texts[index];
            changingText.style.opacity = 1;
            index = (index + 1) % texts.length;
        }, 3000); // Adjust time for better fade-out/in effect
    }

    setInterval(changeText, 3000); // Change every 3 seconds
    changeText(); // Initial call to set the first text
});

// Bloom effect for main tiles
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('mousemove', (e) => {
        const rect = tile.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const bloom = document.createElement('div');
        bloom.className = 'bloom';
        bloom.style.left = `${x}px`;
        bloom.style.top = `${y}px`;

        tile.appendChild(bloom);

        setTimeout(() => {
            bloom.remove();
        }, 500);
    });

    tile.addEventListener('mouseleave', () => {
        tile.style.transform = 'rotateY(0deg) rotateX(0deg)';
        tile.style.transition = 'transform 0.5s';
        tile.querySelectorAll('.bloom').forEach(bloom => bloom.remove());
    });
});

// 3D effect for main tiles
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('mousemove', (e) => {
        const rect = tile.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateY = x / 5;
        const rotateX = -y / 5;

        tile.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        tile.style.transition = 'transform 0.1s';
    });

    tile.addEventListener('mouseleave', () => {
        tile.style.transform = 'rotateY(0deg) rotateX(0deg)';
        tile.style.transition = 'transform 0.5s';
    });
});

// Music control
document.addEventListener('DOMContentLoaded', function() {
    const musicButton = document.getElementById('music-control');
    const backgroundMusic = document.getElementById('background-music');

    musicButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicButton.style.backgroundColor = '#007bff';
        } else {
            backgroundMusic.pause();
            musicButton.style.backgroundColor = '#3d3d5c';
        }
    });
});

// CLose Button 


