document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item'); // Sélectionnez tous les éléments de menu

    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            // Empêche le comportement par défaut du lien (s'il s'agit d'ancres internes)
            // event.preventDefault(); 

            // 1. Supprimer la classe 'active' de l'élément actuellement actif
            const currentActive = document.querySelector('.menu-item.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }

            // 2. Ajouter la classe 'active' à l'élément cliqué
            this.classList.add('active');

            // Si vous utilisez des ancres internes et que vous avez empêché le comportement par défaut,
            // vous pouvez manuellement naviguer vers l'ancre ici :
            // window.location.hash = this.getAttribute('href');
        });
    });

    // Optionnel : Gérer l'état actif lors du chargement de la page pour les rechargements directs
    // Si votre URL contient un fragment (#accueil), vous pouvez activer le bon élément.
    const currentHash = window.location.hash;
    if (currentHash) {
        const correspondingMenuItem = document.querySelector(`.menu-item[href="${currentHash}"]`);
        if (correspondingMenuItem) {
            // Supprimer l'actif par défaut si présent
            const defaultActive = document.querySelector('.menu-item.active');
            if (defaultActive && defaultActive !== correspondingMenuItem) {
                defaultActive.classList.remove('active');
            }
            correspondingMenuItem.classList.add('active');
        }
    }
});
// Cette fonction afficher() est définie mais n'est pas utilisée dans le HTML que tu as fourni.
// Tu peux l'appeler au chargement de la page si tu veux un pop-up initial,
// par exemple en ajoutant <body onload="afficher()"> dans ton HTML.
function afficher(){
    alert("Bienvenue dans le site"); // Correction: "Bienvenue" au lieu de "Bien venu"
}

let total = 0; // Variable pour stocker le score total

function suivant(num){
    // Récupère toutes les options radio pour la question actuelle (ex: name="q1")
    const radios = document.getElementsByName("q" + num); // CORRIGÉ ici : document. ajouté
    let choisie = false; // Indicateur pour savoir si une option a été sélectionnée

    // Parcourt toutes les options radio de la question
    for (let r of radios) {
        if (r.checked) { // Si cette option est cochée
            total += parseInt(r.value); // Ajoute sa valeur au total (convertie en nombre)
            choisie = true; // Marque qu'une option a été choisie
            break; // Sort de la boucle, car on a trouvé la réponse cochée
        }
    }

    // Si aucune option n'a été choisie, affiche une alerte et arrête la fonction
    if (!choisie) {
        alert("Veuillez choisir une réponse avant de continuer."); // CORRIGÉ ici : "choisir une réponse" pour plus de clarté
        return; // Arrête l'exécution de la fonction
    }

    // Masque la question actuelle
    // Trouve le div de la question actuelle par son ID (ex: id="q1") et retire la classe 'active'
    document.getElementById("q" + num).classList.remove("active"); // CORRIGÉ ici : getElementById

    // Tente de trouver le div de la question suivante
    const next = document.getElementById("q" + (num + 1));

    // Si une question suivante existe (l'élément a été trouvé)
    if (next) {
        next.classList.add("active"); // Ajoute la classe 'active' à la question suivante pour l'afficher
    } else {
        // S'il n'y a plus de questions, affiche le bloc de résultat
        document.getElementById("resultat").style.display = "block"; // Rend le div de résultat visible
        // Met à jour le texte du score
        document.getElementById("score").innerText = "Votre score est : " + total + " sur 20."; // Ajout d'espaces pour la lisibilité
    }
}