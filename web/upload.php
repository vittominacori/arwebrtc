<?php

define('UPLOAD_DIR', 'uploads/');
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$uniqid = uniqid();
$file = UPLOAD_DIR . $uniqid . '.png';
$success = file_put_contents($file, $data);

if($success){
	echo json_encode(array('status'=>1,'file'=>$uniqid));
} else {
	echo json_encode(array('status'=>0,'message'=>'Unable to save the file.'));
}