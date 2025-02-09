<?php 
	session_start(); 
	require_once '../fonctions/controleur.php';
    controleurVerifierAcces(AUTORISATION_ADMIN);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../ressources/Images/favicon_BTS_Play.png" type="image/png">
    <link href="../ressources/Style/main.css" rel="stylesheet">
    <link href="../ressources/Style/transfert.css" rel="stylesheet">
    <script src="../ressources/Script/script.js"></script>

<?php require_once '../ressources/Templates/header.php'; ?>

<div class="container">
    <div class="colonnes">
        <div class="colonne-1">
            <h1>Transferts</h1>
            <div class="transferts">
                <div class="lignes">
                    <!-- Résultat ajax -->
                </div>
                <div class="commande">
                    <p>Commande de conversion</p>
                    <input type="text" placeholder="ffmpeg -i $video 2>&1">
                    <a class="btn" onclick="lancerConversion()">Lancer conversion</a>
                </div>
                
            </div>
        </div>
        <div class="symbole">
            >
        </div>
        <div class="colonne-2">
            <h2>Vidéos en attente de métadonnées</h2>
            <div class="dates">
                <div class="nomColonne">
                    <p>Date</p>
                    <p>Nom</p>
                </div>
                <?php for ($i=0; $i < 6; $i++) { ?>
                    <div class="ligne">
                        <div>
                            <p>04/05/2025 17:42</p>
                            <p>vidéo.mp4</p>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</div>

<?php require_once '../ressources/Templates/footer.php'; ?>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        scanDossierDecoupeVideo();
        setInterval( scanDossierDecoupeVideo , 5000);
    });
</script>