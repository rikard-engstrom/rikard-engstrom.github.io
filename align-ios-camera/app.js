let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

let constraints = {
    audio: false,
    video: {
        facingMode: "environment",
        width: { ideal: width },
        height: { ideal: height }
    }
};

let video = document.querySelector("#video");
video.addEventListener('resize', alignElements);

let canvas = document.querySelector("#canvas");

function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function selectFrontCamera() {
    constraints.video.facingMode = "user"
    showMedia();
}

function selectBackCamera() {
    constraints.video.facingMode = "environment"
    showMedia();
}

function showMedia() {
    if (hasGetUserMedia()) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                // TODO: Show some error.        
            });
    } else {
        // TODO: Show some error.
    }
}

function alignElements() {
    let videoWidth = video.offsetWidth;
    let videoHeight = video.offsetHeight;
    video.style.left = Math.round((width / 2) - (videoWidth / 2)) + "px";
    video.style.top = Math.round((height / 2) - (videoHeight / 2)) + "px";

    canvas.width = videoWidth;
    canvas.height = videoHeight;
    canvas.style.left = video.style.left;
    canvas.style.top = video.style.top;

    drawAlignmentGrid();
}

function drawAlignmentGrid() {
    let videoWidth = video.offsetWidth;
    let videoHeight = video.offsetHeight;

    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#FFF"

    // verticle center
    ctx.moveTo(videoWidth / 2, 0);
    ctx.lineTo(videoWidth / 2, videoHeight);

    // horizontal center
    ctx.moveTo(0, videoHeight / 2);
    ctx.lineTo(videoWidth, videoHeight / 2);

    // outerbox
    let outerBoxWidth = videoWidth * 0.75;
    let outerBoxHeight = videoHeight * 0.75;
    let outerTop = videoHeight * 0.125;
    let outerLeft = videoWidth * 0.125;
    ctx.rect(outerLeft, outerTop, outerBoxWidth, outerBoxHeight);

    ctx.stroke();
}

let spiritLevelStatus = {
    hasPermision: false,
    enabled: false
};

function toggleSpiritLevel() {
    if (!spiritLevelStatus.hasPermision) {
        DeviceMotionEvent.requestPermission().then(response => {
            if (response == 'granted') {
                spiritLevelStatus.hasPermision = true;
                spiritLevelStatus.enabled = true;
                window.addEventListener('deviceorientation', (e) => {
                    console.log(e);
                })
                showSpiritLevel();
            }
        })
    } else {
        if (spiritLevelStatus.enabled) {
            spiritLevelStatus.enabled = false;
        }
        else {
            spiritLevelStatus.enabled = true;
        }
    }
}

function showSpiritLevel() {
    //if (!spiritLevelStatus.enabled)
}

//showMedia();
alignElements();