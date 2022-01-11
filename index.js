(function() {
    generateResetButton();
    generateGrid();

    function generateResetButton() {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset';
        resetButton.setAttribute('id', 'reset-button');
        resetButton.addEventListener('click', resetGrid);
        document.getElementById('app').appendChild(resetButton);
    }

    // create grid with default resolution 16x16
    function generateGrid(x=16, y=16) {
        const mainContainer = document.createElement('div');
        mainContainer.setAttribute('id', 'main-container');
        mainContainer.setAttribute(
            'style',
            `grid-template-rows: repeat(${x}, 1fr); \
            grid-template-columns: repeat(${y}, 1fr);`
        );
        for (let i = 0; i < x * y; i++) {
            const gridBox = document.createElement('div');
            gridBox.classList.add('grid-box');
            gridBox.addEventListener('mouseover', draw, { once: true })
            mainContainer.appendChild(gridBox);
        }
        document.getElementById('app').appendChild(mainContainer);
    }
    
    // color box on hover
    function draw(e) {
        e.target.classList.add('colored');
    }

    // button to clear current grid
    function resetGrid() {
        document.getElementById('app').removeChild(document.getElementById('main-container'));
        generateGrid();
    }
    // button for user to set new grid resolution --- set max 100x100
    // optional color handling
}())