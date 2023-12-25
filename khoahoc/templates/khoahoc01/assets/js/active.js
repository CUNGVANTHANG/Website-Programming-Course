document.addEventListener("DOMContentLoaded", function () {
    var baiTapContent = document.getElementById("bai-tap");
    var khoaHocContent = document.getElementById("noi-dung-khoa-hoc");

    var baiTapButton = document.getElementById("toggle-bai-tap");
    var khoaHocButton = document.getElementById("toggle-noi-dung-khoa-hoc")

    baiTapButton.addEventListener("click", function () {
        khoaHocContent.style.display = "none";
        baiTapContent.style.display = "block";
        khoaHocButton.classList.remove("is-active");
        baiTapButton.classList.add("is-active");
        
    });

    khoaHocButton.addEventListener("click", function () {
        baiTapContent.style.display = "none";
        khoaHocContent.style.display = "block";
        baiTapButton.classList.remove("is-active");
        khoaHocButton.classList.add("is-active");
    });
});
