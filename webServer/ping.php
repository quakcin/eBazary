<?php

  include './dbcon.php';
  header('Content-Type: application/json; charset=utf-8');

  $hw = db_con();

  if ($hw == NULL)
  {
    echo '{"ok": false}';
  }
  else
  {
    echo '{"ok": true}';
  }
  /*
    USAGE EXAMPLE:
    $qr = mysqli_query($hw, "SELECT * FROM Konto");
    
    while ($row = mysqli_fetch_assoc($qr))
    {
      print_r($row);
    }

    echo "<br>pass";
  */
?>