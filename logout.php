<?php
// ============================================================================
// LOGOUT.PHP - User Logout
// Handles user logout and session destruction
// ============================================================================

require_once 'config.php';

// Clear session
$_SESSION = array();

// Destroy session cookie
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// Destroy session
session_destroy();

// Return success
echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully'
]);

mysqli_close($conn);
?>
