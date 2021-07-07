<?php
require ('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = file_get_contents("php://input");
    $json = json_decode($data,true);
    if ($json['action'] == 'active') {
        exit($db->groupActive($json['ids']));
    }elseif($json['action'] == 'nactive'){
        exit($db->groupNActive($json['ids']));
    }elseif($json['action'] == 'delete'){
        exit($db->groupDelete($json['ids']));
    }else{
        return json_encode(array("status"=>"error","erroetype"=>"Invalid parameter"));
    }
}