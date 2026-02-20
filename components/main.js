$(document).ready(function () {

    // Function to update the image size

    function updateImageSize() {
        $("img.lazyimg").each(function () {
            var img = $(this);
            var src = img.attr("src");
            var dataSrc = img.attr("data-src");

            // Only proceed if both src and data-src are defined and contain ";w="
            if (src && dataSrc && src.includes(";w=") && dataSrc.includes(";w=")) {

                var wSrcMatch = src.match(/;w=(\d+)/);
                var wDataSrcMatch = dataSrc.match(/;w=(\d+)/);
                var wMatch = src.match(/;w=(\d+)/);
                var hMatch = src.match(/;h=(\d+)/);

                if (wSrcMatch && wDataSrcMatch && wMatch && hMatch) {
                    var wSrc = parseInt(wSrcMatch[1]);
                    var wDataSrc = parseInt(wDataSrcMatch[1]);
                    var originalW = parseInt(wMatch[1]);
                    var originalH = parseInt(hMatch[1]);
                    var aspectRatio = originalH / originalW;
                    var newW, newH;


                    if (wSrc === wDataSrc) {
                        if (wMatch && hMatch) {
                            var originalW = parseInt(wMatch[1]);
                            var originalH = parseInt(hMatch[1]);
                            var aspectRatio = originalH / originalW;

                            // Get container width and double it
                            var container = img.parent();
                            var containerWidth = container.width();
                            var newW = Math.round(containerWidth * 2);
                            var newH = Math.round(newW * aspectRatio);

                            var newSrc = src.replace(/;w=\d+/, `;w=${newW}`).replace(/;h=\d+/, `;h=${newH}`);

                            img.attr("src", newSrc);
                            img.data("resized", true);
                            img.css("object-fit", "cover");
                        }
                    } else {
                        // Widths don't match
                    }
                }
            }
        });
    }

    function updateAvatarImageSize() {
        $(".avatar-img, .tablist-cards img.card-img").each(function () {
            var img = $(this);
            var src = img.attr("src");

            if (src && src.includes(";w=") && src.includes(";h=")) {
                var wMatch = src.match(/;w=(\d+)/);
                var hMatch = src.match(/;h=(\d+)/);

                if (wMatch && hMatch) {
                    var originalW = parseInt(wMatch[1]);
                    var originalH = parseInt(hMatch[1]);
                    var aspectRatio = originalH / originalW;

                    var container = img.parent();
                    var containerWidth = container.width();
                    var newW = Math.round(containerWidth * 2);
                    var newH = Math.round(newW * aspectRatio);

                    var newSrc = src
                        .replace(/;w=\d+/, `;w=${newW}`)
                        .replace(/;h=\d+/, `;h=${newH}`);

                    img.attr("src", newSrc);
                    img.data("resized", true);
                    img.css("object-fit", "cover");
                }
            }
        });
    }

    setInterval(function() {
        updateImageSize();
        updateAvatarImageSize();
    }, 1000);

    // End of function to update the image size

});
