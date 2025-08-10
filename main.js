// main.js
import '@worldcoin/idkit-standalone'  // uses the installed package (bundled by Vite)

const APP_ID = 'app_staging_e79acddecf543fdbfaf5f84fb1d9cc05' // <- set this
const ACTION = 'connect-worldid'         // <- set this to the action slug from Developer Portal

const statusEl = document.getElementById('status')
const btn = document.getElementById('connectBtn')

function updateStatus(t){ statusEl.textContent = t }

IDKit.init({
  app_id: APP_ID,
  action: ACTION,
  signal: 'session_' + Math.random().toString(36).slice(2,9), // a client-side signal; optional but recommended to tie to a session
  action_description: 'Verify your World ID',
  verification_level: 'orb', // common value; match portal settings
  handleVerify: async (result) => {
    // result contains { merkle_root, nullifier_hash, proof, verification_level }
    updateStatus('Sending proof to server for verification...')
    const resp = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...result, action: ACTION })
    })
    if (!resp.ok) {
      const err = await resp.text()
      updateStatus('Server verification failed.')
      console.error('verify error', err)
      return
    }
    const json = await resp.json()
    if (json.success) {
      updateStatus('Verified ✅')
    } else {
      updateStatus('Not verified ❌')
      console.error('verify result', json)
    }
  },
  onSuccess: (r) => {
    // optional: fired after handleVerify resolves
    console.log('onSuccess', r)
  },
  onError: (e) => {
    console.error('IDKit error', e)
    updateStatus('Error: ' + (e?.message || e))
  }
})

btn.addEventListener('click', async () => {
  try {
    updateStatus('Opening World ID modal...')
    await IDKit.open()
  } catch (e) {
    console.error(e)
    updateStatus('Could not open: ' + (e?.message || e))
  }
})

 // Version number to force cache refresh when date changes
        const LAUNCH_DATE_VERSION = '1.2';
        const VERSION_KEY = 'launchDateVersion';
        const LAUNCH_DATE_KEY = 'launchDate';
        
        let launchDate;
        const storedVersion = localStorage.getItem(VERSION_KEY);
        const storedLaunchDate = localStorage.getItem(LAUNCH_DATE_KEY);

        // Check if we have a version mismatch or no stored data
        if (storedVersion !== LAUNCH_DATE_VERSION || !storedLaunchDate) {
            // Clear old data and set new launch date
            localStorage.removeItem(LAUNCH_DATE_KEY);
            localStorage.removeItem(VERSION_KEY);
            
            // Set launchDate to August 21, 2025, 10:00 AM MYT (+08:00)
            launchDate = new Date('2025-08-21T10:00:00+08:00');
            
            // Store the new date and version
            localStorage.setItem(LAUNCH_DATE_KEY, launchDate.getTime());
            localStorage.setItem(VERSION_KEY, LAUNCH_DATE_VERSION);
        } else {
            // Use the stored launchDate (versions match)
            launchDate = new Date(parseInt(storedLaunchDate));
        }

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = launchDate.getTime() - now;
            
            if (distance < 0) {
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                document.querySelector('.cyber-message').innerHTML = 
                    'CYBER ARENA IS LIVE!<br>ENTER THE DIGITAL RING<br>THE FIGHT BEGINS NOW!';
                document.querySelector('.fight-announcement').textContent = 'LIVE NOW';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }

        // Run immediately and every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Create dynamic particles with limited colors
        function createNeonParticle() {
            const colors = ['#0066ff', '#ff6600', '#ffffff', '#ffffff'];
            const particle = document.createElement('div');
            particle.className = 'neon-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
        
        // Create new particles periodically
        setInterval(createNeonParticle, 200);
        
        // Mouse particle system
        let mouseX = 0;
        let mouseY = 0;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let isMouseMoving = false;
        let particles = [];
        let mouseStopTimeout;
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Check if mouse actually moved
            if (Math.abs(mouseX - lastMouseX) > 1 || Math.abs(mouseY - lastMouseY) > 1) {
                isMouseMoving = true;
                
                // Clear existing timeout
                clearTimeout(mouseStopTimeout);
                
                // Set timeout to stop particles after mouse stops
                mouseStopTimeout = setTimeout(() => {
                    isMouseMoving = false;
                }, 100);
            }
        });
        
        // Particle class
        class MouseParticle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 6 + 4; // 4-10px squares
                this.speedX = (Math.random() - 0.5) * 4; // horizontal drift
                this.speedY = Math.random() * 1.5 + 1; // slower falling speed
                this.life = 1;
                this.decay = Math.random() * 0.015 + 0.005; // slower decay for less transparency
                this.colors = ['#ffffff', '#0066ff', '#ff6600', '#f15e00'];
                this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
                this.element = this.createElement();
            }
            
            createElement() {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = this.x + 'px';
                particle.style.top = this.y + 'px';
                particle.style.width = this.size + 'px';
                particle.style.height = this.size + 'px';
                particle.style.backgroundColor = this.color;
                particle.style.boxShadow = `0 0 ${this.size * 2}px ${this.color}`;
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1000';
                particle.style.imageRendering = 'pixelated';
                particle.style.imageRendering = '-moz-crisp-edges';
                particle.style.imageRendering = 'crisp-edges';
                document.body.appendChild(particle);
                return particle;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= this.decay;
                
                // Apply gravity (reduced)
                this.speedY += 0.05;
                
                // Update element position and opacity
                this.element.style.left = this.x + 'px';
                this.element.style.top = this.y + 'px';
                this.element.style.opacity = this.life;
                
                // Remove if dead or off screen
                if (this.life <= 0 || this.y > window.innerHeight + 50) {
                    this.element.remove();
                    return false;
                }
                return true;
            }
        }
        
        // Create particles from mouse position
        function createMouseParticles() {
            // Only create particles if mouse is moving
            if (!isMouseMoving) return;
            
            // Reduced particle generation - only 20% chance per frame
            if (Math.random() > 0.2) return;
            
            // Create only 1 particle when triggered
            const offsetX = (Math.random() - 0.5) * 15; // spread around cursor
            const offsetY = (Math.random() - 0.5) * 15;
            particles.push(new MouseParticle(mouseX + offsetX, mouseY + offsetY));
        }
        
        // Animation loop
        function animateParticles() {
            // Update all particles
            particles = particles.filter(particle => particle.update());
            
            // Create new particles
            createMouseParticles();
            
            // Limit particle count for performance
            if (particles.length > 100) {
                const excess = particles.splice(0, particles.length - 100);
                excess.forEach(particle => particle.element.remove());
            }
            
            requestAnimationFrame(animateParticles);
        }
        
        // Start particle animation
        animateParticles();
        


