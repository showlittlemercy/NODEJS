// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    
    // Active navigation highlight
    highlightActiveSection();
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Highlight active section in navigation
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Live Code Editor
const codeEditor = document.getElementById('codeEditor');
const output = document.getElementById('output');
const runButton = document.getElementById('runCode');
const clearButton = document.getElementById('clearOutput');

// Custom console for output
const customConsole = {
    log: function(...args) {
        const message = args.map(arg => {
            if (typeof arg === 'object') {
                try {
                    return JSON.stringify(arg, null, 2);
                } catch (e) {
                    return String(arg);
                }
            }
            return String(arg);
        }).join(' ');
        output.textContent += message + '\n';
    },
    error: function(...args) {
        const message = args.map(arg => String(arg)).join(' ');
        output.textContent += '❌ Error: ' + message + '\n';
    },
    warn: function(...args) {
        const message = args.map(arg => String(arg)).join(' ');
        output.textContent += '⚠️ Warning: ' + message + '\n';
    },
    info: function(...args) {
        const message = args.map(arg => String(arg)).join(' ');
        output.textContent += 'ℹ️ Info: ' + message + '\n';
    }
};

// Run code function
runButton.addEventListener('click', () => {
    output.textContent = '';
    const code = codeEditor.value;
    
    try {
        // Create a function that captures console output
        const wrappedCode = `
            (function() {
                const console = arguments[0];
                ${code}
            })(customConsole);
        `;
        
        // Execute the code
        eval(wrappedCode);
        
        if (output.textContent === '') {
            output.textContent = '✅ Code executed successfully! (No output)';
        }
    } catch (error) {
        customConsole.error(error.message);
        output.textContent += '\n' + error.stack;
    }
});

// Clear output
clearButton.addEventListener('click', () => {
    output.textContent = '';
});

// Code Examples
const exampleButtons = document.querySelectorAll('.example-btn');
const codeExamples = {
    async: `// Async/Await Example
async function fetchUserData(userId) {
    console.log('Fetching user data...');
    
    // Simulate API call
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: 'John Doe',
                email: 'john@example.com'
            });
        }, 1000);
    });
    
    console.log('User data:', data);
    return data;
}

// Call the async function
fetchUserData(123)
    .then(data => console.log('Fetch complete!'))
    .catch(err => console.error(err));

console.log('This runs immediately!');`,

    promises: `// Promises Example
function createPromise(value, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value > 0) {
                resolve(\`Success: \${value}\`);
            } else {
                reject('Value must be positive');
            }
        }, delay);
    });
}

// Promise chaining
createPromise(5, 1000)
    .then(result => {
        console.log(result);
        return createPromise(10, 500);
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        console.log('Promise chain completed');
    });

// Promise.all
const promises = [
    createPromise(1, 500),
    createPromise(2, 700),
    createPromise(3, 300)
];

Promise.all(promises)
    .then(results => console.log('All results:', results))
    .catch(err => console.error(err));`,

    array: `// Array Methods Examples
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map - transform each element
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// filter - keep elements that match condition
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evenNumbers);

// reduce - accumulate values
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum:', sum);

// find - get first matching element
const firstEven = numbers.find(n => n % 2 === 0);
console.log('First even:', firstEven);

// some - check if any element matches
const hasLargeNumber = numbers.some(n => n > 8);
console.log('Has number > 8:', hasLargeNumber);

// every - check if all elements match
const allPositive = numbers.every(n => n > 0);
console.log('All positive:', allPositive);

// forEach - iterate over elements
console.log('Each number:');
numbers.forEach((n, index) => {
    console.log(\`  Index \${index}: \${n}\`);
});`,

    objects: `// Object Manipulation
const person = {
    name: 'John Doe',
    age: 30,
    city: 'New York',
    hobbies: ['reading', 'gaming', 'coding']
};

console.log('Original object:', person);

// Object.keys
console.log('Keys:', Object.keys(person));

// Object.values
console.log('Values:', Object.values(person));

// Object.entries
console.log('Entries:', Object.entries(person));

// Object destructuring
const { name, age, city } = person;
console.log(\`\${name} is \${age} years old and lives in \${city}\`);

// Spread operator
const updatedPerson = {
    ...person,
    age: 31,
    country: 'USA'
};
console.log('Updated person:', updatedPerson);

// Object.assign
const mergedObject = Object.assign({}, person, { profession: 'Developer' });
console.log('Merged object:', mergedObject);

// Optional chaining
console.log('Hobby:', person.hobbies?.[0]);
console.log('Non-existent:', person.address?.street);`,

    classes: `// ES6 Classes Example
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    makeSound(sound) {
        console.log(\`\${this.name} says: \${sound}\`);
    }
    
    describe() {
        console.log(\`\${this.name} is a \${this.species}\`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Dog');
        this.breed = breed;
    }
    
    bark() {
        this.makeSound('Woof!');
    }
    
    describe() {
        super.describe();
        console.log(\`Breed: \${this.breed}\`);
    }
}

// Create instances
const animal = new Animal('Generic Animal', 'Unknown');
animal.describe();
animal.makeSound('...');

console.log('---');

const dog = new Dog('Buddy', 'Golden Retriever');
dog.describe();
dog.bark();

// Static methods
class MathHelper {
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
}

console.log('5 + 3 =', MathHelper.add(5, 3));
console.log('5 × 3 =', MathHelper.multiply(5, 3));`,

    destructuring: `// Destructuring Examples

// Array destructuring
const colors = ['red', 'green', 'blue', 'yellow'];
const [first, second, ...rest] = colors;

console.log('First color:', first);
console.log('Second color:', second);
console.log('Rest:', rest);

// Skipping elements
const [, , third] = colors;
console.log('Third color:', third);

// Object destructuring
const user = {
    id: 1,
    username: 'johndoe',
    email: 'john@example.com',
    profile: {
        firstName: 'John',
        lastName: 'Doe',
        age: 30
    }
};

const { username, email } = user;
console.log('Username:', username);
console.log('Email:', email);

// Nested destructuring
const { profile: { firstName, lastName, age } } = user;
console.log(\`Name: \${firstName} \${lastName}, Age: \${age}\`);

// Destructuring with default values
const { country = 'Unknown', city = 'Unknown' } = user;
console.log('Country:', country);

// Destructuring in function parameters
function printUser({ username, email, profile: { age } }) {
    console.log(\`User: \${username}, Email: \${email}, Age: \${age}\`);
}

printUser(user);

// Swapping variables
let a = 1, b = 2;
console.log('Before swap:', { a, b });
[a, b] = [b, a];
console.log('After swap:', { a, b });`
};

exampleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const exampleType = button.getAttribute('data-example');
        const exampleCode = codeExamples[exampleType];
        
        if (exampleCode) {
            codeEditor.value = exampleCode;
            output.textContent = '';
            
            // Scroll to editor
            codeEditor.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runButton.click();
    }
    
    // Ctrl/Cmd + L to clear output
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearButton.click();
    }
});

// Add keyboard shortcut hints
const runBtnOriginalText = runButton.innerHTML;
runButton.title = 'Run Code (Ctrl/Cmd + Enter)';
clearButton.title = 'Clear Output (Ctrl/Cmd + L)';

// Animate cards on scroll
const cards = document.querySelectorAll('.card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

cards.forEach(card => {
    cardObserver.observe(card);
});

// Feature cards animation
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Copy code to clipboard functionality
document.querySelectorAll('.code-block').forEach(codeBlock => {
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-btn';
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.title = 'Copy code';
    
    copyButton.addEventListener('click', () => {
        const code = codeBlock.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            copyButton.style.background = '#4caf50';
            
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                copyButton.style.background = '';
            }, 2000);
        });
    });
    
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyButton);
});

// Add copy button styles dynamically
const style = document.createElement('style');
style.textContent = `
    .copy-code-btn {
        position: absolute;
        top: 40px;
        right: 10px;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 5px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .code-block:hover .copy-code-btn {
        opacity: 1;
    }
    
    .copy-code-btn:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// Initialize syntax highlighting effect
function addSyntaxHighlighting() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    
    codeBlocks.forEach(block => {
        let code = block.innerHTML;
        
        // Simple syntax highlighting (basic)
        code = code.replace(/\/\/.*/g, '<span style="color: #6a9955;">$&</span>'); // Comments
        code = code.replace(/\b(const|let|var|function|async|await|return|if|else|for|while|class|extends|import|export|from|require|module\.exports)\b/g, '<span style="color: #c586c0;">$&</span>'); // Keywords
        code = code.replace(/(['"`])(?:(?=(\\?))\2.)*?\1/g, '<span style="color: #ce9178;">$&</span>'); // Strings
        code = code.replace(/\b(\d+)\b/g, '<span style="color: #b5cea8;">$&</span>'); // Numbers
        
        block.innerHTML = code;
    });
}

// Run highlighting on load
window.addEventListener('load', () => {
    addSyntaxHighlighting();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Progress bar for page scroll
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    z-index: 9999;
    transition: width 0.2s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        customConsole.log('🎉 Konami Code Activated! You are a true developer! 🎉');
        output.style.display = 'block';
        document.querySelector('.output-container').scrollIntoView({ behavior: 'smooth' });
        
        // Add confetti effect
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
    }
});

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${['#68a063', '#3c873a', '#f39c12', '#e74c3c', '#3498db'][Math.floor(Math.random() * 5)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        opacity: 1;
        transform: rotate(${Math.random() * 360}deg);
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(confetti);
    
    let pos = -10;
    const fall = setInterval(() => {
        pos += 5;
        confetti.style.top = pos + 'px';
        confetti.style.opacity = 1 - (pos / window.innerHeight);
        
        if (pos >= window.innerHeight) {
            clearInterval(fall);
            confetti.remove();
        }
    }, 20);
}

console.log('%c🚀 Node.js Documentation Website', 'font-size: 20px; font-weight: bold; color: #68a063;');
console.log('%cWelcome to the interactive Node.js learning platform!', 'font-size: 14px; color: #3c873a;');
console.log('%cTip: Try the Konami code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 12px; font-style: italic;');
