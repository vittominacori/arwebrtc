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
                alert('getUserMedia is not supported in this browser.');
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
            alert('An error occurred while trying to get camera access (Your browser probably doesnt support getUserMedia() ): ' + error.code);
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
                url: 'upload.php',
                data: 'img=' + $scope.canvas.toDataURL(),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(res) {
                window.open(socialUrl+window.location.protocol + "//" + window.location.host + window.location.pathname+"?img="+res.file);
            });
        };

        $scope.share = {
            save: function(){
                $scope.takePicture('');
            },
            fb: function(){
                $scope.takePicture('https://www.facebook.com/sharer/sharer.php?u=');
            },
            tweet: function(){
                $scope.takePicture('https://twitter.com/intent/tweet?text=Sample of using Augmented Reality with your browser&amp;url=');
            },
            gplus: function(){
                $scope.takePicture('https://plus.google.com/share?url=');
            }
        };

    }]);