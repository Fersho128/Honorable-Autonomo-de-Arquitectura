document.addEventListener('DOMContentLoaded', () => {
    // --- Configuración Inicial ---
    const validPasswords = ['Pache', 'Frozen', 'Chapuz', 'Baljeet', 'Ayuno', 'Comandante', 'Medio'];
    const passwordInput = document.getElementById('password-input');
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');
    const loginScreen = document.getElementById('login-screen');
    const curriculumScreen = document.getElementById('curriculum-screen');
    const curriculumGrid = document.getElementById('curriculum-grid');

    // Estructura de datos de la red curricular
    // Cada curso tiene:
    // - id: Un identificador único (usado para la lógica de requisitos)
    // - name: Nombre del curso
    // - credits: Créditos que otorga
    // - prerequisites: Array de IDs de cursos que deben estar aprobados antes de este
    // - approved: Estado inicial (false por defecto)
    const curriculumData = {
        'Primer Año': {
            'Primer Semestre': [
                { id: 'teoriaComunicacion', name: 'Teoría de la Comunicación', credits: 3, prerequisites: [] },
                { id: 'metodosTecnicasInv', name: 'Métodos y Técnicas de Investigación', credits: 3, prerequisites: [] },
                { id: 'fundamentosDiseno', name: 'Fundamentos del Diseño', credits: 5, prerequisites: [] },
                { id: 'mediosExpresion', name: 'Medios de Expresión', credits: 4, prerequisites: [] },
                { id: 'dibujoGeometrico', name: 'Dibujo Geométrico', credits: 4, prerequisites: [] },
                { id: 'geometria', name: 'Geometría', credits: 4, prerequisites: [] },
                { id: 'matematica1', name: 'Matemática 1', credits: 4, prerequisites: [] }
            ],
            'Segundo Semestre': [
                { id: 'sociologiaDesarrolloHumano', name: 'Sociología y Desarrollo Humano', credits: 3, prerequisites: ['metodosTecnicasInv'] },
                { id: 'teoriaMetodosDiseno1', name: 'Teoría y Métodos del Diseño 1', credits: 3, prerequisites: ['teoriaComunicacion', 'metodosTecnicasInv', 'fundamentosDiseno'] },
                { id: 'disenoArquitectonico1', name: 'Diseño Arquitectónico 1', credits: 6, prerequisites: ['metodosTecnicasInv', 'fundamentosDiseno', 'mediosExpresion', 'dibujoGeometrico', 'geometria'] },
                { id: 'dibujoNatural', name: 'Dibujo Natural', credits: 4, prerequisites: ['mediosExpresion'] },
                { id: 'dibujoTecnico', name: 'Dibujo Técnico', credits: 5, prerequisites: ['dibujoGeometrico', 'geometria'] },
                { id: 'dibujoProyectual', name: 'Dibujo Proyectual', credits: 4, prerequisites: ['dibujoGeometrico', 'geometria'] },
                { id: 'matematica2', name: 'Matemática 2', credits: 4, prerequisites: ['matematica1'] }
            ]
        },
        'Segundo Año': {
            'Tercer Semestre': [
                { id: 'historiaArquitectura1', name: 'Historia de la Arquitectura 1', credits: 4, prerequisites: ['teoriaMetodosDiseno1'] },
                { id: 'ecologiaHumana', name: 'Ecología Humana', credits: 3, prerequisites: ['sociologiaDesarrolloHumano'] },
                { id: 'disenoArquitectonico2', name: 'Diseño Arquitectónico 2', credits: 6, prerequisites: ['teoriaMetodosDiseno1', 'disenoArquitectonico1', 'dibujoNatural', 'dibujoTecnico', 'dibujoProyectual'] },
                { id: 'presentacion1', name: 'Presentación 1', credits: 5, prerequisites: ['dibujoNatural', 'dibujoTecnico', 'dibujoProyectual'] },
                { id: 'herramientasDigitales1', name: 'Herramientas Digitales 1', credits: 5, prerequisites: ['dibujoTecnico', 'dibujoProyectual'] },
                { id: 'topografia', name: 'Topografía', credits: 4, prerequisites: ['dibujoTecnico', 'dibujoProyectual', 'matematica2'] },
                { id: 'fisica1', name: 'Física 1', credits: 4, prerequisites: ['matematica2'] }
            ],
            'Cuarto Semestre': [
                { id: 'historiaArquitectura2', name: 'Historia de la Arquitectura y el Arte 2', credits: 4, prerequisites: ['historiaArquitectura1'] },
                { id: 'elementosAnalisisTerritorial', name: 'Elementos del Análisis Territorial', credits: 3, prerequisites: ['ecologiaHumana'] },
                { id: 'disenoArquitectonico3', name: 'Diseño Arquitectónico 3', credits: 7, prerequisites: ['historiaArquitectura1', 'disenoArquitectonico2', 'presentacion1', 'herramientasDigitales1', 'topografia'] },
                { id: 'modelosArquitectonicos1', name: 'Modelos Arquitectónicos 1', credits: 5, prerequisites: ['presentacion1', 'topografia'] },
                { id: 'herramientasDigitales2', name: 'Herramientas Digitales 2', credits: 5, prerequisites: ['herramientasDigitales1'] },
                { id: 'introduccionConstruccion', name: 'Introducción a la Construcción y Materiales de Construcción', credits: 4, prerequisites: ['fisica1'] },
                { id: 'fisica2', name: 'Física 2', credits: 4, prerequisites: ['fisica1'] }
            ]
        },
        'Tercer Año': {
            'Quinto Semestre': [
                { id: 'historiaArquitectura3', name: 'Historia de la Arquitectura y el Arte 3', credits: 4, prerequisites: ['historiaArquitectura2', 'elementosAnalisisTerritorial'] },
                { id: 'teoriaArquitectura1', name: 'Teoría de la Arquitectura 1', credits: 3, prerequisites: ['historiaArquitectura2'] },
                { id: 'elementosAnalisisUrbano', name: 'Elementos del Análisis Urbano', credits: 3, prerequisites: ['elementosAnalisisTerritorial'] },
                { id: 'manejoDisenoAmbiental1', name: 'Manejo y Diseño Ambiental 1', credits: 3, prerequisites: ['elementosAnalisisTerritorial'] },
                { id: 'disenoArquitectonico4', name: 'Diseño Arquitectónico 4', credits: 7, prerequisites: ['historiaArquitectura2', 'elementosAnalisisTerritorial', 'disenoArquitectonico3', 'modelosArquitectonicos1', 'herramientasDigitales2', 'introduccionConstruccion', 'fisica2'] },
                { id: 'construccion1', name: 'Construcción 1', credits: 4, prerequisites: ['introduccionConstruccion'] },
                { id: 'resistenciaMateriales', name: 'Resistencia de Materiales', credits: 4, prerequisites: ['fisica2'] }
            ],
            'Sexto Semestre': [
                { id: 'teoriaArquitectura2', name: 'Teoría de la Arquitectura 2', credits: 3, prerequisites: ['historiaArquitectura3', 'teoriaArquitectura1'] },
                { id: 'introduccionPlanificacionUrbana', name: 'Introducción a la Planificación Urbana', credits: 3, prerequisites: ['elementosAnalisisUrbano'] },
                { id: 'disenoArquitectonico5', name: 'Diseño Arquitectónico 5', credits: 7, prerequisites: ['historiaArquitectura3', 'manejoDisenoAmbiental1', 'disenoArquitectonico4', 'construccion1', 'resistenciaMateriales'] },
                { id: 'construccion2', name: 'Construcción 2', credits: 4, prerequisites: ['construccion1'] },
                { id: 'instalaciones1', name: 'Instalaciones 1', credits: 4, prerequisites: ['construccion1'] },
                { id: 'calculoEstructural1', name: 'Cálculo Estructural 1', credits: 4, prerequisites: ['resistenciaMateriales'] },
                { id: 'tipologiaLogicaEstructural1', name: 'Tipología y Lógica Estructural 1', credits: 3, prerequisites: ['resistenciaMateriales'] }
            ]
        },
        'Cuarto Año': {
            'Séptimo Semestre': [
                { id: 'analisisArquitecturaPrehispanica', name: 'Análisis de Arquitectura Prehispánica', credits: 3, prerequisites: ['teoriaArquitectura2'] },
                { id: 'teoriaArquitectura3', name: 'Teoría de la Arquitectura 3', credits: 3, prerequisites: ['teoriaArquitectura2'] },
                { id: 'manejoDisenoAmbiental2', name: 'Manejo y Diseño Ambiental 2', credits: 3, prerequisites: ['manejoDisenoAmbiental1'] },
                { id: 'investigacion1', name: 'Investigación 1 y Formulación de Proyecto', credits: 4, prerequisites: ['introduccionPlanificacionUrbana', 'disenoArquitectonico5'] },
                { id: 'disenoArquitectonico6', name: 'Diseño Arquitectónico 6', credits: 8, prerequisites: ['teoriaArquitectura2', 'introduccionPlanificacionUrbana', 'disenoArquitectonico5', 'construccion2', 'instalaciones1', 'calculoEstructural1', 'tipologiaLogicaEstructural1'] },
                { id: 'dibujoConstructivo', name: 'Dibujo Constructivo', credits: 3, prerequisites: ['modelosArquitectonicos1'] },
                { id: 'herramientasDigitales3', name: 'Herramientas Digitales 3', credits: 4, prerequisites: ['modelosArquitectonicos1', 'herramientasDigitales2'] },
                { id: 'construccion3', name: 'Construcción 3', credits: 4, prerequisites: ['construccion2', 'instalaciones1', 'tipologiaLogicaEstructural1'] },
                { id: 'instalaciones2', name: 'Instalaciones 2', credits: 4, prerequisites: ['instalaciones1', 'construccion2'] },
                { id: 'calculoEstructural2', name: 'Cálculo Estructural 2', credits: 4, prerequisites: ['calculoEstructural1', 'tipologiaLogicaEstructural1'] }
            ],
            'Octavo Semestre': [
                { id: 'analisisArquitecturaColonial', name: 'Análisis de Arquitectura Colonial', credits: 3, prerequisites: ['analisisArquitecturaPrehispanica'] },
                { id: 'criticaArquitectura1', name: 'Crítica de la Arquitectura 1', credits: 3, prerequisites: ['teoriaArquitectura3'] },
                { id: 'introduccionDisenoUrbano', name: 'Introducción al Diseño Urbano', credits: 3, prerequisites: ['introduccionPlanificacionUrbana'] },
                { id: 'manejoDisenoAmbiental3', name: 'Manejo y Diseño Ambiental 3', credits: 3, prerequisites: ['manejoDisenoAmbiental2'] },
                { id: 'investigacion2', name: 'Investigación 2 y Formulación de Proyecto', credits: 4, prerequisites: ['investigacion1'] },
                { id: 'disenoArquitectonico7', name: 'Diseño Arquitectónico 7', credits: 8, prerequisites: ['investigacion1', 'disenoArquitectonico6', 'dibujoConstructivo', 'herramientasDigitales3', 'construccion3', 'instalaciones2', 'calculoEstructural2'] },
                { id: 'presentacion2', name: 'Presentación 2', credits: 0, prerequisites: ['dibujoConstructivo'] }, // No indicaste créditos, asumí 0
                { id: 'instalaciones3', name: 'Instalaciones 3', credits: 4, prerequisites: ['instalaciones2', 'construccion3'] },
                { id: 'administracion1', name: 'Administración 1', credits: 3, prerequisites: ['construccion3', 'instalaciones2'] },
                { id: 'presupuestos', name: 'Presupuestos', credits: 5, prerequisites: ['construccion3', 'instalaciones2'] },
                { id: 'practicaIntegrada1', name: 'Práctica Integrada 1', credits: 4, prerequisites: ['calculoEstructural2', 'instalaciones3', 'presupuestos', 'disenoArquitectonico7'] },
                { id: 'dimensionamientoEstructural1', name: 'Dimensionamiento Estructural 1', credits: 4, prerequisites: ['calculoEstructural2'] }
            ]
        },
        'Quinto Año': {
            'Noveno Semestre': [
                { id: 'conservacionMonumentos', name: 'Conservación de Monumentos', credits: 0, prerequisites: ['analisisArquitecturaColonial'] }, // Asumo créditos 0
                { id: 'criticaArquitectura2', name: 'Crítica de la Arquitectura 2', credits: 0, prerequisites: ['criticaArquitectura1'] }, // Asumo créditos 0
                { id: 'introduccionPlanificacionTerritorial', name: 'Introducción a la Planificación Territorial', credits: 0, prerequisites: ['introduccionDisenoUrbano'] }, // Asumo créditos 0
                { id: 'investigacion3', name: 'Investigación 3 y Formulación de Proyecto', credits: 0, prerequisites: ['investigacion2'] }, // Asumo créditos 0
                { id: 'disenoArquitectonico8', name: 'Diseño Arquitectónico 8', credits: 0, prerequisites: ['disenoArquitectonico7', 'administracion1', 'presupuestos'] }, // Asumo créditos 0
                { id: 'modelosArquitectonicos2', name: 'Modelos Arquitectónicos 2', credits: 0, prerequisites: ['modelosArquitectonicos1'] }, // Asumo créditos 0
                { id: 'herramientasDigitales4', name: 'Herramientas Digitales 4', credits: 0, prerequisites: ['herramientasDigitales3'] }, // Asumo créditos 0
                { id: 'construccion4', name: 'Construcción 4', credits: 0, prerequisites: ['construccion3', 'administracion1'] }, // Asumo créditos 0
                { id: 'administracion2', name: 'Administración 2', credits: 0, prerequisites: ['administracion1', 'presupuestos'] }, // Asumo créditos 0
                { id: 'supervisionObras', name: 'Supervisión de Obras', credits: 0, prerequisites: ['practicaIntegrada1'] }, // Asumo créditos 0
                { id: 'dimensionamientoEstructural2', name: 'Dimensionamiento Estructural 2', credits: 0, prerequisites: ['practicaIntegrada1', 'dimensionamientoEstructural1'] } // Asumo créditos 0
            ],
            'Decimo Semestre': [
                { id: 'disenoArquitectonico9', name: 'Diseño Arquitectónico 9', credits: 0, prerequisites: ['investigacion3', 'disenoArquitectonico8'] }, // Asumo créditos 0
                { id: 'construccion5', name: 'Construcción 5', credits: 0, prerequisites: ['construccion4'] }, // Asumo créditos 0
                { id: 'economiaEmpresarial', name: 'Economía Empresarial', credits: 0, prerequisites: ['administracion2'] }, // Asumo créditos 0
                { id: 'practicaIntegrada2', name: 'Práctica Integrada 2', credits: 0, prerequisites: ['supervisionObras', 'practicaIntegrada1', 'dimensionamientoEstructural2'] } // Asumo créditos 0
            ]
        }
    };

    // Para persistir el estado de aprobado, usaremos localStorage
    // Carga el estado de los cursos desde localStorage al iniciar
    function loadApprovedCourses() {
        try {
            const approvedState = JSON.parse(localStorage.getItem('approvedCourses')) || {};
            // Itera sobre curriculumData para actualizar el estado 'approved'
            for (const year in curriculumData) {
                for (const semester in curriculumData[year]) {
                    curriculumData[year][semester].forEach(course => {
                        if (approvedState[course.id]) {
                            course.approved = true;
                        }
                    });
                }
            }
        } catch (e) {
            console.error("Error al cargar el estado de los cursos desde localStorage:", e);
            localStorage.removeItem('approvedCourses'); // Limpiar datos corruptos
        }
    }

    // Guarda el estado actual de los cursos aprobados en localStorage
    function saveApprovedCourses() {
        const approvedState = {};
        for (const year in curriculumData) {
            for (const semester in curriculumData[year]) {
                curriculumData[year][semester].forEach(course => {
                    if (course.approved) {
                        approvedState[course.id] = true;
                    }
                });
            }
        }
        localStorage.setItem('approvedCourses', JSON.stringify(approvedState));
    }


    // --- Funciones de Lógica ---

    // Verifica si un curso puede ser desbloqueado (todos sus prerrequisitos están aprobados)
    function canUnlockCourse(course) {
        if (course.prerequisites.length === 0) {
            return true; // No tiene prerrequisitos
        }
        // Verifica si TODOS los prerrequisitos están aprobados
        return course.prerequisites.every(prereqId => {
            // Busca el curso prerrequisito en todos los semestres
            let prereqCourse = null;
            for (const year in curriculumData) {
                for (const semester in curriculumData[year]) {
                    prereqCourse = curriculumData[year][semester].find(c => c.id === prereqId);
                    if (prereqCourse) break; // Si lo encuentra, sale del bucle de semestres
                }
                if (prereqCourse) break; // Si lo encuentra, sale del bucle de años
            }
            return prereqCourse && prereqCourse.approved;
        });
    }

    // Renderiza la malla curricular
    function renderCurriculum() {
        curriculumGrid.innerHTML = ''; // Limpia el contenido actual
        for (const year in curriculumData) {
            // Título del Año
            const yearTitle = document.createElement('div');
            yearTitle.className = 'course-year-semester';
            yearTitle.textContent = year;
            curriculumGrid.appendChild(yearTitle);

            for (const semester in curriculumData[year]) {
                // Título del Semestre
                const semesterTitle = document.createElement('div');
                semesterTitle.className = 'course-year-semester';
                semesterTitle.textContent = semester;
                curriculumGrid.appendChild(semesterTitle);

                curriculumData[year][semester].forEach(course => {
                    const courseCard = document.createElement('div');
                    courseCard.className = 'course-card';
                    courseCard.dataset.courseId = course.id; // Guarda el ID del curso en el elemento HTML

                    // Verifica si el curso ya está aprobado o si puede ser desbloqueado
                    const isApproved = course.approved;
                    const isUnlockable = canUnlockCourse(course);

                    if (isApproved) {
                        courseCard.classList.add('approved');
                    } else if (!isUnlockable) {
                        courseCard.classList.add('disabled'); // Estilo para cursos no desbloqueados
                    }

                    courseCard.innerHTML = `
                        <h3>${course.name}</h3>
                        <p>Créditos: ${course.credits}</p>
                        ${course.prerequisites.length > 0 ? `<p class="course-info">Req: ${course.prerequisites.map(prereqId => {
                            // Busca el nombre del prerrequisito por su ID
                            let prereqName = 'Desconocido';
                            for (const y in curriculumData) {
                                for (const s in curriculumData[y]) {
                                    const found = curriculumData[y][s].find(c => c.id === prereqId);
                                    if (found) {
                                        prereqName = found.name;
                                        break;
                                    }
                                }
                                if (prereqName !== 'Desconocido') break;
                            }
                            return prereqName;
                        }).join(', ')}</p>` : '<p class="course-info">Sin prerrequisitos</p>'}
                        <button class="course-button" ${isApproved || !isUnlockable ? 'disabled' : ''}>${isApproved ? 'APROBADO' : 'Marcar Aprobado'}</button>
                    `;

                    const approveButton = courseCard.querySelector('.course-button');
                    approveButton.addEventListener('click', () => {
                        if (!course.approved && isUnlockable) {
                            course.approved = true;
                            saveApprovedCourses(); // Guarda el estado
                            renderCurriculum(); // Vuelve a renderizar para actualizar el estado visual
                        }
                    });

                    curriculumGrid.appendChild(courseCard);
                });
            }
        }
    }

    // --- Lógica de Login ---
    loginButton.addEventListener('click', () => {
        const enteredPassword = passwordInput.value.trim();
        if (validPasswords.includes(enteredPassword)) {
            errorMessage.textContent = ''; // Limpiar mensaje de error
            loginScreen.classList.remove('active');
            loginScreen.classList.add('hidden');
            setTimeout(() => { // Pequeño retraso para que la transición sea visible
                curriculumScreen.classList.remove('hidden');
                curriculumScreen.classList.add('active');
                loadApprovedCourses(); // Carga el estado al entrar a la red
                renderCurriculum(); // Renderiza la red curricular
            }, 500); // Duración de la transición en CSS
        } else {
            errorMessage.textContent = 'Contraseña incorrecta. Intenta de nuevo.';
            passwordInput.value = ''; // Limpiar campo
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            loginButton.click(); // Simula un clic en el botón al presionar Enter
        }
    });

    // Carga inicial (asegúrate de que la pantalla de login esté activa al cargar)
    loginScreen.classList.add('active');
    curriculumScreen.classList.add('hidden');
});
