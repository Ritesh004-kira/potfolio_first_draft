const inputField = document.getElementById('command-input');
const outputContainer = document.getElementById('output');
const terminal = document.getElementById('terminal');

let commandHistory = [];
let historyIndex = -1;

const FILES = {
    'about': `<p>Hi, I'm <span class="green">Jane Doe</span>.</p>
              <p>I'm a Full Stack Developer obsessed with building clean, efficient, and scalable web applications.</p>
              <p>Current Status: <span class="green">Available for hire.</span></p>`,

    'skills': `<p>LANGUAGES: <span class="green">JavaScript, TypeScript, Python, Java</span></p>
               <p>FRONTEND: <span class="green">React, Vue, Next.js, Tailwind</span></p>
               <p>BACKEND: <span class="green">Node.js, Django, PostgreSQL, Docker</span></p>`,

    'contact': `<p>Email: <a href="mailto:hello@example.com" class="green">hello@example.com</a></p>
                <p>GitHub: <a href="#" class="green">github.com/janedoe</a></p>
                <p>LinkedIn: <a href="#" class="green">linkedin.com/in/janedoe</a></p>`
};

const COMMANDS = {
    'help': () => {
        return `<p>Available commands:</p>
                <div style="margin-left: 20px;">
                    <p><span class="green">about</span>      - Who am I?</p>
                    <p><span class="green">experience</span> - Work history (Timeline)</p>
                    <p><span class="green">projects</span>   - My recent work</p>
                    <p><span class="green">skills</span>     - Technical capabilities</p>
                    <p><span class="green">resume</span>     - Download my CV</p>
                    <p><span class="green">contact</span>    - Get in touch</p>
                    <p><span class="green">clear</span>      - Clear terminal</p>
                </div>`;
    },

    'resume': () => {
        const link = document.createElement('a');
        link.href = 'resume.txt';
        link.download = 'Jane_Doe_Resume.txt';
        link.click();
        return `<p>Initiating download sequence...</p>
                <p>Transferring <span class="green">Jane_Doe_Resume.txt</span> [100%]</p>
                <p>Download complete.</p>`;
    },

    'experience': () => {
        return `
        <div class="timeline-container">
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                    <span class="time-range">2023 - Present</span>
                    <h3 class="role">Senior Full Stack Engineer</h3>
                    <h4 class="company">TechCorp Industries</h4>
                    <p class="description">Leading a team of 5 developers building next-gen SaaS platforms. Improved system latency by 40%.</p>
                </div>
            </div>
            
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                    <span class="time-range">2021 - 2023</span>
                    <h3 class="role">Software Developer</h3>
                    <h4 class="company">Innovate Solutions</h4>
                    <p class="description">Developed microservices architecture for e-commerce clients. Implemented CI/CD pipelines reducing deployment time by 60%.</p>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                    <span class="time-range">2019 - 2021</span>
                    <h3 class="role">Junior Web Developer</h3>
                    <h4 class="company">StartUp Inc.</h4>
                    <p class="description">Built responsive landing pages and maintained legacy codebase. Collaborated with UX/UI designers.</p>
                </div>
            </div>
        </div>`;
    },

    'projects': () => {
        return `
        <div class="project-grid">
            <div class="project-card">
                <div class="project-title">E-Commerce API</div>
                <p>RESTful API built with Node.js and Express. Handles payments via Stripe.</p>
            </div>
            <div class="project-card">
                <div class="project-title">Task Manager CLI</div>
                <p>A python-based CLI tool for productivity buffs. Syncs with Notion.</p>
            </div>
            <div class="project-card">
                <div class="project-title">Portfolio v1</div>
                <p>My first portfolio site built with pure HTML/CSS.</p>
            </div>
        </div>`;
    },

    'clear': () => {
        outputContainer.innerHTML = '';
        return '';
    }
};

inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const input = this.value.trim();
        if (input) {
            commandHistory.push(input);
            historyIndex = commandHistory.length;
            processCommand(input);
        }
        this.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            this.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            this.value = '';
        }
    }
});

// Always keep focus on input
document.addEventListener('click', () => {
    inputField.focus();
});

function processCommand(cmd) {
    const cmdLower = cmd.toLowerCase();

    // Create command line echo
    const cmdLine = document.createElement('div');
    cmdLine.innerHTML = `<span class="prompt">visitor@portfolio:~$</span> <span>${cmd}</span>`;
    outputContainer.appendChild(cmdLine);

    if (COMMANDS[cmdLower]) {
        const response = COMMANDS[cmdLower]();
        if (response) {
            const responseDiv = document.createElement('div');
            responseDiv.innerHTML = response;
            responseDiv.style.marginBottom = '20px'; // spacing
            outputContainer.appendChild(responseDiv);
        }
    } else if (FILES[cmdLower]) {
        const responseDiv = document.createElement('div');
        responseDiv.innerHTML = FILES[cmdLower];
        responseDiv.style.marginBottom = '20px';
        outputContainer.appendChild(responseDiv);
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `<p>Command not found: <span class="green">${cmd}</span>. Type 'help' for valid commands.</p>`;
        errorDiv.style.marginBottom = '20px';
        outputContainer.appendChild(errorDiv);
    }

    // Scroll to bottom
    const scrollContainer = document.getElementById('scroll-container');
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
}
