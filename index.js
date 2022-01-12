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
                gridBox.addEventListener('mouseover', draw, { once: false })
                mainContainer.appendChild(gridBox);
            }
            document.getElementById('app').appendChild(mainContainer);
        }
        
        // color box on hover
        function draw(e) {
            const color = generateColor(e.target)
            e.target.setAttribute('style', `background-color: ${color}`);
        }
        
        // button to clear current grid
        function resetGrid() {
            let rows, cols;
            while (!(rows > 0 && rows <= 100 && cols > 0 && cols <= 100)) {
                rows = +prompt('Enter the number of rows (1-100)');
                cols = +prompt('Enter the number of columns (1-100)');
            }
            document.getElementById('app').removeChild(document.getElementById('main-container'));
            generateGrid(rows, cols);
        }

        // optional color handling
        function generateColor(ele) {
            const currColor = ele.style.backgroundColor;
            if (!currColor) {
                const randomHue = Math.floor(Math.random() * 361);
                return `hsl(${randomHue}, 100%, 50%)`;
            }
            // const darkenedColor = currColor.replace(/(\d)%\)$/, (_, val) => val > 0 ? val - 5 + '%)' : 0 + '%)');
            const darkenedColor = darkenColor(currColor);
            return darkenedColor;
        }

        function darkenColor(currColor) {
            console.log(currColor);
        }
    }())