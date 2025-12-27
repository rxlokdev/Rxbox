class RxBoxGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridWidth = 120;
        this.gridHeight = 80;
        this.cellSize = 8;
        this.grid = [];
        this.selectedMaterial = 'sand';
        this.isPaused = false;
        this.isMouseDown = false;
        this.isRightClick = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.particleCount = 0;
        this.frameCount = 0;
        this.lastFpsUpdate = 0;
        this.fps = 30;
        
        this.materials = {
            air: { color: '#000000', density: 0, solid: false, liquid: false, gas: false },
            sand: { color: '#C4A57B', density: 3, solid: false, liquid: false, gas: false },
            dirt: { color: '#8B4513', density: 2, solid: true, liquid: false, gas: false },
            mud: { color: '#654321', density: 2, solid: false, liquid: false, gas: false },
            wetsand: { color: '#A0826D', density: 3, solid: false, liquid: false, gas: false },
            stone: { color: '#808080', density: 5, solid: true, liquid: false, gas: false },
            rockwall: { color: '#696969', density: 5, solid: true, liquid: false, gas: false },
            mudstone: { color: '#705248', density: 4, solid: true, liquid: false, gas: false },
            packedsand: { color: '#D2B48C', density: 4, solid: true, liquid: false, gas: false },
            snow: { color: '#FFFFFF', density: 1, solid: false, liquid: false, gas: false },
            gravel: { color: '#8B7D6B', density: 3, solid: false, liquid: false, gas: false },
            clay: { color: '#B87333', density: 3, solid: true, liquid: false, gas: false },
            claysoil: { color: '#A0522D', density: 2, solid: true, liquid: false, gas: false },
            permafrost: { color: '#E0FFFF', density: 2, solid: true, liquid: false, gas: false },
            mycelium: { color: '#8B4513', density: 1, solid: true, liquid: false, gas: false },
            mulch: { color: '#654321', density: 1, solid: false, liquid: false, gas: false },
            basalt: { color: '#2F4F4F', density: 6, solid: true, liquid: false, gas: false },
            tuff: { color: '#8B7355', density: 4, solid: true, liquid: false, gas: false },
            limestone: { color: '#F5F5DC', density: 3, solid: true, liquid: false, gas: false },
            water: { color: '#4169E1', density: 1, solid: false, liquid: true, gas: false },
            lava: { color: '#FF6347', density: 4, solid: false, liquid: true, gas: false },
            oil: { color: '#2F2F2F', density: 2, solid: false, liquid: true, gas: false },
            acid: { color: '#00FF00', density: 1, solid: false, liquid: true, gas: false },
            mercury: { color: '#C0C0C0', density: 10, solid: false, liquid: true, gas: false },
            salt: { color: '#F0F8FF', density: 2, solid: false, liquid: false, gas: false },
            sugar: { color: '#FFFACD', density: 1, solid: false, liquid: false, gas: false },
            gunpowder: { color: '#2F2F2F', density: 2, solid: false, liquid: false, gas: false },
            ash: { color: '#696969', density: 1, solid: false, liquid: false, gas: false },
            fire: { color: '#FF4500', density: -1, solid: false, liquid: false, gas: true },
            plasma: { color: '#FF00FF', density: -2, solid: false, liquid: false, gas: true },
            lightning: { color: '#FFFF00', density: -3, solid: false, liquid: false, gas: true },
            electricity: { color: '#00FFFF', density: -2, solid: false, liquid: false, gas: true },
            steam: { color: '#FFFFFF', density: -1, solid: false, liquid: false, gas: true },
            smoke: { color: '#696969', density: -1, solid: false, liquid: false, gas: true },
            gas: { color: '#808080', density: -2, solid: false, liquid: false, gas: true },
            blood: { color: '#8B0000', density: 2, solid: false, liquid: true, gas: false },
            milk: { color: '#FFFFFF', density: 1, solid: false, liquid: true, gas: false },
            honey: { color: '#FFB90F', density: 3, solid: false, liquid: true, gas: false },
            syrup: { color: '#D2691E', density: 3, solid: false, liquid: true, gas: false },
            alcohol: { color: '#E6E6FA', density: 1, solid: false, liquid: true, gas: false },
            nitrogen: { color: '#E0FFFF', density: 0, solid: false, liquid: true, gas: false },
            hydrogen: { color: '#F0F8FF', density: -1, solid: false, liquid: true, gas: false },
            oxygen: { color: '#B0E0E6', density: 0, solid: false, liquid: true, gas: false },
            helium: { color: '#F5FFFA', density: -2, solid: false, liquid: true, gas: false },
            neon: { color: '#FFC0CB', density: 0, solid: false, liquid: true, gas: false },
            flour: { color: '#F5DEB3', density: 1, solid: false, liquid: false, gas: false },
            cement: { color: '#696969', density: 4, solid: false, liquid: false, gas: false },
            dust: { color: '#D3D3D3', density: 0, solid: false, liquid: false, gas: false },
            pollen: { color: '#FFFFE0', density: 0, solid: false, liquid: false, gas: false },
            spores: { color: '#8FBC8F', density: 0, solid: false, liquid: false, gas: false },
            powder: { color: '#F5F5F5', density: 1, solid: false, liquid: false, gas: false },
            pepper: { color: '#2F4F2F', density: 1, solid: false, liquid: false, gas: false },
            cocoa: { color: '#8B4513', density: 1, solid: false, liquid: false, gas: false },
            coffee: { color: '#6F4E37', density: 1, solid: false, liquid: false, gas: false },
            tea: { color: '#556B2F', density: 1, solid: false, liquid: false, gas: false },
            oxygen_gas: { color: '#87CEEB', density: -3, solid: false, liquid: false, gas: true },
            nitrogen_gas: { color: '#F0F8FF', density: -3, solid: false, liquid: false, gas: true },
            hydrogen_gas: { color: '#FFFFFF', density: -4, solid: false, liquid: false, gas: true },
            helium_gas: { color: '#FFE4E1', density: -5, solid: false, liquid: false, gas: true },
            neon_gas: { color: '#FF69B4', density: -3, solid: false, liquid: false, gas: true },
            argon: { color: '#E6E6FA', density: -3, solid: false, liquid: false, gas: true },
            co2: { color: '#F5F5DC', density: -2, solid: false, liquid: false, gas: true },
            methane: { color: '#D3D3D3', density: -2, solid: false, liquid: false, gas: true },
            bullet: { color: '#C0C0C0', density: 10, solid: true, liquid: false, gas: false },
            laser: { color: '#FF0000', density: 0, solid: false, liquid: false, gas: true },
            missile: { color: '#696969', density: 8, solid: true, liquid: false, gas: false },
            bomb: { color: '#2F2F2F', density: 7, solid: true, liquid: false, gas: false },
            grenade: { color: '#808080', density: 6, solid: true, liquid: false, gas: false },
            rocket: { color: '#FF4500', density: 5, solid: true, liquid: false, gas: false },
            arrow: { color: '#8B4513', density: 3, solid: true, liquid: false, gas: false },
            shuriken: { color: '#C0C0C0', density: 4, solid: true, liquid: false, gas: false },
            dart: { color: '#000000', density: 3, solid: true, liquid: false, gas: false },
            hammer: { color: '#8B4513', density: 6, solid: true, liquid: false, gas: false },
            wrench: { color: '#696969', density: 5, solid: true, liquid: false, gas: false },
            screwdriver: { color: '#C0C0C0', density: 4, solid: true, liquid: false, gas: false },
            drill: { color: '#2F2F2F', density: 6, solid: true, liquid: false, gas: false },
            saw: { color: '#8B4513', density: 5, solid: true, liquid: false, gas: false },
            axe: { color: '#654321', density: 5, solid: true, liquid: false, gas: false },
            pickaxe: { color: '#696969', density: 7, solid: true, liquid: false, gas: false },
            shovel: { color: '#8B4513', density: 4, solid: true, liquid: false, gas: false },
            pliers: { color: '#C0C0C0', density: 3, solid: true, liquid: false, gas: false },
            welder: { color: '#FF4500', density: 4, solid: true, liquid: false, gas: false },
            torch: { color: '#FFA500', density: 2, solid: false, liquid: false, gas: true },
            paintbrush: { color: '#8B4513', density: 2, solid: true, liquid: false, gas: false },
            spray: { color: '#87CEEB', density: 0, solid: false, liquid: true, gas: false },
            glue: { color: '#FFD700', density: 2, solid: false, liquid: true, gas: false },
            tape: { color: '#F5F5DC', density: 1, solid: true, liquid: false, gas: false },
            raw_chicken: { color: '#FFB6C1', density: 2, solid: false, liquid: false, gas: false },
            cooked_chicken: { color: '#CD853F', density: 2, solid: false, liquid: false, gas: false },
            beef: { color: '#8B4513', density: 3, solid: false, liquid: false, gas: false },
            pork: { color: '#FFA07A', density: 2, solid: false, liquid: false, gas: false },
            fish: { color: '#708090', density: 2, solid: false, liquid: false, gas: false },
            bread: { color: '#F4A460', density: 1, solid: true, liquid: false, gas: false },
            cheese: { color: '#FFD700', density: 2, solid: false, liquid: false, gas: false },
            egg: { color: '#FFFACD', density: 1, solid: false, liquid: false, gas: false },
            bacon: { color: '#8B4513', density: 1, solid: false, liquid: false, gas: false },
            pizza: { color: '#FF6347', density: 2, solid: false, liquid: false, gas: false },
            burger: { color: '#8B4513', density: 3, solid: false, liquid: false, gas: false },
            pasta: { color: '#F5DEB3', density: 1, solid: false, liquid: false, gas: false },
            rice: { color: '#FFF8DC', density: 1, solid: false, liquid: false, gas: false },
            potato: { color: '#D2B48C', density: 2, solid: false, liquid: false, gas: false },
            carrot: { color: '#FF8C00', density: 1, solid: false, liquid: false, gas: false },
            apple: { color: '#FF0000', density: 1, solid: false, liquid: false, gas: false },
            banana: { color: '#FFFF00', density: 1, solid: false, liquid: false, gas: false },
            orange: { color: '#FFA500', density: 1, solid: false, liquid: false, gas: false },
            grape: { color: '#800080', density: 1, solid: false, liquid: false, gas: false },
            strawberry: { color: '#FF1493', density: 1, solid: false, liquid: false, gas: false },
            grass: { color: '#228B22', density: 1, solid: true, liquid: false, gas: false },
            tree: { color: '#8B4513', density: 5, solid: true, liquid: false, gas: false },
            flower: { color: '#FF69B4', density: 1, solid: true, liquid: false, gas: false },
            bush: { color: '#556B2F', density: 2, solid: true, liquid: false, gas: false },
            vine: { color: '#228B22', density: 1, solid: false, liquid: false, gas: false },
            moss: { color: '#8FBC8F', density: 0, solid: false, liquid: false, gas: false },
            fern: { color: '#2E8B57', density: 1, solid: false, liquid: false, gas: false },
            cactus: { color: '#228B22', density: 3, solid: true, liquid: false, gas: false },
            bamboo: { color: '#8FBC8F', density: 2, solid: true, liquid: false, gas: false },
            seaweed: { color: '#2E8B57', density: 0, solid: false, liquid: false, gas: false },
            coral: { color: '#FF7F50', density: 3, solid: true, liquid: false, gas: false },
            mushroom: { color: '#8B4513', density: 1, solid: false, liquid: false, gas: false },
            wheat: { color: '#F0E68C', density: 1, solid: false, liquid: false, gas: false },
            corn: { color: '#FFD700', density: 1, solid: false, liquid: false, gas: false },
            pumpkin: { color: '#FF8C00', density: 2, solid: false, liquid: false, gas: false },
            tomato: { color: '#FF6347', density: 1, solid: false, liquid: false, gas: false },
            lettuce: { color: '#90EE90', density: 0, solid: false, liquid: false, gas: false },
            onion: { color: '#FFA500', density: 1, solid: false, liquid: false, gas: false },
            garlic: { color: '#F0E68C', density: 1, solid: false, liquid: false, gas: false },
            wire: { color: '#C0C0C0', density: 4, solid: true, liquid: false, gas: false },
            circuit: { color: '#00FF00', density: 2, solid: true, liquid: false, gas: false },
            chip: { color: '#000000', density: 3, solid: true, liquid: false, gas: false },
            battery: { color: '#FFD700', density: 4, solid: true, liquid: false, gas: false },
            screen: { color: '#0000FF', density: 2, solid: true, liquid: false, gas: false },
            keyboard: { color: '#696969', density: 3, solid: true, liquid: false, gas: false },
            mouse: { color: '#000000', density: 2, solid: true, liquid: false, gas: false },
            speaker: { color: '#000000', density: 3, solid: true, liquid: false, gas: false },
            microphone: { color: '#C0C0C0', density: 2, solid: true, liquid: false, gas: false },
            camera: { color: '#000000', density: 3, solid: true, liquid: false, gas: false },
            phone: { color: '#000000', density: 2, solid: true, liquid: false, gas: false },
            tablet: { color: '#696969', density: 2, solid: true, liquid: false, gas: false },
            laptop: { color: '#000000', density: 4, solid: true, liquid: false, gas: false },
            router: { color: '#0000FF', density: 2, solid: true, liquid: false, gas: false },
            modem: { color: '#FF0000', density: 2, solid: true, liquid: false, gas: false },
            server: { color: '#696969', density: 8, solid: true, liquid: false, gas: false },
            robot: { color: '#C0C0C0', density: 6, solid: true, liquid: false, gas: false },
            drone: { color: '#000000', density: 2, solid: true, liquid: false, gas: false },
            sensor: { color: '#00FF00', density: 1, solid: true, liquid: false, gas: false },
            glass: { color: '#87CEEB', density: 3, solid: true, liquid: false, gas: false },
            mirror: { color: '#C0C0C0', density: 3, solid: true, liquid: false, gas: false },
            lamp: { color: '#FFD700', density: 2, solid: true, liquid: false, gas: false },
            painting: { color: '#8B4513', density: 2, solid: true, liquid: false, gas: false },
            sculpture: { color: '#D3D3D3', density: 4, solid: true, liquid: false, gas: false },
            vase: { color: '#87CEEB', density: 3, solid: true, liquid: false, gas: false },
            rug: { color: '#8B4513', density: 1, solid: false, liquid: false, gas: false },
            curtain: { color: '#FF69B4', density: 1, solid: false, liquid: false, gas: false },
            pillow: { color: '#FFB6C1', density: 1, solid: false, liquid: false, gas: false },
            clock: { color: '#8B4513', density: 3, solid: true, liquid: false, gas: false },
            frame: { color: '#8B4513', density: 2, solid: true, liquid: false, gas: false },
            candle: { color: '#FFD700', density: 1, solid: false, liquid: false, gas: true },
            chandelier: { color: '#FFD700', density: 5, solid: true, liquid: false, gas: false },
            fountain: { color: '#4169E1', density: 0, solid: false, liquid: true, gas: false },
            statue: { color: '#D3D3D3', density: 6, solid: true, liquid: false, gas: false },
            monument: { color: '#696969', density: 8, solid: true, liquid: false, gas: false },
            sign: { color: '#8B4513', density: 2, solid: true, liquid: false, gas: false },
            banner: { color: '#FF0000', density: 0, solid: false, liquid: false, gas: false },
            flag: { color: '#FF0000', density: 0, solid: false, liquid: false, gas: false },
            bone: { color: '#F5F5DC', density: 3, solid: true, liquid: false, gas: false },
            meat: { color: '#8B4513', density: 3, solid: false, liquid: false, gas: false },
            fat: { color: '#FFFFE0', density: 1, solid: false, liquid: false, gas: false },
            skin: { color: '#FDBCB4', density: 1, solid: false, liquid: false, gas: false },
            hair: { color: '#000000', density: 0, solid: false, liquid: false, gas: false },
            feather: { color: '#FFFFFF', density: 0, solid: false, liquid: false, gas: false },
            scale: { color: '#708090', density: 2, solid: true, liquid: false, gas: false },
            shell: { color: '#FFA500', density: 3, solid: true, liquid: false, gas: false },
            horn: { color: '#F5DEB3', density: 4, solid: true, liquid: false, gas: false },
            tusk: { color: '#FFFFF0', density: 5, solid: true, liquid: false, gas: false },
            claw: { color: '#2F2F2F', density: 3, solid: true, liquid: false, gas: false },
            tooth: { color: '#FFFFF0', density: 3, solid: true, liquid: false, gas: false },
            fur: { color: '#8B4513', density: 0, solid: false, liquid: false, gas: false },
            leather: { color: '#8B4513', density: 2, solid: false, liquid: false, gas: false },
            silk: { color: '#FFFACD', density: 0, solid: false, liquid: false, gas: false },
            wool: { color: '#F5F5DC', density: 0, solid: false, liquid: false, gas: false },
            cotton: { color: '#FFFFFF', density: 0, solid: false, liquid: false, gas: false },
            linen: { color: '#F5F5DC', density: 0, solid: false, liquid: false, gas: false },
            hemp: { color: '#8B7355', density: 1, solid: false, liquid: false, gas: false }
        };
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.initGrid();
        this.setupEventListeners();
        this.gameLoop();
    }
    
    setupCanvas() {
        this.canvas.width = this.gridWidth * this.cellSize;
        this.canvas.height = this.gridHeight * this.cellSize;
    }
    
    initGrid() {
        this.grid = [];
        for (let y = 0; y < this.gridHeight; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.gridWidth; x++) {
                this.grid[y][x] = 'air';
            }
        }
    }
    
    setupEventListeners() {
        // Material selection
        document.querySelectorAll('.material-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.material-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedMaterial = btn.dataset.material;
            });
        });
        
        // Category selection
        document.querySelectorAll('.category').forEach(cat => {
            cat.addEventListener('click', (e) => {
                document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
                cat.classList.add('active');
                
                // Hide all material categories
                document.querySelectorAll('.material-category').forEach(mc => {
                    mc.style.display = 'none';
                });
                
                // Show selected category
                const categoryName = cat.dataset.category + '-materials';
                const selectedCategory = document.getElementById(categoryName);
                if (selectedCategory) {
                    selectedCategory.style.display = 'flex';
                }
            });
        });
        
        // Control buttons
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.initGrid();
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.isPaused = !this.isPaused;
            document.getElementById('pauseBtn').style.display = this.isPaused ? 'none' : 'inline-block';
            document.getElementById('playBtn').style.display = this.isPaused ? 'inline-block' : 'none';
        });
        
        document.getElementById('playBtn').addEventListener('click', () => {
            this.isPaused = false;
            document.getElementById('pauseBtn').style.display = 'inline-block';
            document.getElementById('playBtn').style.display = 'none';
        });
        
        // Canvas mouse events
        this.canvas.addEventListener('mousedown', (e) => {
            this.isMouseDown = true;
            this.isRightClick = e.button === 2;
            e.preventDefault();
        });
        
        this.canvas.addEventListener('mouseup', () => {
            this.isMouseDown = false;
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = Math.floor((e.clientX - rect.left) / this.cellSize);
            this.mouseY = Math.floor((e.clientY - rect.top) / this.cellSize);
            
            if (this.isMouseDown) {
                this.handleMouseAction(e);
            }
        });
        
        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            this.isMouseDown = true;
            this.isRightClick = false;
            e.preventDefault();
        });
        
        this.canvas.addEventListener('touchend', () => {
            this.isMouseDown = false;
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            if (this.isMouseDown) {
                const touch = e.touches[0];
                const rect = this.canvas.getBoundingClientRect();
                this.mouseX = Math.floor((touch.clientX - rect.left) / this.cellSize);
                this.mouseY = Math.floor((touch.clientY - rect.top) / this.cellSize);
                
                const mouseEvent = {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                };
                this.handleMouseAction(mouseEvent);
            }
            e.preventDefault();
        });
    }
    
    handleMouseAction(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.cellSize);
        const y = Math.floor((e.clientY - rect.top) / this.cellSize);
        
        if (x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight) {
            if (this.isRightClick) {
                this.grid[y][x] = 'air';
            } else {
                this.grid[y][x] = this.selectedMaterial;
            }
        }
    }
    
    updatePhysics() {
        if (this.isPaused) return;
        
        // Create a copy of the grid for simultaneous updates
        const newGrid = this.grid.map(row => [...row]);
        
        // Process from bottom to top for better physics
        for (let y = this.gridHeight - 1; y >= 0; y--) {
            for (let x = 0; x < this.gridWidth; x++) {
                const material = this.grid[y][x];
                const matProps = this.materials[material];
                
                if (material === 'air') continue;
                
                // Handle different material behaviors
                if (matProps.liquid) {
                    this.updateLiquid(x, y, material, newGrid);
                } else if (!matProps.solid && !matProps.gas) {
                    this.updatePowder(x, y, material, newGrid);
                } else if (matProps.gas) {
                    this.updateGas(x, y, material, newGrid);
                }
            }
        }
        
        this.grid = newGrid;
    }
    
    updateLiquid(x, y, material, newGrid) {
        const matProps = this.materials[material];
        
        // Try to move down
        if (y < this.gridHeight - 1) {
            const below = this.grid[y + 1][x];
            const belowProps = this.materials[below];
            
            if (below === 'air' || (belowProps.liquid && matProps.density > belowProps.density)) {
                newGrid[y + 1][x] = material;
                newGrid[y][x] = below;
                return;
            }
        }
        
        // Try to move sideways (liquid spreads)
        const directions = [-1, 1];
        const shuffledDirs = directions.sort(() => Math.random() - 0.5);
        
        for (let dir of shuffledDirs) {
            const newX = x + dir;
            if (newX >= 0 && newX < this.gridWidth) {
                const neighbor = this.grid[y][newX];
                const neighborProps = this.materials[neighbor];
                
                if (neighbor === 'air' || (neighborProps.liquid && matProps.density > neighborProps.density)) {
                    newGrid[y][newX] = material;
                    newGrid[y][x] = neighbor;
                    return;
                }
            }
        }
    }
    
    updatePowder(x, y, material, newGrid) {
        const matProps = this.materials[material];
        
        // Try to move down
        if (y < this.gridHeight - 1) {
            const below = this.grid[y + 1][x];
            const belowProps = this.materials[below];
            
            if (below === 'air' || (belowProps.liquid && matProps.density > belowProps.density)) {
                newGrid[y + 1][x] = material;
                newGrid[y][x] = below;
                return;
            }
        }
        
        // Try to move diagonally down (powder slides)
        const directions = [-1, 1];
        const shuffledDirs = directions.sort(() => Math.random() - 0.5);
        
        for (let dir of shuffledDirs) {
            const newX = x + dir;
            const newY = y + 1;
            
            if (newX >= 0 && newX < this.gridWidth && newY < this.gridHeight) {
                const target = this.grid[newY][newX];
                const targetProps = this.materials[target];
                
                if (target === 'air' || (targetProps.liquid && matProps.density > targetProps.density)) {
                    newGrid[newY][newX] = material;
                    newGrid[y][x] = target;
                    return;
                }
            }
        }
    }
    
    updateGas(x, y, material, newGrid) {
        // Fire rises and spreads
        if (material === 'fire') {
            // Fire has a chance to burn out
            if (Math.random() < 0.05) {
                newGrid[y][x] = 'air';
                return;
            }
            
            // Try to move up
            if (y > 0) {
                const above = this.grid[y - 1][x];
                if (above === 'air') {
                    newGrid[y - 1][x] = material;
                    newGrid[y][x] = 'air';
                    return;
                }
            }
            
            // Spread horizontally
            const directions = [-1, 1];
            const shuffledDirs = directions.sort(() => Math.random() - 0.5);
            
            for (let dir of shuffledDirs) {
                const newX = x + dir;
                if (newX >= 0 && newX < this.gridWidth) {
                    const neighbor = this.grid[y][newX];
                    if (neighbor === 'air') {
                        newGrid[y][newX] = material;
                        newGrid[y][x] = 'air';
                        return;
                    }
                }
            }
        }
    }
    
    render() {
        // Clear canvas with gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#000000');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Count particles
        this.particleCount = 0;
        
        // Draw grid with ultra-enhanced textures
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const material = this.grid[y][x];
                if (material !== 'air') {
                    this.particleCount++;
                    const matProps = this.materials[material];
                    let color = matProps.color;
                    const pixelX = x * this.cellSize;
                    const pixelY = y * this.cellSize;
                    
                    // Ultra-enhanced texture system
                    this.renderAdvancedTexture(material, color, pixelX, pixelY, x, y);
                }
            }
        }
        
        // Add post-processing effects
        this.addPostProcessingEffects();
        
        // Update info bar
        this.updateInfoBar();
    }
    
    renderAdvancedTexture(material, baseColor, x, y, gridX, gridY) {
        const time = Date.now() * 0.001;
        const noise = this.simplexNoise(gridX * 0.1, gridY * 0.1, time);
        
        // Fire - Ultra realistic with multiple layers
        if (material === 'fire') {
            const intensity = 0.5 + Math.sin(time * 10 + gridX * 0.5) * 0.3;
            const hue = 20 + Math.sin(time * 5 + gridY * 0.3) * 40;
            this.ctx.fillStyle = `hsl(${hue}, 100%, ${50 + intensity * 30}%)`;
            
            // Fire core
            this.ctx.globalAlpha = 0.9 + intensity * 0.1;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            
            // Fire glow
            this.ctx.globalAlpha = 0.3 + intensity * 0.2;
            this.ctx.fillStyle = '#FFFF00';
            this.ctx.fillRect(x - 1, y - 1, this.cellSize + 2, this.cellSize + 2);
            
            // Sparks
            if (Math.random() < 0.1) {
                this.ctx.globalAlpha = Math.random();
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.fillRect(x + Math.random() * 2, y + Math.random() * 2, 1, 1);
            }
        }
        // Water - Realistic fluid dynamics
        else if (material === 'water') {
            const wave = Math.sin(time * 3 + gridX * 0.2 + gridY * 0.1) * 0.1;
            const brightness = 0.7 + wave + noise * 0.2;
            
            // Water base
            this.ctx.fillStyle = this.adjustBrightness(baseColor, brightness);
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            
            // Water highlights
            if (Math.random() < 0.3) {
                this.ctx.globalAlpha = 0.4;
                this.ctx.fillStyle = '#87CEEB';
                this.ctx.fillRect(x + 1, y + 1, 2, 2);
            }
            
            // Bubbles
            if (Math.random() < 0.05) {
                this.ctx.globalAlpha = 0.6;
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.beginPath();
                this.ctx.arc(x + 2, y + 2, 1, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        // Lava - Glowing molten effect
        else if (material === 'lava') {
            const glow = 0.6 + Math.sin(time * 2 + gridX * 0.3) * 0.4;
            const temp = 1000 + Math.sin(time * 4 + gridY * 0.2) * 500;
            
            // Lava core
            this.ctx.fillStyle = this.temperatureToColor(temp);
            this.ctx.globalAlpha = 0.9;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            
            // Lava glow
            this.ctx.globalAlpha = glow * 0.5;
            this.ctx.fillStyle = '#FF4500';
            this.ctx.fillRect(x - 1, y - 1, this.cellSize + 2, this.cellSize + 2);
            
            // Crust effect
            if (Math.random() < 0.2) {
                this.ctx.globalAlpha = 0.7;
                this.ctx.fillStyle = '#8B0000';
                this.ctx.fillRect(x, y, this.cellSize, 1);
            }
        }
        // Plasma - Energy field effect
        else if (material === 'plasma') {
            const energy = Math.sin(time * 8 + gridX * 0.4) * Math.cos(time * 6 + gridY * 0.4);
            const colors = ['#FF00FF', '#00FFFF', '#FFFF00', '#FF00AA', '#00FF00'];
            const colorIndex = Math.floor((energy + 1) * 2.5) % colors.length;
            
            this.ctx.fillStyle = colors[colorIndex];
            this.ctx.globalAlpha = 0.6 + Math.abs(energy) * 0.4;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            
            // Energy arcs
            this.ctx.globalAlpha = 0.3;
            this.ctx.strokeStyle = colors[(colorIndex + 1) % colors.length];
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(x + 2, y + 2);
            this.ctx.lineTo(x + this.cellSize - 2, y + this.cellSize - 2);
            this.ctx.stroke();
        }
        // Lightning - Electric discharge
        else if (material === 'lightning') {
            if (Math.random() < 0.8) {
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.globalAlpha = 0.9 + Math.random() * 0.1;
                this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
                
                // Electric branches
                this.ctx.globalAlpha = 0.5;
                this.ctx.strokeStyle = '#87CEEB';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(x + 2, y + 2);
                this.ctx.lineTo(x + Math.random() * this.cellSize, y + Math.random() * this.cellSize);
                this.ctx.stroke();
            } else {
                this.ctx.fillStyle = '#4169E1';
                this.ctx.globalAlpha = 0.3;
                this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            }
        }
        // Stone - Natural texture
        else if (['stone', 'rockwall', 'basalt', 'tuff'].includes(material)) {
            const roughness = noise * 0.3;
            this.ctx.fillStyle = this.adjustBrightness(baseColor, 0.8 + roughness);
            this.ctx.globalAlpha = 0.9;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            
            // Stone grain
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillStyle = this.adjustBrightness(baseColor, 0.6);
            if (Math.random() < 0.4) {
                this.ctx.fillRect(x + Math.random() * 2, y + Math.random() * 2, 1, 1);
            }
        }
        // Sand - Granular texture
        else if (material === 'sand') {
            const grain = Math.sin(gridX * 10 + gridY * 10) * 0.1;
            this.ctx.fillStyle = this.adjustBrightness(baseColor, 0.7 + grain + noise * 0.2);
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            
            // Individual grains
            this.ctx.globalAlpha = 0.6;
            this.ctx.fillStyle = '#D2B48C';
            for (let i = 0; i < 2; i++) {
                if (Math.random() < 0.3) {
                    this.ctx.fillRect(x + Math.random() * 3, y + Math.random() * 3, 1, 1);
                }
            }
        }
        // Glass - Refraction effect
        else if (material === 'glass') {
            this.ctx.fillStyle = baseColor;
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            
            // Glass reflection
            this.ctx.globalAlpha = 0.2;
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(x + 1, y + 1, 1, this.cellSize - 2);
        }
        // Mirror - Reflection effect
        else if (material === 'mirror') {
            this.ctx.fillStyle = baseColor;
            this.ctx.globalAlpha = 0.4;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            
            // Mirror shine
            this.ctx.globalAlpha = 0.6;
            const gradient = this.ctx.createLinearGradient(x, y, x + this.cellSize, y + this.cellSize);
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(1, '#C0C0C0');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
        }
        // Metals - Reflective surfaces
        else if (['iron', 'mercury', 'bullet', 'robot'].includes(material)) {
            const metallic = Math.sin(time * 2 + gridX * 0.2) * 0.1;
            this.ctx.fillStyle = this.adjustBrightness(baseColor, 0.8 + metallic);
            this.ctx.globalAlpha = 0.9;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            
            // Metal shine
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(x + 1, y + 1, 1, 1);
        }
        // Organic materials - Natural variations
        else if (['wood', 'tree', 'leather', 'bone'].includes(material)) {
            const grain = Math.sin(gridX * 5 + gridY * 3) * 0.2;
            this.ctx.fillStyle = this.adjustBrightness(baseColor, 0.7 + grain + noise * 0.1);
            this.ctx.globalAlpha = 0.85;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            
            // Wood grain lines
            if (material === 'tree' && Math.random() < 0.3) {
                this.ctx.globalAlpha = 0.4;
                this.ctx.fillStyle = this.adjustBrightness(baseColor, 0.5);
                this.ctx.fillRect(x, y + Math.random() * this.cellSize, this.cellSize, 1);
            }
        }
        // Food materials - Realistic appearance
        else if (material.startsWith('raw_') || material.startsWith('cooked_')) {
            const texture = noise * 0.2;
            this.ctx.fillStyle = this.adjustBrightness(baseColor, 0.8 + texture);
            this.ctx.globalAlpha = 0.9;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
            
            // Food surface details
            if (material === 'cooked_chicken' && Math.random() < 0.3) {
                this.ctx.globalAlpha = 0.5;
                this.ctx.fillStyle = '#8B4513';
                this.ctx.fillRect(x + Math.random() * 2, y + Math.random() * 2, 1, 1);
            }
        }
        // Default enhanced rendering
        else {
            const variation = noise * 0.15;
            this.ctx.fillStyle = this.adjustBrightness(baseColor, 0.85 + variation);
            this.ctx.globalAlpha = 0.9;
            this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
        }
        
        // Reset alpha
        this.ctx.globalAlpha = 1.0;
    }
    
    addPostProcessingEffects() {
        // Add subtle screen overlay for depth
        this.ctx.globalAlpha = 0.05;
        const overlay = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2
        );
        overlay.addColorStop(0, 'transparent');
        overlay.addColorStop(1, '#000000');
        this.ctx.fillStyle = overlay;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1.0;
    }
    
    temperatureToColor(temp) {
        // Convert temperature to color (simplified blackbody radiation)
        if (temp < 1000) return '#8B0000';
        if (temp < 1500) return '#FF4500';
        if (temp < 2000) return '#FF6347';
        if (temp < 2500) return '#FF8C00';
        return '#FFD700';
    }
    
    simplexNoise(x, y, z) {
        // Simple noise function for texture generation
        return Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453 % 1;
    }
    
    updateInfoBar() {
        // Update coordinates
        document.getElementById('coords').textContent = `x${this.mouseX}, y${this.mouseY}`;
        
        // Update pixel count
        document.getElementById('pixels').textContent = `Pxls:${this.particleCount}`;
        
        // Update FPS
        this.frameCount++;
        const now = performance.now();
        if (now - this.lastFpsUpdate >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastFpsUpdate = now;
            document.getElementById('fps').textContent = `${this.fps}fps`;
        }
        
        // Update particle count
        document.getElementById('particles').textContent = this.particleCount.toString();
    }
    
    adjustBrightness(color, brightness) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        const newR = Math.min(255, Math.floor(r * brightness));
        const newG = Math.min(255, Math.floor(g * brightness));
        const newB = Math.min(255, Math.floor(b * brightness));
        
        return `rgb(${newR}, ${newG}, ${newB})`;
    }
    
    gameLoop() {
        this.updatePhysics();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new RxBoxGame();
});
