<?php
// ============================================================================
// REGISTER.PHP - User Registration
// Handles new user registration
// ============================================================================

require_once 'config.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (empty($input)) {
    $input = $_POST;
}

// Get and validate inputs
$name = isset($input['name']) ? sanitize($input['name']) : '';
$email = isset($input['email']) ? sanitize($input['email']) : '';
$password = isset($input['password']) ? $input['password'] : '';

$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
} elseif (strlen($name) < 2) {
    $errors[] = 'Name must be at least 2 characters';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!validateEmail($email)) {
    $errors[] = 'Invalid email format';
}

if (empty($password)) {
    $errors[] = 'Password is required';
} elseif (strlen($password) < 6) {
    $errors[] = 'Password must be at least 6 characters';
}

if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => implode(', ', $errors)
    ]);
    exit;
}

// Check if email exists
$check_query = "SELECT id FROM users WHERE email = ?";
$stmt = mysqli_prepare($conn, $check_query);
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

if (mysqli_stmt_num_rows($stmt) > 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Email already registered. Please login or use a different email.'
    ]);
    mysqli_stmt_close($stmt);
    exit;
}
mysqli_stmt_close($stmt);

// Hash password
$password_hash = password_hash($password, PASSWORD_DEFAULT);

// Insert user
$insert_query = "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())";
$stmt = mysqli_prepare($conn, $insert_query);
mysqli_stmt_bind_param($stmt, "sss", $name, $email, $password_hash);

if (mysqli_stmt_execute($stmt)) {
    $user_id = mysqli_insert_id($conn);
    
    // Set session
    $_SESSION['user_id'] = $user_id;
    $_SESSION['user_name'] = $name;
    $_SESSION['user_email'] = $email;
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful! Welcome to Craftopia.',
        'user' => [
            'id' => $user_id,
            'name' => $name,
            'email' => $email
        ]
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Registration failed. Please try again.'
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
