<?php

  include './dbcon.php';
  header('Content-Type: application/json; charset=utf-8');

  $hw = db_con();

  if ($hw == NULL)
  {
    echo '{"ok": false, "msg": ""}';
    exit();
  }


  $v = missing_get(['userId', 'username', 'name', 'surname', 'mail', 'descr', 'image']);

  if (strcmp($v, "") == 0)
  {
    echo '{"ok": false, "msg": "_gets are missing"}';
    exit();
  }

  eval($v);

  // ----------------------------------------
  // -- Check if account exists

  $c = mysqli_query($hw, "SELECT * FROM Account WHERE (mail = '$mail' or user = '$username') and userId != $userId");

  while ($row = mysqli_fetch_assoc($c))
  {
    echo '{"ok": false, "msg": "Konto juz istnieje!"}';
    exit();
  }

  // ----------------------------------------
  // -- Change data

  $u = mysqli_query
  ( $hw,
   "UPDATE 
      Account 
    SET 
      user = '$username', 
      name = '$name', 
      mail = '$mail', 
      surname = '$surname', 
      descr = '$descr', 
      image = '$image' 
    WHERE 
      userId = $userId"
  );

  echo '{"ok": true}';
?>