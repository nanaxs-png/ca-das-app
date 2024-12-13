// Ejercicios para diferentes niveles
const exercises = {
    easy: [
        { 
            title: "Sentadillas en silla", 
            description: "Siéntate y levántate de una silla sin usar las manos.", 
            time: 30,
            image: "https://via.placeholder.com/200?text=Sentadillas+en+silla", 
            tip: "Mantén la espalda recta y no uses las manos para levantarte."
        },
        { 
            title: "Marcha en el lugar", 
            description: "Camina suavemente en el mismo lugar.", 
            time: 30,
            image: "https://via.placeholder.com/200?text=Marcha", 
            tip: "Levanta las rodillas de manera cómoda y evita correr."
        },
        { 
            title: "Levantamiento de pierna (sentado)", 
            description: "Sientate y levanta una pierna, mantén unos segundos, luego cambia.", 
            time: 30,
            image: "https://via.placeholder.com/200?text=Levantamiento+de+pierna", 
            tip: "Hazlo lentamente para evitar mareos."
        },
    ],
    medium: [
        { 
            title: "Flexión de brazos (apoyado en silla)", 
            description: "Flexiona los brazos apoyándote en una silla.", 
            time: 40,
            image: "https://via.placeholder.com/200?text=Flexión+de+brazos", 
            tip: "Hazlo despacio y controla el movimiento."
        },
        { 
            title: "Elevación de talones", 
            description: "Párate y eleva los talones, mantén un par de segundos y baja lentamente.", 
            time: 30,
            image: "https://via.placeholder.com/200?text=Elevación+de+talones", 
            tip: "Siente cómo trabajan tus pantorrillas."
        },
    ],
    hard: [
        { 
            title: "Sentadillas sin silla", 
            description: "Realiza sentadillas sin el apoyo de una silla.", 
            time: 60,
            image: "https://via.placeholder.com/200?text=Sentadillas+sin+silla", 
            tip: "Baja de manera controlada y no te apresures."
        },
        { 
            title: "Flexiones en el suelo", 
            description: "Haz flexiones normales en el suelo (o con rodillas apoyadas si es necesario).", 
            time: 45,
            image: "https://via.placeholder.com/200?text=Flexiones", 
            tip: "Mantén el abdomen firme durante todo el movimiento."
        },
    ]
};

let selectedLevel = '';
let currentExerciseIndex = 0;
let currentExerciseTime = 0;
let totalTimeSpent = 0;
let totalExerciseTime = 1200; // 20 minutos en segundos
let timer;
let seconds = 0;

// Función que selecciona el nivel de ejercicio
function selectLevel(level) {
    selectedLevel = level;
    document.getElementById('level-selection').style.display = 'none';  
    displayExercises();  
}

// Función que muestra la lista de ejercicios según el nivel
function displayExercises() {
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = '';  
    exerciseList.style.display = 'block';  

    exercises[selectedLevel].forEach((exercise, index) => {
        const exerciseItem = document.createElement('div');
        exerciseItem.classList.add('exercise-item');
        exerciseItem.innerText = exercise.title;
        exerciseItem.onclick = () => startExercise(index);
        exerciseList.appendChild(exerciseItem);
    });
}

// Función que inicia un ejercicio
function startExercise(index) {
    currentExerciseIndex = index;
    const exercise = exercises[selectedLevel][currentExerciseIndex];
    currentExerciseTime = exercise.time;
    totalTimeSpent = 0;

    // Mostrar ejercicio en progreso
    document.getElementById('exercise-in-progress').style.display = 'block';
    document.getElementById('exercise-list').style.display = 'none';

    document.getElementById('current-exercise-title').innerText = exercise.title;
    document.getElementById('exercise-description').innerText = exercise.description;
    document.getElementById('exercise-tip').innerText = exercise.tip;
    document.getElementById('exercise-image').src = exercise.image;

    // Comenzar el temporizador
    seconds = currentExerciseTime;
    document.getElementById('timer').innerText = `Tiempo: ${formatTime(seconds)}`;
    timer = setInterval(() => {
        seconds--;
        document.getElementById('timer').innerText = `Tiempo: ${formatTime(seconds)}`;
        if (seconds <= 0) {
            clearInterval(timer);
            totalTimeSpent += currentExerciseTime;
            if (totalTimeSpent < totalExerciseTime) {
                document.getElementById('next-btn').style.display = 'block';
            } else {
                finishRoutine();
            }
        }
    }, 1000);
}

// Función para cambiar el formato de tiempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Función para ir al siguiente ejercicio
function nextExercise() {
    currentExerciseIndex++;
    if (currentExerciseIndex >= exercises[selectedLevel].length) {
        currentExerciseIndex = 0;
    }
    startExercise(currentExerciseIndex);
}

// Función para finalizar la rutina
function finishRoutine() {
    alert("¡Rutina completada!");
    resetApp();
}

// Función para reiniciar la aplicación
function resetApp() {
    document.getElementById('exercise-in-progress').style.display = 'none';
    document.getElementById('level-selection').style.display = 'block';
    document.getElementById('exercise-list').style.display = 'none';
}
