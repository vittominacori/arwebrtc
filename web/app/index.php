<?php
if(file_exists("uploads/{$_GET['img']}.png")){
	$photo = "uploads/{$_GET['img']}.png";
} else {
	$photo = "uploads/demo.png?" . time();
}
?>

<!doctype html>
<html lang="en" ng-app="ARWebRTC">
<head>
	<?php include "partials/metadata.php"; ?>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body ng-controller="CanvasCtrl">

	<?php include "partials/canvas.php"; ?>

	<script src="js/script.min.js"></script>
</body>
</html>