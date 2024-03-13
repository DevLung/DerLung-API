let copyUriButtonClicked = false;

function copyUriToClipboard(button, uri) {
    navigator.clipboard.writeText(uri);

    if (!copyUriButtonClicked) {
        copyUriButtonClicked = true;
        var initialText = button.innerHTML;
        var initialColor = button.style.backgroundColor
        button.innerHTML = "URI kopiert!";
        button.style.color = "#52b788"
        setTimeout(function () {
            button.innerHTML = initialText;
            button.style.color = initialColor
            copyUriButtonClicked = false;
        }.bind(button), 1500);
    }
}