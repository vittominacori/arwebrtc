<div ng-show="!recording">
	<img src="<?=$photo?>">
	<div class="buttons">
		<button ng-click="init()"><i class="icono-play"></i> Take your own</button>
		<button class="fb" ng-click="share.fb()"><i class="icono-facebook"></i></button>
		<button class="tw" ng-click="share.tweet()"><i class="icono-twitter"></i></button>
		<button class="gp" ng-click="share.gplus()"><i class="icono-gplus"></i></button>
		<button class="in" ng-click="share.in()"><i class="icono-linkedIn"></i></button>
	</div>
</div>

<div ng-show="recording">

	<video autoplay class="preview"></video>
	<canvas height="426" width="515"></canvas>


	<div class="buttons">
		<button ng-click="share.save()"><i class="icono-image"></i> Take a picture</button>
	</div>
</div>

<div class="footer">nightly built by <a href="https://twitter.com/VittoMinacori" target="_blank">@VittoMinacori</a></footer>