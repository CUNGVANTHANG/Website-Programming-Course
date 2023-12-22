var isAuthenticated = false; // Giả sử ban đầu chưa đăng nhập
var userElement = document.getElementById("user");
var guestElement = document.getElementById("guest");
var logoutElement = document.getElementById("logout");

// Hàm kiểm tra và cập nhật trạng thái hiển thị của phần tử
function updateDisplay() {
  if (isAuthenticated || sessionStorage.getItem("isAuthenticated")) {
    // Nếu đã đăng nhập hoặc có trạng thái đăng nhập từ sessionStorage, hiển thị phần tử
    userElement.style.display = "block";
    guestElement.style.display = "none";

  } else {
    // Nếu chưa đăng nhập, ẩn phần tử
    userElement.style.display = "none";
    guestElement.style.display = "block";
  }
}

// Hàm xử lý khi đăng nhập thành công
function loginSuccess() {
  isAuthenticated = true;
  sessionStorage.setItem("isAuthenticated", true); // Lưu trạng thái đăng nhập vào sessionStorage
  updateDisplay();
  window.location.href = "./trang-chu.html"; // Chuyển hướng đến trang index.html
}

// Hàm xử lý khi logout
function logout() {
  isAuthenticated = false;
  sessionStorage.removeItem("isAuthenticated"); // Xóa trạng thái đăng nhập khỏi sessionStorage
  updateDisplay();
  // Có thể chuyển hướng về trang đăng nhập hoặc trang chủ tùy thuộc vào yêu cầu của bạn
  window.location.href = "./trang-chu.html"; 
}

// Gọi hàm khi trang được tải
document.addEventListener("DOMContentLoaded", function () {
  updateDisplay();

  var loginButton = document.getElementById("login");
  loginButton.addEventListener("click", performLogin);

  var logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", logout); // Đăng ký sự kiện cho nút logout

  function performLogin() {
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");

    var usernameValue = usernameInput.value;
    var passwordValue = passwordInput.value;

    if (usernameValue === "admin" && passwordValue === "admin") {
      // Gọi hàm loginSuccess khi đăng nhập thành công
      loginSuccess();
    } else {
      alert("Đăng nhập không thành công. Vui lòng kiểm tra tên người dùng và mật khẩu.");
    }
  }
});

