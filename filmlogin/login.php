
<?php
$server = "localhost";
$user = "root";
$pass = "";
$db = "data";

$flag = 0;

$conn = new mysqli($server, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection error: " . $conn->connect_error);
} else {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $username = $_POST['username'];
        $password = $_POST['password'];



        // Check if the username and hashed password combination already exists
        $sql = "SELECT * FROM filmsignup";
        $res = $conn->query($sql);

        if($res->num_rows>0){
            while($row = $res->fetch_assoc()){
                $user = $row['Username'];
                $pass = $row['ConfirmPassword'];

                if($user == $username && $pass == $password){
                    $flag = 1;
                    break;
                } 
            }
        }
        echo $flag;
    }
    $conn->close();
}

?>

