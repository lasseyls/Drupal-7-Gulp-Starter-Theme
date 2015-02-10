<!doctype html>
<html class="no-js" lang="">
<head>
	<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<?php print $head; ?>
	<title><?php print $head_title; ?></title>
	<link rel="shortcut icon" href="<?php print $directory; ?>/build/images/favicon.ico">
	<link rel="apple-touch-icon" href="<?php print $directory; ?>/build/images/apple-touch-icon.png">
	<?php print $styles; ?>
	<?php print $scripts; ?>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
	<!--[if lt IE 8]>
	<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
	<![endif]-->

	<div id="skip-link">
		<a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
	</div>

	<?php print $page_top; ?>
	<?php print $page; ?>
	<?php print $page_bottom; ?>

	<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
	<script>
	  (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
		function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
		e=o.createElement(i);r=o.getElementsByTagName(i)[0];
		e.src='//www.google-analytics.com/analytics.js';
		r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
	  ga('create','UA-XXXXX-X','auto');ga('send','pageview');
	</script>
</body>
</html>
