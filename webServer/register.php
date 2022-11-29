<?php

  include './dbcon.php';
  header('Content-Type: application/json; charset=utf-8');

  $hw = db_con();

  if ($hw == NULL)
  {
    echo '{"ok": false, "msg": ""}';
    exit();
  }


  // ----------------------------------------
  // -- Confirm _GET keys exist

  $v = missing_get(['username', 
                    'password', 
                    'name',
                    'surname',
                    'mail'
  ]);

  if (strcmp($v, "") == 0)
  {
    echo '{"ok": false, "msg": "_gets are missing"}';
    exit();
  }

  eval($v); // alloc get keys freely

  // ----------------------------------------
  // -- Hash Password

  $salted = $password . $username;
  $hashed = hash('sha256', $salted);


  // ----------------------------------------
  // -- Check if account exists

  $c = mysqli_query($hw, "SELECT * FROM Konto WHERE Email = '$mail'");

  while ($row = mysqli_fetch_assoc($c))
  {
    echo '{"ok": false, "msg": "Konto juz istnieje!"}';
    exit();
  }


  // ----------------------------------------
  // -- Create account

  $r = mysqli_query( $hw, 
    "INSERT INTO 
      Konto 
    VALUES 
    (
      NULL, 
      '$username', 
      '$name', 
      '$surname', 
      '$mail', 
      '$hashed', 
      NULL
    )
  ");

  echo '{"ok": true"}';

?>