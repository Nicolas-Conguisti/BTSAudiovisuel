
// #RISQUE : Dégager ce truc DOMContentLoaded
document.addEventListener("DOMContentLoaded", function(event) {

    if(document.querySelector('.transferts')){
        // Fonction pour déplacer une ligne vers le haut
        function moveUp(button) {
            const ligne = button.parentElement.parentElement; // Trouver la ligne actuelle
            const previousLigne = ligne.previousElementSibling; // Trouver la ligne précédente
    
            if (previousLigne.classList.contains('ligne')) {
                let infoLigne = ligne.innerHTML
                let infoPreviousLigne = previousLigne.innerHTML
    
                ligne.innerHTML = infoPreviousLigne;
                previousLigne.innerHTML = infoLigne;
            }
    
            document.querySelectorAll('.fleche-haut').forEach(button => {
                button.addEventListener('click', function () {
                    moveUp(this); // Passer le bouton cliqué à la fonction
                });
            });
    
            document.querySelectorAll('.fleche-bas').forEach(button => {
                button.addEventListener('click', function () {
                    moveDown(this); // Passer le bouton cliqué à la fonction
                });
            });
        }
    
        // Fonction pour déplacer une ligne vers le bas
        function moveDown(button) {
            const ligne = button.parentElement.parentElement; // Trouver la ligne actuelle
            const nextLigne = ligne.nextElementSibling; // Trouver la ligne suivante
    
            if (nextLigne.classList.contains('ligne')) {
                let infoLigne = ligne.innerHTML
                let infoNextLigne = nextLigne.innerHTML
    
                ligne.innerHTML = infoNextLigne;
                nextLigne.innerHTML = infoLigne;
            }
    
            document.querySelectorAll('.fleche-haut').forEach(button => {
                button.addEventListener('click', function () {
                    moveUp(this); // Passer le bouton cliqué à la fonction
                });
            });
    
            document.querySelectorAll('.fleche-bas').forEach(button => {
                button.addEventListener('click', function () {
                    moveDown(this); // Passer le bouton cliqué à la fonction
                });
            });
        }
    
        // Ajouter des gestionnaires d'événements à toutes les flèches
        document.querySelectorAll('.fleche-haut').forEach(button => {
            button.addEventListener('click', function () {
                moveUp(this); // Passer le bouton cliqué à la fonction
            });
        });
    
        document.querySelectorAll('.fleche-bas').forEach(button => {
            button.addEventListener('click', function () {
                moveDown(this); // Passer le bouton cliqué à la fonction
            });
        });
    }
});


//Fonctions spécifiques à la page home.php et recherche.php
function affichageFiltres(){
    document.querySelector('.afficherFiltres').addEventListener('click', (e) => {
        let filtres = document.querySelector('.filtres');
        let voile = document.querySelector('.voile');
        if(filtres.classList.contains('afficher')){
            filtres.classList.remove('afficher');
            voile.classList.remove('afficher');
        }
        else{
            filtres.classList.add('afficher');
            voile.classList.add('afficher');
        }
    });
}

function initCarrousel(){
    const swiperVideo = new Swiper('.swiperVideo', {
        speed: 400,
        spaceBetween: 100,
        slidesPerView: 3,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}


//Fonctions spécifiques à la page video.php
function initLectureVideo(){
    const player = new Plyr('#player', {
        controls: [
          'play-large', // The large play button in the center
          'restart', // Restart playback
          'rewind', // Rewind by the seek time (default 10 seconds)
          'play', // Play/pause playback
          'fast-forward', // Fast forward by the seek time (default 10 seconds)
          'progress', // The progress bar and scrubber for playback and buffering
          'current-time', // The current time of playback
          'duration', // The full duration of the media
          'mute', // Toggle mute
          'volume', // Volume control
          'captions', // Toggle captions
          'settings', // Settings menu
          'pip', // Picture-in-picture (currently Safari only)
          'airplay', // Airplay (currently Safari only)
          'download', // Custom download button
          'fullscreen' // Toggle fullscreen
        ],
        settings: ['captions', 'quality', 'speed', 'loop'],
        captions: {
          active: true,
          language: 'fr',
          update: true,
        },
    });
}


//Fonctions spécifiques au header.php.
function affichageSousMenu(){
    let sousMenu = document.querySelector('.sousMenu');
    //Si le sous menu n'a pas été chargé car l'utilisateur est déconnecté, on ne fait rien
    if(!(sousMenu == null)){
        console.log("sous menu trouvé");
        sousMenu.style.display = "none";
        document.querySelector('.btnSousMenu').addEventListener('click', (e) => {
        if (sousMenu.style.display == "none") {
            sousMenu.style.display = "block";
            console.log("sous menu affiché");
        } else {
            sousMenu.style.display = "none";
            console.log("sous menu caché");
        }
        })
    }
}

function lancerConversion() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        console.log(this.responseText);
    }
    xhttp.open("POST", "../fonctions/controleur.php");
    
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhttp.send("action=lancerConversion");
}

function scanDossierDecoupeVideo() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const videos = JSON.parse(this.responseText);
        const lignesContainer = document.querySelector('.transferts .lignes');
        lignesContainer.innerHTML = '';
        videos.forEach(video => {
            const ligne = document.createElement('div');
            ligne.classList.add('ligne');
            ligne.innerHTML = `
                <div class="fleches">
                    <a class="fleche-haut">
                        <img src="../ressources/Images/arrow.png" alt="flèche">
                    </a>
                    <a class="fleche-bas">
                        <img src="../ressources/Images/arrow.png" alt="flèche">
                    </a>
                </div>
                <div class="imgVideo">
                    <img src="../ressources/Images/imgVideo.png" alt="">
                </div>
                <div class="info">
                    <p class="nomVideo">${video.nomVideo}</p>
                    <p class="poidsVideo">${video.poidsVideo}</p>
                </div>
                <div class="progress">${video.status}</div>
                <div class="bouton">
                    <a class="pause">
                        <img src="../ressources/Images/pause.png" alt="pause">
                    </a>
                </div>
            `;
            lignesContainer.appendChild(ligne);
        });
    };
    xhttp.open("POST", "../fonctions/controleur.php");
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("action=scanDossierDecoupeVideo");
}

function gestionOngletsAdministration() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    function setActiveTab(tabId) {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        const activeTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);

        if (activeTab && activeContent) {
            activeTab.classList.add('active');
            activeContent.classList.add('active');
        }
    }

    // Vérifie s'il y a un paramètre "tab" dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('tab') || "database"; // "database" par défaut

    setActiveTab(activeTab);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            setActiveTab(tabId);

            // Met à jour l'URL sans recharger la page
            const newUrl = `${window.location.pathname}?tab=${tabId}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
        });
    });
}
function appelScanVideo () { //! SI QUESTION : APPELER MONSIEUR MARRIER
    scanDossierDecoupeVideo();
    setInterval( scanDossierDecoupeVideo , 5000);
}