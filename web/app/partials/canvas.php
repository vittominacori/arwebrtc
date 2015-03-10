<div ng-show="!recording">
	<img src="<?=$photo?>">
	<div class="buttons">
		<button ng-click="init()"><i class="icono-image"></i> Take your own</button>
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