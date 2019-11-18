<?php


if ($request['method'] === 'GET') {
  $link = get_db_link();
  $sql = '
      SELECT `productId`,
              `name`,
              `price`,
              `image`,
              `shortDescription`
            FROM `products`
    ';
  $result = $link->query($sql);
  $products = $result->fetch_all(MYSQLI_ASSOC);
  $response['body'] = $products;
  send($response);
}

?>
