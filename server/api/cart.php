<?php
function check_connection($link)
{
  $sql = 'select 1';
  $link->query($sql);
  return 'Successfully connected to MySQL!';
}

function checkIdNumber($productId){
  if ((!is_numeric($productId) || $productId <= 0 || $productId != round($productId))) {
    throw new ApiError('Please input a valid number', 400);
  } else {
    return true;
  }
}

if ((!isset($_SESSION['cartId']))) {
  $link = get_db_link();
  $message = check_connection($link);
  $response['body'] = [];
  send($response);
}

if ($request['method'] === 'GET') {

  if ((isset($_SESSION['cartId']))) {
    $link = get_db_link();
    $message = check_connection($link);
    $sqlSesh = "
    SELECT * FROM `cartItems`
    WHERE `cartId` = {$_SESSION['cartId']}
    ";
    $returnVal = $link->query($sqlSesh);
    $cartItems = $returnVal->fetch_all(MYSQLI_ASSOC);
    $response['body'] = [
      $cartItems
    ];
    send($response);
  }


}

if ($request['method'] === 'POST') {
  if ((isset($request['body']['productId'])) && checkIdNumber($request['body']['productId'])) {
    $link = get_db_link();
    $message = check_connection($link);
    $itemMatch = $request['body']['productId'];
    $sql1 = "
      SELECT  `price`
            FROM `products`
                WHERE `productId`={$itemMatch}
    ";
    $result1 = $link->query($sql1);
    $products = $result1->fetch_all(MYSQLI_ASSOC);
    $getPrice = $products[0];

    if (!$_SESSION['cartId']) {
      $sql2 = "
      INSERT INTO `carts`(`createdAt`)
      VALUES (CURRENT_TIMESTAMP)
    ";
      $result2 = $link->query($sql2);
      $_SESSION['cartId'] = mysqli_insert_id($link);

    }
    $cartId = $_SESSION['cartId'];
    $sql3 = "
      INSERT INTO `cartItems` (`cartId`,`price`,`productId`)
      VALUES ($cartId,{$getPrice['price']},{$itemMatch})
    ";
    $result3 = $link->query($sql3);
    $checkId = mysqli_insert_id($link);
    $sql4 = "
      SELECT cartItems.cartItemId, products.productId,products.name,products.price,products.image,products.shortDescription
      FROM cartItems
      INNER JOIN products ON cartItems.productId=products.productId
      WHERE `cartItemId` = {$checkId}
    ";
    $result4 = $link->query($sql4);
    $fetchReturn = $result4->fetch_all(MYSQLI_ASSOC);
    $joinedCart = $fetchReturn;
    $response['body'] = [
      $joinedCart
    ];
    send($response);
  }

  if ((!isset($request['body']['productId'])) || checkIdNumber($request['body']['productId'])) {
    throw new ApiError('Please input a valid number', 400);
  }
}

?>
