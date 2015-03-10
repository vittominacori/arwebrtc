<?php
if(file_exists("uploads/{$_GET['img']}.png")){
	$photo = "uploads/{$_GET['img']}.png";
} else {
	$photo = "uploads/demo.png";
}
?>

<!doctype html>
<html lang="en" ng-app="ARWebRTC">
<head>
	<?php include "partials/metadata.php"; ?>
</head>
<body ng-controller="CanvasCtrl">

	<?php include "partials/body.php"; ?>

    <link rel="stylesheet" type="text/css" href="css/style.css">
	<script src="js/script.min.js"></script>

	<script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-60592097-1', 'auto');
      ga('require', 'displayfeatures');
      ga('send', 'pageview');

    </script>
</body>
</html>