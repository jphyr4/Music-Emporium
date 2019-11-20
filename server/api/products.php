<?php

if ($request['method'] === 'GET') {
if (isset($_GET['productId'])) {
  $link = get_db_link();
  $id = $request['query']['productId'];

  $sql = "
      SELECT `productId`,
              `name`,
              `price`,
              `image`,
              `shortDescription`
            FROM `products` WHERE `productId`= {$id}";
  $result = $link->query($sql);
  $products = $result->fetch_all(MYSQLI_ASSOC);
  $product = $products[0];

  if(!is_numeric($id) || $id <= 0 || $id != round($id) ){
throw new ApiError('not a valid Id or does not exist.', 400);
  }

if(empty($products)){
        throw new ApiError('No matching product', 404);
        }

  $response['body'] = $product;
  send($response);
      }
}

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
