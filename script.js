// Variables globales
let selectedLevel = '';
let exercises = [];
let exerciseTimer;
let currentExerciseIndex = 0;

// Función para seleccionar el nivel de ejercicio
function selectLevel(level) {
    selectedLevel = level;

    // Ocultar la selección de nivel
    document.getElementById('level-selection').style.display = 'none';

    // Mostrar la selección de ejercicios
    document.getElementById('exercise-selection').style.display = 'block';

    // Crear lista de ejercicios según el nivel
    generateExerciseList();
}

// Función para generar la lista de ejercicios según el nivel
function generateExerciseList() {
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = '';  // Limpiar la lista anterior

    // Lista de ejercicios para diferentes niveles
    const exerciseOptions = {
        easy: ['Caminar 5 minutos', 'Sentadillas con apoyo', 'Estiramiento de brazos'],
        medium: ['Caminar 10 minutos', 'Sentadillas sin apoyo', 'Estiramiento de piernas', 'Flexiones suaves'],
        hard: ['Caminar 15 minutos', 'Sentadillas avanzadas', 'Flexiones normales', 'Ejercicios de equilibrio']
    };

    // Crear botones para cada ejercicio
    const levelExercises = exerciseOptions[selectedLevel];
    levelExercises.forEach(exercise => {
        const button = document.createElement('button');
        button.textContent = exercise;
        button.onclick = () => addExerciseToRoutine(exercise);
        exerciseList.appendChild(button);
    });
}

// Función para agregar un ejercicio a la rutina
function addExerciseToRoutine(exercise) {
    exercises.push(exercise);
    alert(`Ejercicio añadido: ${exercise}`);
}

// Función para iniciar la rutina
function startRoutine() {
    if (exercises.length === 0) {
        alert('Por favor, selecciona al menos un ejercicio.');
        return;
    }

    // Ocultar la selección de ejercicios
    document.getElementById('exercise-selection').style.display = 'none';

    // Mostrar el timer de ejercicio
    document.getElementById('exercise-timer').style.display = 'block';

    // Iniciar el primer ejercicio
    startExercise();
}

// Función para iniciar el siguiente ejercicio
function startExercise() {
    if (currentExerciseIndex >= exercises.length) {
        alert('Rutina completada, ¡buen trabajo!');
        document.getElementById('exercise-timer').style.display = 'none';
        return;
    }

    // Mostrar el nombre del ejercicio actual
    const exerciseName = exercises[currentExerciseIndex];
    document.getElementById('exercise-name').textContent = exerciseName;

    // Temporizador de 30 segundos por ejercicio (puedes modificarlo)
    let timeLeft = 30;
    document.getElementById('timer').textContent = timeLeft;

    exerciseTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(exerciseTimer);
            completeExercise();
        }
    }, 1000);
}

// Función para completar el ejercicio y pasar al siguiente
function completeExercise() {
    currentExerciseIndex++;
    startExercise();
}
