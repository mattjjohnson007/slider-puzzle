(function () {

    $("td").click(tileClick);

    console.log(checkForWin);

    function isEmptySquare($image) {
        var altText = $image.attr("alt")
        if (altText === "empty") {
            return true;
        } else {
            return false;
        }
    }

    function tileClick() {
        var $td, $clickedImg, $emptyImg, tempSrc;

        $td = $(this)

        $clickedImg = $td.children().first();
        if (isEmptySquare($clickedImg)) {
            alert("You've Gotta Be Clickin' On A Tile Next To The Dang Empty Square Pointdexter!!");
        } else {


            $emptyImg = checkForEmpty($td);
            console.log($emptyImg);

            if ($emptyImg === null) {
                alert("C'mon Ya Goober! Go Ahead And Click on an image next to the empty square to move it already!!!");
            } else {
                //swap images
                tempSrc = $clickedImg.attr("src");
                $clickedImg.attr("src", $emptyImg.attr("src"));
                $emptyImg.attr("src", tempSrc);

                temp = $clickedImg.attr("alt");
                $clickedImg.attr("alt", $emptyImg.attr("alt"));
                $emptyImg.attr("alt", tempSrc);

                //check for win
                if (checkForWin()) {
                    $("#puzzleGrid").addClass("win");
                }

            }
        }

        function checkForEmpty($td) {
            var newRow, newCol, idToCheck, $img;

            var id = $td.attr("id");
            var row = id.substring(4, 5);
            var col = id.substring(5, 6);

            console.log("Row " + row);
            console.log("Col " + col);

            // check top
            if (row > 1) {
                newRow = parseInt(row) - 1;
                newCol = col;
                $img = getImageFromCell(newRow, newCol);
                if (isEmptySquare($img)) {
                    return $img
                }
            }

            // check bottom
            if (row < 4) {
                newRow = parseInt(row) + 1;
                newCol = col;
                $img = getImageFromCell(newRow, newCol);
                if (isEmptySquare($img)) {
                    return $img
                }
            }

            // check left
            if (col > 1) {
                newRow = row;
                newCol = parseInt(col) - 1;
                $img = getImageFromCell(newRow, newCol);
                if (isEmptySquare($img)) {
                    return $img

                }
            }

            // check right
            if (col < 4) {
                newRow = row;
                newCol = parseInt(col) + 1;
                $img = getImageFromCell(newRow, newCol);
                if (isEmptySquare($img)) {
                    return $img

                }
            }
            return null;

        }

        function getImageFromCell(row, col) {
            idToCheck = "#cell" + row + col;
            console.log("Id below: " + idToCheck);
            return $(idToCheck).children().first();

        }

        function checkForWin($td) {
            var checker, $allImages, isWin;

            isWin = true;
            checker = 1;
            $allImages = $("img").each(function (index, element) {
                var altText = $(this).attr("alt");
                if (checker === 16) {
                    //should be empty
                    if (altText != "empty") {
                        isWin = false;
                        return false;
                    }
                }
                else {

                    if (altText != checker) {
                        isWin = false;
                        return false;
                    }
                }
                checker = checker + 1;
            });

            return isWin;
        }
    }

}());