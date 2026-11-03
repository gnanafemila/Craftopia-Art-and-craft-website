<?php
// ============================================================================
// LOGIN.PHP - User Login
// Handles user authentication
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
$email = isset($input['email']) ? sanitize($input['email']) : '';
$password = isset($input['password']) ? $input['password'] : '';

$errors = [];

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!validateEmail($email)) {
    $errors[] = 'Invalid email format';
}

if (empty($password)) {
    $errors[] = 'Password is required';
}

if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => implode(', ', $errors)
    ]);
    exit;
}

// Query user
$query = "SELECT id, name, email, password FROM users WHERE email = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) === 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email or password'
    ]);
    mysqli_stmt_close($stmt);
    exit;
}

$user = mysqli_fetch_assoc($result);

// Verify password
if (!password_verify($password, $user['password'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email or password'
    ]);
    mysqli_stmt_close($stmt);
    exit;
}

// Set session
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];
$_SESSION['user_email'] = $user['email'];

// Update last login
$update_query = "UPDATE users SET last_login = NOW() WHERE id = ?";
$update_stmt = mysqli_prepare($conn, $update_query);
mysqli_stmt_bind_param($update_stmt, "i", $user['id']);
mysqli_stmt_execute($update_stmt);
mysqli_stmt_close($update_stmt);

// Return success
echo json_encode([
    'success' => true,
    'message' => 'Login successful! Welcome back, ' . $user['name'] . '.',
    'user' => [
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email']
    ]
]);

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
