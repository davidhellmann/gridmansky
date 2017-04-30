// Create vertical guide function
function dhCreateGrid(context) {
    dhGridmansky(context, "createGuides")
}


// Main function
function dhGridmansky(context, dhAction) {
    var dhDoc = context.document,
        dhSelection = context.selection,
        dhLayer = dhSelection.firstObject(),
        dhLayerWidth = dhLayer.frame().width(),
        dhLayerXMin = dhLayer.frame().x(),
        dhLayerXMax = Math.round(dhLayerXMin + dhLayerWidth),
        dhTarget = [[dhDoc currentPage] currentArtboard] || [dhDoc currentPage];


    // Check if a shape is selected
    if (dhSelection.length == 1) {
        if (dhLayer.className() == "MSShapeGroup") {
            dhCreateGrid();
        } else {
            dhDoc.showMessage("🤔 No Shape selected!");
        }

    }


    // Create guides
    function dhCreateGrid() {
        var dhCols = Number(dhDoc.askForUserInput_initialValue("How many cols?", "12"));
        var dhGutterWidth = Number(dhDoc.askForUserInput_initialValue("How much gutter width", "32"));
        var dhNewLayerWidth = Math.round(dhLayerWidth - dhGutterWidth);
        var dhColWidth = Math.round(dhNewLayerWidth / dhCols)


            // Set outer guides
            [[dhTarget horizontalRulerData]
        addGuideWithValue: dhLayerXMin
    ]
        [[dhTarget horizontalRulerData] addGuideWithValue
    :
        dhLayerXMax
    ]


        // Set half gutter guides
        [[dhTarget horizontalRulerData] addGuideWithValue
    :
        Math.round(dhLayerXMin + (dhGutterWidth / 2))
    ]
        [[dhTarget horizontalRulerData] addGuideWithValue
    :
        Math.round(dhLayerXMax - (dhGutterWidth / 2))
    ]


        // Set gutter guides
        [[dhTarget horizontalRulerData] addGuideWithValue
    :
        Math.round(dhLayerXMin + dhGutterWidth)
    ]
        [[dhTarget horizontalRulerData] addGuideWithValue
    :
        Math.round(dhLayerXMax - dhGutterWidth)
    ]


        // Set Col Guides
        if (dhCols > 1) {
            for (var i = 1; i < dhCols; i++) {


                // Set col guide
                [[dhTarget horizontalRulerData] addGuideWithValue
            :
                Math.round(dhLayerXMin + (dhGutterWidth / 2) + (dhColWidth * i))
            ]


                // Set left gutter guide
                [[dhTarget horizontalRulerData] addGuideWithValue
            :
                Math.round((dhLayerXMin + (dhGutterWidth / 2) + (dhColWidth * i)) - (dhGutterWidth / 2))
            ]


                // Set right gutter guide
                [[dhTarget horizontalRulerData] addGuideWithValue
            :
                Math.round((dhLayerXMin + (dhGutterWidth / 2) + (dhColWidth * i)) + (dhGutterWidth / 2))
            ]
            }
        }


        dhDoc.showMessage("😎 Grid is created!");
    }
}
