<?php
	$secret = '794A1C6215ED23466842292A6FBCBA9407D014FA3BA1ED1788AAB427BCC35CF6';
	$password = $_POST['p'];
	if (strtoupper(hash('sha256', $password, false)) === $secret) {
		echo 0;
	} else {
		echo 1;
	}
?>