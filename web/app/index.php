<?php

require('../../vendor/autoload.php');

define('UPLOAD_DIR', 'uploads/');

function getData($img = 'demo'){
    $data = array();

    $data['title'] = "Try Augmented Reality in your browser";
    $data['description'] = "Take and share your own photo using Augmented Reality in your browser with WebRTC and JavaScript.";
    $data['hashtags'] = "AR,WebRTC,JavaScript";
    $data['via'] = "VittoMinacori";

    $data['photo'] = UPLOAD_DIR."demo.png";
    if(file_exists(UPLOAD_DIR."{$img}.png")){
        $data['photo'] = UPLOAD_DIR."{$img}.png";
    }

    $data['ogImage'] = "https://{$_SERVER[HTTP_HOST]}".str_replace('index.php', '', $_SERVER[SCRIPT_NAME]).$data['photo']."?".time();
    $data['currentUrl'] = "https://{$_SERVER[HTTP_HOST]}{$_SERVER[REQUEST_URI]}";

    return $data;
}

$app = new Silex\Application();

// Register the Twig templating engine
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

$app->get('/', function () use ($app) {
    return $app['twig']->render('index.twig', getData());;
});

$app->get('/{img}', function ($img) use ($app) {
    return $app['twig']->render('index.twig', getData($img));
});

$app->post('/upload', function () {

    $img = $_POST['img'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $uniqId = uniqid();
    $file = UPLOAD_DIR . $uniqId . '.png';
    $success = file_put_contents($file, $data);

    if($success){
        return json_encode(array('status'=>1,'file'=>$uniqId));
    } else {
        return json_encode(array('status'=>0,'message'=>'Unable to save the file.'));
    }
});


$app->run();
?>