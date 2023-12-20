const btnViewVideo = document.querySelectorAll("[btn-view-video]");

if(btnViewVideo) {
    const titleVideo = document.querySelector("#titleVideo");
    const playerVideo = document.querySelector("#playerVideo");
    
    btnViewVideo.forEach(item => {
        item.addEventListener("click", function() {
            const dataUrl = item.getAttribute("data-url");
            const dataTitle = item.getAttribute("data-title");
            
            console.log(dataUrl);
            console.log(dataTitle);
            
            titleVideo.innerHTML = dataTitle;
            
            const video = document.createElement('video');
            video.src = dataUrl;
            
            video.autoplay = true;
            video.controls = true;
            video.muted = false;
            video.controlsList = "nodownload";
            
            playerVideo.innerHTML = "";
            
            playerVideo.appendChild(video);
        });
    });
    
    const btnCloseVideo = document.querySelector("[btn-close-video]");

    btnCloseVideo.addEventListener("click", function() {
        playerVideo.innerHTML = "";
    });
}