<?php
  /*
   *  db_con() -> db connection handle 
   *              or NULL
   */
  function db_con ()
  {

    $hw = mysqli_connect('mysql1.ugu.pl', /* ip    */
                         'db700311',      /* user  */
                         'bazary2022',    /* paswd */
                         'db700311'       /* db    */
    );

    if (!$hw)
      return NULL;

    return $hw;
  }

  /*
   * missing_get (names) -> true if _GET has all required keys
   *                        false if at least on key is missing
   */
  function missing_get ($names)
  {
    $inj = "";

    for ($i = 0; $i < count($names); $i++)
      if (array_key_exists($names[$i], $_GET) == false)
        return "";
      else
        $inj = $inj . "\$" . $names[$i] . " = " . $_GET[$names[$i]] . ";\n";

    return $inj;
  }
    
?>