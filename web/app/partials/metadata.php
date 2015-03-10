<meta name="description" content="Sample of using Augmented Reality with your browser">

<meta property="og:image" content="https://<?=$_SERVER[HTTP_HOST].str_replace('index.php', '', $_SERVER[SCRIPT_NAME])?>uploads/<?=!empty($_GET['img']) ? $_GET['img'].'.png' : 'demo.png' ?>" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Augmented Reality with WebRTC" />
<meta property="og:url" content="<?='https://'.$_SERVER[HTTP_HOST].$_SERVER[REQUEST_URI]?>" />

<title>Augmented Reality with WebRTC</title>