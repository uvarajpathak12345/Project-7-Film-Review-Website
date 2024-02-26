<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup Form</title>
    <meta name="google-signin-client_id" content="414763617640-qek2bh04mqt8vp9bufknn1spegkc7nvb.apps.googleusercontent.com">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

        * {
            font-family: 'Poppins', sans-serif;
            scroll-behavior: smooth;
        }

        body {
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        .container {
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 69px;
            border-radius: 8px;
            width: 300px;
            text-align: center;
            transition: transform 0.3s ease-in-out;
        }

        .container:hover {
            transform: scale(1.05);
        }

        input {
            width: 100%;
            padding: 14px;
            margin: 8px 0;
            box-sizing: border-box;
            transition: border-color 0.3s ease-in-out;
            border: none;
            border-radius: 13px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        }

        input:focus {
            border-color: #4caf50;
        }

        button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
        }

        button:hover {
            background-color: #45a049;
        }

        .google-btn {
            background-color: #4285F4;
            color: #fff;
            transition: background-color 0.3s ease-in-out;
        }

        .google-btn:hover {
            background-color: #357ae8;
        }

        .confirm-password {
            margin-top: 10px;
        }

        p {
            margin: 10px 0;
        }

        a {
            color: #357ae8;
            text-decoration: none;
        }
    </style>
</head>
<body>
    
    <div class="container">


        <h2>Sign Up</h2>
        <form id="signupForm" action="signup.php" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <label for="confirm-password" class="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" required>

            <button type="submit">Sign Up</button>
        </form>

        

        <div></div>
            <p>Already have an account? <a href="login.php">Login</a></p>
        </div>
    </div>
</body>
</html>


<?php
$server = "localhost";
$user = "root";
$pass = "";
$db = "data";

$conn = new mysqli($server, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection error: " . $conn->connect_error);
} else {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $confirmPassword = $_POST['confirm-password'];

        // Check if the username and hashed password combination already exists
        $res = "SELECT * FROM filmsignup WHERE Username='$username' AND ConfirmPassword='$confirmPassword'";
        $check = $conn->query($res);

        if ($check->num_rows > 0) {
            // Display an alert if the username and password combination exists
            echo "<script type='text/javascript'>";
            echo "alert('Username and password combination already exists. Please choose another.');";
            echo "window.location.href = 'file:///C:/xampp/htdocs/film%20login/signup.html';";
            echo "</script>";
        } else {
            // Proceed with inserting the new record if the combination doesn't exist
            if ($password == $confirmPassword) {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                $sql = "INSERT INTO filmsignup (Username, Email, Passwords, ConfirmPassword, DateAdded) VALUES ('$username', '$email', '$hashedPassword', '$confirmPassword', CURRENT_TIMESTAMP)";

                if ($conn->query($sql) == true) {
                    echo "<script type='text/javascript'>";
                    echo "alert('Account Created Successfully!');";
                    echo "window.location.href = 'login.html';";
                    echo "</script>";
                } else {
                    echo "<script type='text/javascript'>";
                    echo "alert('Error: " . $conn->error . "');";
                    echo "</script>";
                }
            } else {
                echo "<script type='text/javascript'>";
                echo "alert('Passwords do not match');";
                echo "window.location.href = 'signup.php';";
                echo "</script>";
            }
        }
    }
    $conn->close();
}
?>
