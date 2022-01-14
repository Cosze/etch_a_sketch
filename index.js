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
            if (e.buttons) {
                const color = generateColor(e.target);
                e.target.setAttribute('style', `background-color: ${color}`);
            }
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
            const rgb = ele.style.backgroundColor;
            if (!rgb) {
                const randomHue = Math.floor(Math.random() * 361);
                return `hsl(${randomHue}, 100%, 50%)`;
            }
            const darkenedColor = darkenColor(rgb);
            return darkenedColor;
        }

        function darkenColor(rgbString) {
            const reForRGB = /(\d+)/g;
            const [r, g, b] = rgbString.match(reForRGB);
            const hsl = RGBtoHSL(r, g, b);
            const reForLightness = /([\d\.]+)%\)$/;
            const darkenHSL = (_, l) => {
                if (+l < 5) return '0%)';
                return +l - 5 + '%)';
            }
            const darkenedHSL = hsl.replace(reForLightness, darkenHSL);
            return darkenedHSL;
        }

        function RGBtoHSL(r, g, b) {
            // source of following calculations: https://css-tricks.com/converting-color-spaces-in-javascript/
            r /= 255;
            g /= 255;
            b /= 255;
            let cmin = Math.min(r, g, b),
                  cmax = Math.max(r, g, b),
                  delta = cmax - cmin,
                  h = 0,
                  s = 0,
                  l = 0;
            if (delta == 0) h = 0;
            else if (cmax == r) h = ((g - b) / delta) % 6;
            else if (cmax == g) h = (b - r) / delta + 2;
            else h = (r - g) / delta + 4;
            h = Math.round(h * 60);
            if (h < 0) h += 360;
            l = (cmax + cmin) / 2;
            s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);
            return `hsl(${h}, ${s}%, ${l}%)`;
        }
    }())