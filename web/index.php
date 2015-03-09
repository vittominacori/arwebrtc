<!doctype html>
<html lang="en" ng-app="ARWebRTC">
<head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body ng-controller="CanvasCtrl">

<div ng-show="!recording">
<img src="uploads/<?=!empty($_GET['img']) ? $_GET['img'].'.png' : 'demo.png' ?>">
	<div class="buttons">
		<button ng-click="init()"><i class="icono-image"></i> Take yours</button>
	</div>
</div>

<div ng-show="recording">

	<video autoplay class="preview"></video>
	<canvas height="426" width="515"></canvas>


	<div class="buttons">
		<button ng-click="share.save()"><i class="icono-image"></i> Save image</button>
		<button class="fb" ng-click="share.fb()"><i class="icono-facebook"></i> Share</button>
		<button class="tw" ng-click="share.tweet()"><i class="icono-twitter"></i> Tweet</button>
		<button class="gp" ng-click="share.gplus()"><i class="icono-gplus"></i> +1</button>
	</div>
</div>

<script src="js/plugins.js"></script>
<script src="js/script.js"></script>
</body>
</html>