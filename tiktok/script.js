// Configuración de Matter.js
const canvas = document.getElementById('physicsCanvas');
const engine = Matter.Engine.create();
const world = engine.world;
const render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
    }
});

// Ajustar el canvas al tamaño de la ventana
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
});

// Añadir suelo
const ground = Matter.Bodies.rectangle(
    window.innerWidth / 2, window.innerHeight, window.innerWidth, 100, 
    { isStatic: true }
);
Matter.World.add(world, ground);

// Función para crear bolas
function createBalls(numFollowers) {
    const maxBalls = Math.min(numFollowers, 100); // Limitamos a 100 bolas para rendimiento
    for (let i = 0; i < maxBalls; i++) {
        const radius = 5 + Math.random() * 10; // Tamaño aleatorio
        const ball = Matter.Bodies.circle(
            Math.random() * window.innerWidth, // Posición X aleatoria
            -radius, // Comienzan arriba
            radius,
            {
                restitution: 0.8, // Rebote
                render: {
                    fillStyle: `hsl(${Math.random() * 360}, 50%, 50%)` // Colores aleatorios
                }
            }
        );
        Matter.World.add(world, ball);
    }
}

// Simulación de datos de TikTok (sustituir con API o scraping)
const username = "chicabotella"; // Cambiar por el usuario deseado
let followers = 1000; // Valor de ejemplo
document.getElementById('username').textContent = `@${username}`;
document.getElementById('followers').textContent = `${followers} seguidores`;


async function getTikTokFollowers(username) {
    const url = `https://tiktok-api6.p.rapidapi.com/user?username=${username}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e70015cc70mshd37d027eeddd13fp10d154jsn91ff2855abbe',
            'X-RapidAPI-Host': 'tiktok-api6.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.user.followerCount;
    } catch (error) {
        console.error('Error:', error);
        return 0;
    }
}

// Uso
getTikTokFollowers('chicabotella').then(followers => {
    document.getElementById('followers').textContent = `${followers} seguidores`;
    createBalls(followers);

    // Iniciar la simulación
    Matter.Engine.run(engine);
    Matter.Render.run(render);
});
