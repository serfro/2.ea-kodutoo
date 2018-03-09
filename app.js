<?php
	require ("../config.php");
	$database = "if17_rinde";
	
	$sfLanguage = "";
	$sfLanguageError = "";
	
	$sfJanuary = "";
	$sfFebruary = "";
	$sfMarch = "";
	$sfApril = "";
	$sfMay = "";
	$sfJune = "";
	$sfJuly = "";
	$sfAugust = "";
	$sfSeptember = ""; 
	$sfOctober = "";
	$sfNovember = ""; 
	$sfDecember = "";
	$notice = "";
	echo $notice;
	
	//$sfMonthNamesEst = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
	//CREATE TABLE `if17_frolov`.`vpmonths` ( `id` INT(5) NOT NULL AUTO_INCREMENT , `firstname` VARCHAR(30) NOT NULL , `lastname` VARCHAR(30) NOT NULL , `language` VARCHAR(30) NOT NULL , `january` VARCHAR(30) NOT NULL , `february` VARCHAR(30) NOT NULL , `march` VARCHAR(30) NOT NULL , `april` VARCHAR(30) NOT NULL , `may` VARCHAR(30) NOT NULL , `june` VARCHAR(30) NOT NULL , `july` VARCHAR(30) NOT NULL , `august` VARCHAR(30) NOT NULL , `september` VARCHAR(30) NOT NULL , `october` VARCHAR(30) NOT NULL , `november` VARCHAR(30) NOT NULL , `december` VARCHAR(30) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
	//$practiceStarted = date("d.m.Y") ." " ."8:15";

	//echo strtotime($practiceStarted);
	//echo strtotime("now");
	if (isset ($_POST["sfChooseMonth"])and isset($sfLanguage)){
		if (empty($_POST["sfLanguage"])){
			$sfLanguageError ="NB! Väli on kohustuslik!";
		} else {
			$sfLanguage = $_POST["sfLanguage"];
		}
	}
	if (isset($_POST["sfChooseMonth"])and isset($sfLanguage)){
		$sfRandom = 0;
		$sfCount = 0;
		echo "...";
		//$sfMonthFromDb = "";
		$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		
		if($sfLanguage == "4"){
			$stmt = $mysqli->prepare("SELECT COUNT(*) FROM vpmonths");
			$stmt->bind_result($sfCount);
			$stmt->execute();
			$stmt->fetch();
			$stmt->close();
			
			$sfRandom = rand(1, intval($sfCount));
			
			$stmt = $mysqli->prepare("SELECT january, february, march, april, may, june, july, august, september, october, november, december FROM vpmonths WHERE id = ?");
			$stmt->bind_param("i", $sfRandom);
			$stmt->bind_result($sfJanuary, $sfFebruary, $sfMarch, $sfApril, $sfMay, $sfJune, $sfJuly, $sfAugust, $sfSeptember, $sfOctober, $sfNovember, $sfDecember);
			
		} else {
		$stmt = $mysqli->prepare("SELECT january, february, march, april, may, june, july, august, september, october, november, december FROM vpmonths WHERE id = ?");
		$stmt->bind_param("i", $sfLanguage);
		$stmt->bind_result($sfJanuary, $sfFebruary, $sfMarch, $sfApril, $sfMay, $sfJune, $sfJuly, $sfAugust, $sfSeptember, $sfOctober, $sfNovember, $sfDecember);
		}
		if($stmt->execute()){
			$notice = "korras";
		} else {
			$notice = $stmt->error;
		}
		$stmt->fetch();
		$stmt->close();
		$mysqli->close();
	}
	
	
	
	
	/*$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		//valmistame ette käsu andmebaasiserverile
		$stmt = $mysqli->prepare("INSERT INTO vpusers (firstname, lastname, birthday, gender, email, password) VALUES (?, ?, ?, ?, ?, ?)");
		echo $mysqli->error;
		//s - string
		//i - integer
		//d - decimal
		$stmt->bind_param("sssiss", $signupFirstName, $signupFamilyName, $signupBirthDate, $gender, $signupEmail, $signupPassword);
		//$stmt->execute();
		if ($stmt->execute()){
			echo "\n Õnnestus!";
		} else {
			echo "\n Tekkis viga : " .$stmt->error;
		}
		$stmt->close();
		$mysqli->close();
	} */
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title> </title>
</head>


<body>
<p> Mis keel?</p>
<form method="POST">
<input type="radio" name="sfLanguage" value="1" <?php if ($sfLanguage == "1") {echo 'checked';} ?>><label>Eesti</label>

<input type="radio" name="sfLanguage" value="2" <?php if ($sfLanguage == "2") {echo 'checked';} ?>><label>English</label>

<input type="radio" name="sfLanguage" value="3" <?php if ($sfLanguage == "3") {echo 'checked';} ?>><label>German</label>

<input type="radio" name="sfLanguage" value="4" <?php if ($sfLanguage == "4") {echo 'checked';} ?>><label>Random</label>

<br><br>
<input name="sfChooseMonth" type="submit" value="Kinnita">
</form>
<?php
if(isset($_POST["sfChooseMonth"]) and isset($sfLanguage)){
	if(date("m") == "1"){
		echo date("d.Y ");
		echo $sfJanuary;
	}
	if(date("m") == "2"){
		echo date("d.Y ");
		echo $sfFebruary;
	}
		if(date("m") == "3"){
		echo date("d.Y ");
		echo $sfMarch;
	}
		if(date("m") == "4"){
		echo date("d.Y ");
		echo $sfApril;
	}
		if(date("m") == "5"){
		echo date("d.Y ");
		echo $sfMay;
	}
		if(date("m") == "6"){
		echo date("d.Y ");
		echo $sfJune;
	}
		if(date("m") == "7"){
		echo date("d.Y ");
		echo $sfJuly;
	}
		if(date("m") == "8"){
		echo date("d.Y ");
		echo $sfAugust;
	}
		if(date("m") == "9"){
		echo date("d.Y ");
		echo $sfSeptember;
	}	if(date("m") == "10"){
		echo date("d.Y ");
		echo $sfOctober;
	}	if(date("m") == "11"){
		echo date("d.Y ");
		echo $sfNovember;
	}	if(date("m") == "12"){
		echo date("d.Y ");
		echo $sfDecember;
	}
}
?>
</body>
</html>