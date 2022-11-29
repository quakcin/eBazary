<?php

  include './dbcon.php';
  header('Content-Type: application/json; charset=utf-8');

  $hw = db_con();

  if ($hw == NULL)
  {
    echo '{"ok": false, "msg": ""}';
    exit();
  }


  $v = missing_get(['id']);

  if (strcmp($v, "") == 0)
  {
    echo '{"ok": false, "msg": "_gets are missing"}';
    exit();
  }

  eval($v);
  
  $c = mysqli_query($hw, "SELECT * FROM Account WHERE userId = '$id'");

  /*

const serverResp = 
{
  name: 'Mariusz',
  surname: 'Kowalski',
  user: 'TanieIphonyPL',
  mail: 'tanieiphony@gmail.com',
  desc: 'Właścicielem konta OleOle_pl jest Euro-net  Sp. z o.o. z siedzibą w Warszawie, przy ul. Muszkieterów.',
  image:
    'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/09/professional-mens-hairstyles-light-styling-min.jpg',
  comments: [
    {
      image: 'https://bi.im-g.pl/im/5f/c1/1a/z28053599ICR.jpg',
      stars: 3,
      msg: 'W takiej cenie może być, ale wysyłka długa!'
    },
    {
      image:
        'https://www.muzeumjazzu.pl/wp-content/uploads/2021/09/40-Basia-Trzetrzelewska-1976.jpg',
      stars: 5,
      msg: 'Fantastyczna obsługa, produkt się zgadza - polecam!'
    }
  ]
}
  */


  $outs = array();

  while ($row = mysqli_fetch_assoc($c))
  {
    $outs['user'] = $row;
    break;
  }

  unset($outs['user']['password']);

  $outs['ok'] = true;
  echo json_encode($outs);

?>