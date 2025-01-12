<?php session_start(); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../ressources/Style/main.css" rel="stylesheet">
    <link href="../ressources/Style/formulaire.css" rel="stylesheet">
    <script src="../ressources/Script/script.js"></script>

    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://unpkg.com/swiper@10/swiper-bundle.min.css" />
    <script src="https://unpkg.com/swiper@10/swiper-bundle.min.js"></script>

<?php
    require_once '../ressources/Templates/header.php';
    require_once '../fonctions/fonctions.php';
    require_once '../fonctions/ftp.php';
    require_once '../ressources/constantes.php';
    require_once '../fonctions/modele.php';

    // Récupération de l'URI NAS de la vidéo
    if (isset($_GET['v'])) {
        $id = $_GET['v'];
    }


    if (
        isset($_POST["profReferant"]) ||
        isset($_POST["realisateur"]) || 
        isset($_POST["promotion"]) || 
        isset($_POST["projet"]) || 
        isset($_POST["cadreurNom"]) || 
        isset($_POST["acteur1Nom"]) || 
        isset($_POST["acteur1Role"]) || 
        isset($_POST["acteur2Nom"]) || 
        isset($_POST["acteur2Role"])
    ) {
        // Récupération des champs entrés dans le formulaire
        $profReferant = "NULL";
        if (isset($_POST["profReferant"])) {
            $profReferant = $_POST["profReferant"];
        }

        $realisateur = "NULL";
        if (isset($_POST["realisateur"])) {
            $realisateur = $_POST["realisateur"];
        }
        
        $promotion = "NULL";
        if (isset($_POST["promotion"])) {
            $promotion = $_POST["promotion"];
        }
        
        $projet = "NULL";
        if (isset($_POST["projet"])) {
            $projet = $_POST["projet"];
        }
        
        $cadreur = "NULL";
        if (isset($_POST["cadreur"])) {
            $cadreur = $_POST["cadreur"];
        }
        
        $acteur1Nom = "NULL";
        if (isset($_POST["acteur1Nom"])) {
            $acteur1Nom = $_POST["acteur1Nom"];
        }
        
        $acteur1Role = "NULL";
        if (isset($_POST["acteur1Role"])) {
            $acteur1Role = $_POST["acteur1Role"];
        }
        
        $acteur2Nom = "NULL";
        if (isset($_POST["acteur2Nom"])) {
            $acteur2Nom = $_POST["acteur2Nom"];
        }
        
        $acteur2Role = "NULL";
        if (isset($_POST["acteur2Role"])) {
            $acteur2Role = $_POST["acteur2Role"];
        }

        miseAJourMetadonneesVideo($id, $profReferant, $realisateur, $promotion, $projet, $cadreur, $acteur1Nom, $acteur1Role, $acteur2Nom, $acteur2Role);
    }





    $video = fetchAll("SELECT * FROM Media WHERE id=$id;");
    $video = $video[0];
    $titre = substr($video["mtd_tech_titre"], 0, -4);

    // Charge la miniature
    $miniature = $titre . "_miniature.png";
    $cheminMiniature = URI_VIDEOS_A_LIRE . $video["URI_NAS_MPEG"] . $miniature;
?>

<div class="container">
    <h1>Formulaire des métadonnées</h1>

    <div class="colonnes">
        <div class="colonne-1">
            <div class="img">
                <img src="<?php echo $cheminMiniature; ?>" alt="Miniature de la vidéo" class="imageMiniature">
            </div>
            <h2><?php echo $titre; ?></h2>
            <p><strong>Durée :</strong> <?php echo $video['mtd_tech_duree']; ?></p>
            <p><strong>Images par secondes :</strong> <?php echo $video['mtd_tech_fps']; ?></p>
            <p><strong>Résolution :</strong> <?php echo $video['mtd_tech_resolution']; ?></p>
            <p><strong>Format :</strong> <?php echo $video['mtd_tech_format']; ?></p>
        </div>

        <div class="colonne-2">
            <h2>Équipe</h2>
            <form method="post" action="">
                <div class="champ">
                    <label for="profReferant" class="form-label">Professeur référant</label>
                    <input type="text" id="profReferant" name="profReferant">
                </div>
                <div class="champ">
                    <label for="realisateur" class="form-label">Réalisateur</label>
                    <input type="text" id="realisateur" name="realisateur">
                    
                </div>
                <div class="champ">
                    <label for="promotion">Promotion</label>
                    <input type="text" id="promotion" name="promotion">
                </div>
                <div class="champ">
                    <label for="projet">Projet</label>
                    <input type="text" id="projet" name="projet">
                </div>
                <div class="champ">
                    <label for="cadreurNom">Cadreur</label>
                    <div class="inputs">
                        <input type="text" id="cadreur" name="cadreur">
                    </div>
                </div>
                <div class="champ">
                    <label for="responsableSon">Responsable son</label>
                    <div class="inputs">
                        <input type="text" id="responsableSon" name="responsableSon">
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="btns">
        <a href="video.php?v=<?php echo $id;?>" class="btn">Annuler</a>
        <a href="#" class="btn" onclick="document.querySelector('form').submit();">Confirmer</a> <!-- Avant que vous disiez quoi que ce soit, je sais, il est 6h du mat, vs code est ouvert 7h13 -->
    </div>
</div>