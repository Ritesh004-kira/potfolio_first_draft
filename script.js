const inputField = document.getElementById('command-input');
const outputContainer = document.getElementById('output');
const terminal = document.getElementById('terminal');

let commandHistory = [];
let historyIndex = -1;

const FILES = {
    'about': `<p>Hi, I'm <span class="green">Ritesh Vishwakarma</span>.</p>
              <p>I'm an aspiring Full Stack Developer obsessed with building clean, efficient, and scalable web applications with modern technologies such as Artificial Intelligence and Machine Learning.</p>
              <p>Current Status: <span class="green">Available for hire.</span></p>`,

    'skills': `<p>LANGUAGES: <span class="green">JavaScript, HTML, CSS, Python, C, C++</span></p>
               <p>FRONTEND: <span class="green">React, Vue, Next.js, Tailwind</span></p>
               <p>BACKEND: <span class="green">Node.js, Django, PostgreSQL, Docker</span></p>`,

    'contact': `<p>Email: <a href="mailto:riteshvish94@gmail.com" class="green">My Email</a></p>
                <p>GitHub: <a href="https://github.com/Ritesh004-kira" class="green">My GitHub</a></p>
                <p>LinkedIn: <a href="https://tinyurl.com/ritesh-linkedin" class="green">My LinkedIn</a></p>`
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
        link.href = 'Ritesh_Vishwakarma_resume.pdf';
        link.download = 'Ritesh_Vishwakarma_resume.pdf';
        link.click();
        return `<p>Initiating download sequence...</p>
                <p>Transferring <span class="green">Ritesh_Vishwakarma_Professional.docx</span> [100%]</p>
                <p>Download complete.</p>`;
    },

    'experience': () => {
        return `
        <div class="timeline-container">
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                    <span class="time-range">2025 - Present</span>
                    <h3 class="role">Student at Chandigarh University</h3>
                    <h4 class="company">Chandigarh University</h4>
                    <p class="description">Pursuing a Bachelor of Technology in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning.</p>
                </div>
            </div>
            
            <!--
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
            -->
        </div>`;
    },

    'projects': () => {
        return `
        <div class="project-grid">
            <div class="project-card">
                <div class="project-title">Digital-Wallet</div>
                <p>Logic written in C language and converted to python language for GUI (flask, html, css, js) </p>
                <a href="https://digital-wallet-kappa-silk.vercel.app/" class="green">Live Link</a>
            </div>
            <div class="project-card">
                <div class="project-title">E-book reader</div>
                <p>An offline ebook reader made with html, css, supabase and javascript.Integrated dictionary api for vocabulary support.</p>
                <a href="https://epub-reader-delta.vercel.app/" class="green">Live Link</a>
            </div>
            <div class="project-card">
                <div class="project-title">Portfolio v1</div>
                <p>My first portfolio site built with pure HTML/CSS and javascript.</p>
                <a href="https://potfolio-first-draft.vercel.app/" class="green">Live Link</a>
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
