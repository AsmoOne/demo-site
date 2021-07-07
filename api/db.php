<?php

class DB{
    private $db;
    
    function __construct($host,$user, $pass,$db)
    {
        try{
            $this->db = new PDO("mysql:host=$host;dbname=$db;charset=UTF8", $user, $pass);
            $this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
    }

    function getAllUsers(){
        $result = $this->db->query("SELECT * FROM users",PDO::FETCH_ASSOC);
        if ($result) {
            return json_encode($result->fetchAll());
        }else{
            echo $this->db->errorInfo();
        }
    }
    function getUser($id){
        $statement = $this->db->prepare('SELECT * FROM users WHERE id_user = ?');
        $statement->execute(array($id));
        if ($statement) {
            return json_encode($statement->fetchAll());
        }else{
            echo $this->db->errorInfo();
        }
    }
    function deleteUser($id){
        $statement = $this->db->prepare('DELETE FROM users WHERE id_user = ? LIMIT 1');
        $statement->execute(array($id));
        if ($statement) {
            return json_encode('good');
        }else{
            echo $this->db->errorInfo();
        }
    }
    function createUser($f_name,$l_name,$status,$role){
        $statement = $this->db->prepare('INSERT INTO users (f_name,l_name,status,role) VALUES (?,?,?,?)');
        $statement->execute(array($f_name,$l_name,$status,$role));
        $id = $this->db->lastInsertId();
        if ($statement) {
            return json_encode(array("status"=>"good","goodtype"=>"User created","id"=>$id));
        }else{
            echo $this->db->errorInfo();
        }
    }
    function editUser($id,$f_name,$l_name,$status,$role){
        $statement = $this->db->prepare('UPDATE users SET f_name = ?,l_name = ?,status = ?,role = ? WHERE id_user = ?');
        $statement->execute(array($f_name,$l_name,$status,$role,$id));
        if ($statement) {
            return json_encode(array("status"=>"good","goodtype"=>"User updated"));
        }else{
            echo $this->db->errorInfo();
        }
    }
    function groupActive(array $id){
        $statement = $this->db->prepare('UPDATE users SET status = 1 WHERE id_user = ?');
        foreach($id as $value){
            $statement->execute(array($value));
        }
        if ($statement) {
            return json_encode(array("status"=>"good","goodtype"=>"Users status changed"));
        }else{
            echo $this->db->errorInfo();
        }
    }
    function groupNActive(array $id){
        $statement = $this->db->prepare('UPDATE users SET status = 0 WHERE id_user = ?');
        foreach($id as $value){
            $statement->execute(array($value));
        }
        if ($statement) {
            return json_encode(array("status"=>"good","goodtype"=>"Users status changed"));
        }else{
            echo $this->db->errorInfo();
        }
    }
    function groupDelete(array $id){
        $statement = $this->db->prepare('DELETE FROM users WHERE id_user = ?');
        foreach($id as $value){
            $statement->execute(array($value));
        }
        if ($statement) {
            return json_encode(array("status"=>"good","goodtype"=>"Users deleted"));
        }else{
            echo $this->db->errorInfo();
        }
    }
    
}
$db = new DB('localhost','root','','task3');

if ($_POST['key'] == 'getusers') {
    header('Content-Type: application/json');
    exit($db->getAllUsers());
}
if ($_POST['key'] == 'getrowuser') {
    header('Content-Type: application/json');
    exit($db->getUser($_POST['id']));
}
if ($_POST['key'] == 'deleteuser') {
    header('Content-Type: application/json');
    exit($db->deleteUser($_POST['id']));
}
if ($_POST['key'] == 'updateuser') {
    if (empty($_POST['f_name'])) {//перевірка полей на пустоту
        $json_staus = array("status"=>"error","errtype"=>"Сheck the name","key" =>"edit-name");
        exit(json_encode($json_staus));
    }
    if (empty($_POST['l_name'])) {//перевірка полей на пустоту
        $json_staus = array("status"=>"error","errtype"=>"Сheck the last name","key" =>"edit-surname");
        exit(json_encode($json_staus));
    }
    if (empty($_POST['role'])) {//перевірка полей на пустоту
        $json_staus = array("status"=>"error","errtype"=>"Сheck role","key" =>"edit-role");
        exit(json_encode($json_staus));
    }
    if ($_POST['id'] == '0') {
        exit($db->createUser($_POST['f_name'],$_POST['l_name'],$_POST['status'],$_POST['role']));
    }else{
        exit($db->editUser($_POST['id'],$_POST['f_name'],$_POST['l_name'],$_POST['status'],$_POST['role']));
    }
}
