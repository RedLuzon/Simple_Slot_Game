    let fruit;

    function rolling() {
    randomNum = Math.round(Math.random() * (3 - 1 + 1) + 1);
    console.log(randomNum);
    if (randomNum == 1) {
        fruit = "🍎";
    } else if (randomNum == 2) {
        fruit = "🍇";
    } else if (randomNum == 3) {
        fruit = "🍊";
    }
    }

    function strike(item) {
    rolling();
    document.getElementById(item).value = fruit;
    }

    function reset() {
    document.getElementById("item1").value = "";
    document.getElementById("item2").value = "";
    document.getElementById("item3").value = "";
    }

    // for spinning box animation
    function strikeWithAnim(itemId, reelId) {
    const reel = document.getElementById(reelId);
    const input = document.getElementById(itemId);

    // for spinning box animation
    reel.classList.add("spinning");
    reel.classList.add("active");
    input.classList.remove("has-value");
    input.value = "...";

    setTimeout(() => {
        // call your original function
        strike(itemId);
        input.classList.add("has-value");
        reel.classList.remove("spinning");

        // Check for win/lose condition (only when all 3 are filled)
        checkResult();
    }, 500);
    }

    function resetWithAnim() {
    const reels = document.querySelectorAll(".reel");
    reels.forEach((reel) => {
        reel.classList.remove("active", "win-glow");
        reel.querySelector("input").classList.remove("has-value");
    });
    reset();
    }

    function checkResult() {
    const val1 = document.getElementById("item1").value;
    const val2 = document.getElementById("item2").value;
    const val3 = document.getElementById("item3").value;

    if (val1 && val2 && val3) {
        if (val1 === val2 && val2 === val3) {
        showJackpot();
        } else {
        showLose();
        }
    }
    }

    // jackpot function
    function showJackpot() {
    // for adding glow reels
    document.querySelectorAll(".reel").forEach((reel) => {
        reel.classList.add("win-glow");
    });

    // for jackpot overlay
    setTimeout(() => {
        document.getElementById("jackpotOverlay").classList.add("active");
        createConfetti();
    }, 600);
    }

    function closeJackpot() {
    document.getElementById("jackpotOverlay").classList.remove("active");
    document.getElementById("confettiContainer").innerHTML = "";
    }

    function createConfetti() {
    const container = document.getElementById("confettiContainer");
    const colors = [
        "#e9c46a",
        "#f4a261",
        "#e76f51",
        "#2a9d8f",
        "#e63946",
        "#ffd700",
    ];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + "s";
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        container.appendChild(confetti);
    }
    }

    // lose function
    function showLose() {
    const slotMachine = document.getElementById("slotMachine");
    const redFlash = document.getElementById("redFlash");

    // screen shake animation
    slotMachine.classList.add("screen-shake");

    // red flash when you lose
    redFlash.classList.add("active");

    setTimeout(() => {
        slotMachine.classList.remove("screen-shake");
        redFlash.classList.remove("active");
        document.getElementById("loseOverlay").classList.add("active");
    }, 500);
    }

    function closeLose() {
    document.getElementById("loseOverlay").classList.remove("active");
    }

    //for navigatin between the home and gamepage
    function showGame() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";
    document.body.style.background =
        "linear-gradient(135deg, #0f0f1e 0%, #1a1a3e 100%)";
    }

    function showHome() {
    document.getElementById("gamePage").style.display = "none";
    document.getElementById("homePage").style.display = "flex";
    document.body.style.background =
        "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";
    }

    // Age Verification
    let isAgeVerified = false;

    function showAgeModal() {
    document.getElementById("ageModal").classList.remove("hidden");
    }

    function confirmAge(isAdult) {
    if (isAdult) {
        isAgeVerified = true;
        document.getElementById("ageModal").classList.add("hidden");
        showGame();
    } else {
        // Under 18 - stay on homepage with message
        alert("You must be 18 or older to play. Redirecting to homepage.");
        document.getElementById("ageModal").classList.add("hidden");
        // Ensure we're on homepage
        document.getElementById("gamePage").style.display = "none";
        document.getElementById("homePage").style.display = "flex";
    }
    }
