var ARWebRTC = angular.module('ARWebRTC', []);

/**********************************************************/

ARWebRTC.controller('CanvasCtrl', ['$scope', '$interval', '$http',
    function ($scope, $interval, $http) {
        $scope.recording = false;

        $scope.init = function() {
            $scope.video = document.querySelector('video');
            $scope.canvas = document.querySelector("canvas");
            $scope.ctx = $scope.canvas.getContext("2d");

            navigator.getUserMedia = (
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
            );

            if (navigator.getUserMedia) {
                navigator.getUserMedia({
                    video: true,
                    audio: false
                }, $scope.successCallback, $scope.errorCallback);
            } else {
                alert(':( Sorry your browser does not support getUserMedia(). Try opening this page on Chrome or Firefox!');
            }

        };

        $scope.successCallback = function(stream) {
            console.log('yeah! camera support!');
            if(window.URL) {
                $scope.video.src = window.URL ? window.URL.createObjectURL(stream) : stream;
            }
            else {
                $scope.video.src = stream;
            }

            $scope.start('clown');

            $scope.recording = true;
        };

        $scope.errorCallback = function(error) {
            alert('An error occurred while trying to get camera access (Your browser probably does not support getUserMedia() ): ' + error.code);
            return;
        };

        $scope.drawToCanvas = function(effect) {
            var video = $scope.video,
                ctx = $scope.ctx,
                canvas = $scope.canvas,
                i;

            ctx.drawImage(video, 0, 0, 515,426);

            $scope.pixels = ctx.getImageData(0,0,canvas.width,canvas.height);

            $scope.image = new Image();
            $scope.image.src = "img/" + effect + ".png";

            var comp = ccv.detect_objects({ "canvas" : ($scope.canvas),
                "cascade" : cascade,
                "interval" : 5,
                "min_neighbors" : 1 });
            for (i = 0; i < comp.length; i++) {
                ctx.drawImage($scope.image, comp[i].x, comp[i].y,comp[i].width, comp[i].height);
            }
        };

        $scope.start = function(effect) {
            if($scope.playing) { clearInterval($scope.playing); }
            $scope.playing = $interval(function() {
                $scope.drawToCanvas(effect);
            },10);
        };

        $scope.takePicture = function(socialUrl) {

            $http({
                method: 'POST',
                url: 'upload',
                data: 'img=' + $scope.canvas.toDataURL(),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function(res) {
                    if(res.status == 1){
                        document.location.href = '/'+res.file;
                    } else {
                        alert(res.message);
                    }
                });
        };

        $scope.share = {
            save: function(){
                $scope.takePicture('');
            },
            fb: function(){
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + document.location.href);
            },
            tweet: function(){
                window.open('https://twitter.com/intent/tweet?hashtags='+Window.hashtags+'&via='+Window.via+'&text='+Window.title+'&url=' + document.location.href);
            },
            gplus: function(){
                window.open('https://plus.google.com/share?url=' + document.location.href);
            },
            in: function(){
                window.open('https://www.linkedin.com/shareArticle?mini=true&title='+Window.title+'&summary='+Window.description+'&url=' + document.location.href);
            }
        };

    }]);