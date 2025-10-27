document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Logic
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');

    const setActiveSection = (targetId) => {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        const activeSection = document.getElementById(targetId);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    };

    const setActiveButton = (targetId) => {
        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.target === targetId) {
                button.classList.add('active');
            }
        });
    };

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.currentTarget.dataset.target;
            setActiveButton(targetId);
            setActiveSection(targetId);
            updateElementSdk(targetId);
        });
    });

    // Initialize with the first section (if any)
    if (navButtons.length > 0) {
        setActiveSection(navButtons[0].dataset.target);
        //setActiveButton(navButtons[0].dataset.target); // already active in HTML

        // 2. Initial Setup for Element SDK
        const defaultConfig = {
            nav_intro: true,
            nav_architecture: true,
            nav_scalability: true,
            nav_usecase: true,
            nav_examples: true,
        };

        const mapToCapabilities = (config) => new Map([
            ["nav_intro", config.nav_intro || defaultConfig.nav_intro],
            ["nav_architecture", config.nav_architecture || defaultConfig.nav_architecture],
            ["nav_scalability", config.nav_scalability || defaultConfig.nav_scalability],
            ["nav_usecase", config.nav_usecase || defaultConfig.nav_usecase],
            ["nav_examples", config.nav_examples || defaultConfig.nav_examples]
        ]);

        const mapToEditPanelValues = (capabilities) => ({
            nav_intro: capabilities.get("nav_intro"),
            nav_architecture: capabilities.get("nav_architecture"),
            nav_scalability: capabilities.get("nav_scalability"),
            nav_usecase: capabilities.get("nav_usecase"),
            nav_examples: capabilities.get("nav_examples")
        });

        // 3. Helper to update the Element SDK config on navigation
        const updateElementSdk = (targetId) => {
            const newConfig = {};
            navButtons.forEach(button => {
                newConfig[button.id] = (button.dataset.target === targetId);
            });
            if (window.elementSdk && window.elementSdk.setConfig) {
                window.elementSdk.setConfig(newConfig);
            }
        };

        // 4. Handle Config Changes from Element SDK
        const onConfigChange = (newConfig) => {
            const activeNavId = Object.keys(newConfig).find(key => newConfig[key] === true);
            if (activeNavId) {
                const navButton = document.getElementById(activeNavId);
                if (navButton) {
                    const targetId = navButton.dataset.target;
                    setActiveButton(targetId);
                    setActiveSection(targetId);
                }
            }
        };

        // Initialize Element SDK
        if (window.elementSdk) {
            window.elementSdk.init({
                defaultConfig,
                onConfigChange,
                mapToCapabilities,
                mapToEditPanelValues
            });
        }
    }
});

// A temporary fix for an issue where scripts within DOCX files sometimes get a wrapper.
// This is not part of the user's original logical script but is a browser-compatibility fix for the environment.
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement("script");d.setAttribute("data-id","injected-doc-script");d.type="text/javascript";d.innerHTML="document.addEventListener('DOMContentLoaded', () => { \n\n    // 1. Navigation Logic\n    const navButtons = document.querySelectorAll('.nav-btn');\n    const contentSections = document.querySelectorAll('.content-section');\n\n    const setActiveSection = (targetId) => { \n        contentSections.forEach(section => { \n            section.classList.remove('active');\n        });\n        const activeSection = document.getElementById(targetId);\n        if (activeSection) { \n            activeSection.classList.add('active');\n        }\n    }; \n\n    const setActiveButton = (targetId) => { \n        navButtons.forEach(button => { \n            button.classList.remove('active');\n            if (button.dataset.target === targetId) { \n                button.classList.add('active');\n            }\n        });\n    }; \n\n    navButtons.forEach(button => { \n        button.addEventListener('click', (e) => { \n            const targetId = e.currentTarget.dataset.target;\n            setActiveButton(targetId);\n            setActiveSection(targetId);\n            updateElementSdk(targetId);\n        });\n    }); \n\n    // Initialize with the first section (if any)\n    if (navButtons.length > 0) { \n        setActiveSection(navButtons[0].dataset.target);\n        //setActiveButton(navButtons[0].dataset.target); // already active in HTML\n\n        // 2. Initial Setup for Element SDK\n        const defaultConfig = {\n            nav_intro: true,\n            nav_architecture: true,\n            nav_scalability: true,\n            nav_usecase: true,\n            nav_examples: true,\n        }; \n\n        const mapToCapabilities = (config) => new Map([\n            [\"nav_intro\", config.nav_intro || defaultConfig.nav_intro],\n            [\"nav_architecture\", config.nav_architecture || defaultConfig.nav_architecture],\n            [\"nav_scalability\", config.nav_scalability || defaultConfig.nav_scalability],\n            [\"nav_usecase\", config.nav_usecase || defaultConfig.nav_usecase],\n            [\"nav_examples\", config.nav_examples || defaultConfig.nav_examples]\n        ]); \n\n        const mapToEditPanelValues = (capabilities) => ({\n            nav_intro: capabilities.get(\"nav_intro\"),\n            nav_architecture: capabilities.get(\"nav_architecture\"),\n            nav_scalability: capabilities.get(\"nav_scalability\"),\n            nav_usecase: capabilities.get(\"nav_usecase\"),\n            nav_examples: capabilities.get(\"nav_examples\")\n        }); \n\n        // 3. Helper to update the Element SDK config on navigation\n        const updateElementSdk = (targetId) => { \n            const newConfig = {};\n            navButtons.forEach(button => { \n                newConfig[button.id] = (button.dataset.target === targetId);\n            });\n            if (window.elementSdk && window.elementSdk.setConfig) { \n                window.elementSdk.setConfig(newConfig);\n            }\n        }; \n\n        // 4. Handle Config Changes from Element SDK\n        const onConfigChange = (newConfig) => { \n            const activeNavId = Object.keys(newConfig).find(key => newConfig[key] === true);\n            if (activeNavId) { \n                const navButton = document.getElementById(activeNavId);\n                if (navButton) { \n                    const targetId = navButton.dataset.target;\n                    setActiveButton(targetId);\n                    setActiveSection(targetId);\n                }\n            }\n        }; \n\n        // Initialize Element SDK\n        if (window.elementSdk) { \n            window.elementSdk.init({\n                defaultConfig,\n                onConfigChange,\n                mapToCapabilities,\n                mapToEditPanelValues\n            });\n        }\n    } \n}); \n";b.head.appendChild(d)}}var a=document.getElementById("sandbox-iframe");if(a){a.onload=c}else{a=document.getElementById("file-viewer-iframe");if(a){a.onload=c}else{var e=document.createElement("iframe");e.setAttribute("data-id","sandbox-iframe");e.style.display="none";document.body.appendChild(e);a=e;a.onload=c}}}());