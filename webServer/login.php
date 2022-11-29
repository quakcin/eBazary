<?php

  include './dbcon.php';
  header('Content-Type: application/json; charset=utf-8');

  $hw = db_con();

  if ($hw == NULL)
  {
    echo '{"ok": false, "msg": ""}';
    exit();
  }


  $v = missing_get(['username', 
                    'password', 
  ]);

  if (strcmp($v, "") == 0)
  {
    echo '{"ok": false, "msg": "_gets are missing"}';
    exit();
  }

  eval($v);

  $salted = $password . $username;
  $hashed = hash('sha256', $salted);
  
  $c = mysqli_query($hw, "SELECT * FROM Account WHERE user = '$username' AND password = '$hashed'");

  while ($row = mysqli_fetch_assoc($c))
  {
    echo '{"ok": true, "id": ' . $row["userId"] . '}';
    exit();
  }

  echo '{"ok": false, "msg": "Login lub haslo nieprawidłowe"}';

?>