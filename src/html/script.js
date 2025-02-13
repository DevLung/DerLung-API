// import "jquery"; // uncomment while developing for intellisense


let copyUriButtonClicked = false;

function copyUriToClipboard(button, uri) {
    navigator.clipboard.writeText(uri);

    if (!copyUriButtonClicked) {
        copyUriButtonClicked = true;
        let initialText = button.innerHTML;
        let initialColor = button.style.backgroundColor
        button.innerHTML = "URI kopiert!";
        button.style.color = "#52b788"
        setTimeout(function () {
            button.innerHTML = initialText;
            button.style.color = initialColor
            copyUriButtonClicked = false;
        }.bind(button), 1500);
    }
}


function search(inputElement, selector, parentSelector=null) {
    let searchTerm = jQuery(inputElement).val().toLowerCase();
    let selection = jQuery(selector);
    let searchForParent = parentSelector != null;

    if (searchForParent) {
        selection.parent(parentSelector).show();
    } else {
        selection.show();
    }
    selection.each(function () {
        if (jQuery(this).text().toLowerCase().indexOf(searchTerm) == -1) {
            if (searchForParent) {
                jQuery(this).parent(parentSelector).hide();
            } else {
                jQuery(this).hide();
            }
        }
    });
}