const httpRequest = async (jsonName) => {
    const controller = new AbortController();
    const signal = controller.signal;    
    
    try {
        const response = await fetch('./data/'+jsonName+'.json', {signal});
        if (!response.ok) {
            controller.abort();
            console.error("Error cant process request");
            return;
        }
        const data = await response.json();        
        return data;
    } catch {
        console.error("Fecth data: Error -> "+error.message);
        controller.abort();
    }
}

const getProfile = () => {
    httpRequest("portfolio").then(data => {
        const home = document.querySelector('#home');
        const about = document.querySelector('#about');
        const socialLinks = document.querySelector('#social-links');
        const contactInfo = document.querySelector('#contact-info');

        home.querySelector('#name').insertAdjacentHTML('beforeend', data.profile.name);
        home.querySelector('#summary').insertAdjacentHTML('beforeend', data.profile.summary);
        about.querySelector('#about-text').insertAdjacentHTML('beforeend', data.profile.about);

        console.log(data.profile.technologies);
        
        data.profile.technologies.forEach(technology => {
            
            let skillTemplate = `
            <span class="badge text-bg-light mb-2 mb-lg-0">${technology.icon} ${technology.name}</span> `;

            home.querySelector('#technologies').insertAdjacentHTML('beforeend', skillTemplate);
        });
        //home.querySelector('#technologies').insertAdjacentHTML('beforeend', data.profile.summary);

        let socialTemplate = `
        <li class="d-inline px-1">
            <a class="text-decoration-none text-white" rel="noreferrer noopener" href="${data.profile.social.linkedin}" target="_blank"><img src="public/images/linkedin-logo.png" alt="Logo de linkedin" title="Enlace al perfil de linkedin"></a>
        </li>
        <li class="d-inline px-1">
            <a class="text-decoration-none text-white" rel="noreferrer noopener" href="${data.profile.social.facebook}" target="_blank"><img src="public/images/facebook-logo.png" alt="Logo de facebook" title="Enlace al perfil de facebook"></a>
        </li>
        <li class="d-inline px-1">
            <a class="text-decoration-none text-white" rel="noreferrer noopener" href="${data.profile.social.instagram}" target="_blank"><img src="public/images/instagram-logo.png" alt="Logo de facebook" title="Enlace al perfil de instagram"></a>
        </li>
        <li class="d-inline px-1">
            <a title="Enlace al perfil de github" class="text-decoration-none text-white" rel="noreferrer noopener" href="${data.profile.social.github}" target="_blank">
                <svg width="24" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github">
                    <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
                </svg>
            </a>
        </li>
        `;

        let contactTemplate = `
        <a class="text-decoration-none" rel="noreferrer noopener" href="https://wa.me/1${data.profile.contact.phone}" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 -175.15 497.445 497.445" fill="#000000" stroke="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#FEFEFE" d="M487.029 87.874c-.283 1.418-.779 2.623-1.453 3.686-.672 1.062-1.559 1.914-2.691 2.586-1.1.639-2.48.992-4.111.992-1.594 0-2.977-.318-4.074-.992a8.276 8.276 0 0 1-2.729-2.586c-.674-1.062-1.17-2.268-1.488-3.686a19.424 19.424 0 0 1-.461-4.287c0-1.488.143-2.977.426-4.357.283-1.418.779-2.658 1.453-3.721.672-1.1 1.559-1.949 2.691-2.657 1.1-.674 2.481-1.028 4.111-1.028 1.594 0 2.941.354 4.039 1.028a8.605 8.605 0 0 1 2.729 2.692c.709 1.098 1.205 2.373 1.523 3.756.318 1.417.461 2.834.461 4.287s-.143 2.87-.426 4.287zm9.426-11.444c-.674-2.374-1.665-4.429-3.012-6.236-1.383-1.771-3.083-3.225-5.138-4.287-2.056-1.063-4.535-1.63-7.405-1.63-2.268 0-4.324.461-6.201 1.347-1.879.886-3.438 2.338-4.643 4.287h-.141v-4.642h-9.496v49.145h9.992V97.157h.141a11.945 11.945 0 0 0 4.678 4.04c1.914.921 3.969 1.382 6.236 1.382 2.658 0 4.996-.531 7.016-1.559a14.92 14.92 0 0 0 4.996-4.146c1.347-1.736 2.338-3.721 2.977-5.988.674-2.268.992-4.605.992-7.051 0-2.586-.318-5.066-.992-7.441v.036zm-49.287 11.444c-.283 1.418-.779 2.623-1.453 3.686s-1.559 1.914-2.693 2.586c-1.098.639-2.48.992-4.109.992-1.596 0-2.941-.318-4.076-.992a8.295 8.295 0 0 1-2.729-2.586c-.672-1.062-1.168-2.268-1.486-3.686a19.305 19.305 0 0 1-.461-4.287c0-1.488.141-2.977.424-4.357.285-1.418.779-2.658 1.453-3.721.674-1.1 1.559-1.949 2.693-2.657 1.098-.674 2.48-1.028 4.109-1.028 1.596 0 2.941.354 4.041 1.028a8.589 8.589 0 0 1 2.727 2.692c.709 1.098 1.205 2.373 1.525 3.756.318 1.417.459 2.834.459 4.287s-.141 2.87-.424 4.287zm6.412-17.68c-1.346-1.771-3.082-3.225-5.137-4.287-2.055-1.063-4.535-1.63-7.406-1.63-2.268 0-4.322.461-6.201 1.347-1.877.886-3.436 2.338-4.641 4.287h-.143v-4.642h-9.496v49.145h9.992V97.157h.143a11.945 11.945 0 0 0 4.678 4.04c1.912.921 3.967 1.382 6.234 1.382 2.693 0 4.996-.531 7.018-1.559a14.933 14.933 0 0 0 4.994-4.146c1.348-1.736 2.34-3.721 3.014-5.988a25.9 25.9 0 0 0 .992-7.051c0-2.586-.32-5.066-.992-7.441-.674-2.373-1.666-4.429-3.049-6.235v.035zm-65.764 12.047l6.555-18.461h.142l6.343 18.461h-13.04zm1.063-30.862l-19.027 50.278h11.126l3.934-11.196h18.814l3.791 11.196h11.48l-18.814-50.278h-11.339.035zm-19.842 34.334c-.674-1.134-1.524-2.126-2.622-2.905-1.063-.779-2.304-1.383-3.686-1.878a53.25 53.25 0 0 0-4.252-1.204c-1.417-.32-2.799-.639-4.146-.922s-2.587-.603-3.614-.957c-1.062-.354-1.913-.814-2.551-1.382-.674-.567-.992-1.275-.992-2.196 0-.744.177-1.347.566-1.808.39-.46.851-.779 1.382-1.027.532-.248 1.134-.39 1.808-.46a17.49 17.49 0 0 1 1.842-.106c1.772 0 3.331.354 4.643 1.027 1.311.673 2.055 1.984 2.161 3.897h9.496c-.178-2.268-.779-4.11-1.736-5.599s-2.161-2.657-3.614-3.543-3.118-1.523-4.961-1.913c-1.842-.39-3.756-.567-5.74-.567-1.983 0-3.897.178-5.775.531-1.878.354-3.578.957-5.066 1.843-1.523.886-2.729 2.056-3.614 3.543-.922 1.488-1.382 3.438-1.382 5.775 0 1.595.318 2.941.992 4.039.638 1.1 1.523 2.02 2.586 2.764 1.099.709 2.304 1.312 3.686 1.772s2.799.851 4.252 1.169c3.579.744 6.343 1.488 8.362 2.232 1.984.744 2.977 1.878 2.977 3.366 0 .886-.213 1.63-.638 2.232a4.702 4.702 0 0 1-1.595 1.417c-.638.354-1.347.603-2.126.779a9.96 9.96 0 0 1-2.232.248c-.992 0-1.949-.105-2.835-.354-.921-.248-1.736-.604-2.444-1.099-.709-.496-1.276-1.134-1.736-1.913-.461-.779-.674-1.701-.674-2.764h-9.496c.106 2.444.639 4.464 1.666 6.094.992 1.631 2.303 2.906 3.862 3.898 1.559.992 3.366 1.7 5.386 2.125 2.02.426 4.074.639 6.2.639 2.056 0 4.11-.213 6.095-.604 1.984-.389 3.756-1.098 5.315-2.09 1.559-.992 2.799-2.303 3.756-3.898.956-1.629 1.452-3.613 1.452-6.023 0-1.7-.318-3.117-.992-4.252l.034.074zm-41.351-31.357h-9.992v10.913h-6.06v6.696h6.06v21.473c0 1.843.318 3.296.921 4.429.603 1.135 1.453 1.984 2.516 2.623 1.063.602 2.269 1.027 3.65 1.24a29.21 29.21 0 0 0 4.394.318c.992 0 1.984-.035 3.047-.07a20.926 20.926 0 0 0 2.799-.284v-7.76a9.37 9.37 0 0 1-1.487.212 23.67 23.67 0 0 1-1.63.071c-1.701 0-2.8-.283-3.366-.851-.567-.566-.851-1.701-.851-3.365V71.965h7.334v-6.696h-7.334V54.356zM299.02 87.591c0 .566-.07 1.311-.177 2.268a6.95 6.95 0 0 1-.957 2.764c-.531.922-1.311 1.701-2.409 2.375-1.062.672-2.622.992-4.57.992-.78 0-1.56-.072-2.339-.213-.744-.143-1.417-.391-1.984-.744-.567-.355-.992-.815-1.347-1.453-.318-.602-.496-1.346-.496-2.268 0-.957.178-1.701.496-2.338.319-.604.779-1.1 1.312-1.524.531-.39 1.169-.708 1.913-.956s1.453-.426 2.232-.568a49.76 49.76 0 0 1 2.409-.354c.815-.106 1.56-.213 2.304-.354s1.417-.319 2.055-.531 1.169-.496 1.595-.886v3.721l-.037.069zm9.992 5.988V74.622c0-2.196-.496-3.968-1.487-5.314-.992-1.347-2.269-2.374-3.792-3.118-1.559-.744-3.26-1.24-5.138-1.523a42.374 42.374 0 0 0-5.562-.39c-2.021 0-4.04.213-6.024.603-1.983.39-3.791 1.062-5.386 2.02a12.351 12.351 0 0 0-3.933 3.721c-1.027 1.559-1.63 3.507-1.771 5.846h9.992c.177-1.983.85-3.365 1.983-4.216 1.135-.851 2.658-1.275 4.643-1.275.886 0 1.735.07 2.516.177a5.43 5.43 0 0 1 2.055.709c.603.354 1.063.85 1.418 1.488.354.638.531 1.487.531 2.586.035 1.027-.248 1.808-.922 2.374-.673.531-1.559.957-2.692 1.24s-2.409.496-3.862.638-2.941.319-4.429.567c-1.488.248-2.977.566-4.465.956s-2.8.992-3.934 1.808c-1.169.814-2.09 1.877-2.834 3.188-.744 1.347-1.099 3.048-1.099 5.103 0 1.878.318 3.508.957 4.854a9.203 9.203 0 0 0 2.622 3.367 11.44 11.44 0 0 0 3.933 1.984c1.488.425 3.118.637 4.854.637 2.268 0 4.465-.318 6.626-.992a13.265 13.265 0 0 0 5.634-3.436c.035.602.142 1.203.248 1.807.106.566.283 1.169.461 1.736h10.134c-.461-.744-.815-1.879-.992-3.367a39.905 39.905 0 0 1-.284-4.712v-.109zM267.84 68.422c-.992-1.275-2.339-2.303-4.039-3.012-1.701-.744-3.897-1.099-6.591-1.099-1.878 0-3.791.496-5.775 1.453s-3.579 2.516-4.854 4.606h-.213V51.414h-9.992v50.279h9.992V82.595c0-3.721.603-6.378 1.843-8.008 1.205-1.63 3.189-2.409 5.917-2.409 2.374 0 4.075.744 4.996 2.231.922 1.488 1.418 3.721 1.418 6.732v20.552h9.992V79.3c0-2.268-.213-4.322-.603-6.165s-1.099-3.437-2.091-4.713zm-52.831 17.646h-.142l-8.574-34.653h-10.347l-8.717 34.228h-.142l-7.973-34.228H168.06l13.322 50.279h11.197l8.362-34.229h.142l8.504 34.229h10.984l6.023-22.323 7.512-27.956h-10.843l-8.254 34.653z"/>
                    <path fill="#FEFEFE" d="M74.34 131.953c-12.225 0-23.634-3.685-33.165-9.956l-23.174 7.404 7.512-22.393c-7.228-9.922-11.479-22.146-11.479-35.327 0-33.236 27.035-60.271 60.271-60.271s60.271 27.035 60.271 60.271c0 33.235-27.035 60.271-60.271 60.271h.035zM74.34 0C34.76 0 2.659 32.104 2.659 71.682c0 13.535 3.756 26.22 10.275 37.027L.001 147.154l39.686-12.72a71.502 71.502 0 0 0 34.653 8.929c39.579 0 71.681-32.102 71.681-71.681C146.02 32.104 113.919 0 74.34 0z"/>
                    <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="-16132.404" y1="481239.094" x2="-16132.404" y2="484641.094" gradientTransform="translate(-418.003 -816.133) scale(.0013)">
                        <stop offset="0" stop-color="#6ebf61"/>
                    
                        <stop offset=".231" stop-color="#50a557"/>
                    
                        <stop offset=".522" stop-color="#2a904f"/>
                    
                        <stop offset=".812" stop-color="#50a557"/>
                    
                        <stop offset="1" stop-color="#6ebf63"/>
                    </linearGradient>
                    
                    <path fill="url(#a)" d="M74.34 11.41c-33.236 0-60.271 27.035-60.271 60.271 0 13.181 4.252 25.405 11.48 35.327l-7.512 22.393 23.173-7.404c9.531 6.307 20.905 9.956 33.165 9.956 33.236 0 60.271-27.036 60.271-60.271 0-33.236-27.035-60.271-60.271-60.271h-.035z"/>
                    
                    <path fill="#FEFEFE" d="M57.509 42.025c-1.169-2.799-2.055-2.905-3.826-2.977a34.047 34.047 0 0 0-2.02-.07c-2.304 0-4.713.673-6.166 2.161-1.771 1.807-6.165 6.023-6.165 14.669s6.307 17.008 7.157 18.178c.886 1.168 12.296 19.168 30.012 26.504 13.854 5.74 17.965 5.208 21.118 4.535 4.606-.992 10.382-4.395 11.835-8.504 1.453-4.111 1.453-7.619 1.027-8.363-.425-.744-1.595-1.168-3.366-2.055-1.771-.886-10.382-5.138-12.012-5.705-1.595-.602-3.118-.389-4.322 1.312-1.701 2.374-3.366 4.784-4.713 6.236-1.063 1.134-2.8 1.276-4.252.673-1.949-.814-7.405-2.729-14.138-8.717-5.209-4.641-8.752-10.416-9.779-12.152-1.028-1.771-.106-2.8.708-3.756.886-1.099 1.736-1.878 2.622-2.906.886-1.027 1.382-1.559 1.949-2.764.603-1.169.177-2.374-.248-3.26-.425-.886-3.968-9.532-5.421-13.039z"/>
                </g>
            </svg>
        </a>
        <a class="text-decoration-none text-white mailgo mb-2" data-tel="+1${data.profile.contact.phone}" data-telegram="telegram" rel="noreferrer noopener" href="tel:18098488801" target="_blank">+1 809-848-8801</a>
        <a class="text-decoration-none text-white mailgo mb-2" data-address="gregori_dj" data-domain="hotmail.com" rel="noreferrer noopener" href="mailto:${data.profile.contact.email}" target="_blank">${data.profile.contact.email}</a>
        `;
        socialLinks.insertAdjacentHTML('beforeend', socialTemplate);
        contactInfo.insertAdjacentHTML('beforeend', contactTemplate);
    });
}

const getExperience = () => {
    httpRequest("portfolio").then(data => {
        console.log(data.experience);
        const experience = document.querySelector('#experience');
        let experienceTemplate = ``;
        data.experience.forEach(experienceItem => {
         experienceTemplate +=`<article class="card d-block shadow-lg border-0 rounded-4 my-3 border-end border-warning-subtle">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <h3 class="h4 fw-bold">${experienceItem.company} <br> <span class="h6">${experienceItem.from}${experienceItem.to?` - ${experienceItem.to}`:``}</span></h3>
                                <img class="img-fluid img-thumbnail border-0" src="${experienceItem.logo}" alt="Logo ${experienceItem.company}" width="50">
                            </div>
                            <h5 class="card-title">Posiciones</h5>
                            <p class="card-text">${experienceItem.position.map(pos=>{
                                return `<span class="badge bg-primary mx-1 mb-2">${pos}</span>`;
                            }).join("")}</p>
                            <details>
                                <summary class="mb-3">Más información</summary>
                                <h5 class="card-title">Descripción</h5>
                                <p class="card-text">${experienceItem.description}</p>
                                <h5 class="card-title">Tecnologías</h5>
                                <div class="mb-3">
                                ${experienceItem.technologies.map(technology => `<span class="badge bg-primary mx-1 mb-2">${technology}</span>`).join('')}
                                </div> 
                                <h5 class="card-title">Proyectos</h5>
                                <div class="accordion py-2" id="projectsAccordion-${experienceItem.id}">
                                    ${experienceItem.projects.map((project,index) => 
                                    `<div class="accordion-item">
                                        <h2 class="accordion-header" id="heading-${project.uuid+'-'+index}">
                                            <button class="accordion-button ${index!=0?'collapsed':''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${project.uuid+'-'+index}" aria-expanded="${index!=0?'false':'true'}" aria-controls="collapse-${project.uuid+'-'+index}">
                                                ${project.name}
                                            </button>
                                        </h2>
                                        <div id="collapse-${project.uuid+'-'+index}" class="accordion-collapse collapse ${index!=0?'':'show'}" aria-labelledby="heading-${project.uuid+'-'+index}" data-bs-parent="#projectsAccordion-${experienceItem.id}">
                                            <div class="accordion-body">
                                                <p>${project.description}</p>
                                                <a href="${project.url}" target="_blank" rel="noreferrer noopener nofollow" class="card-link btn btn-light btn-sm mb-2 fw-bold">Ver Proyecto</a>
                                                <p class="text-muted">Tecnologías <br> ${project.technologies.map(technology => `<span class="badge bg-primary mx-1 mb-2">${technology}</span>`).join('')}</p>
                                            </div>
                                        </div>
                                    </div> `
                                    ).join("")}
                                </div>
                                <button type="button" class="cerrar my-2 rounded-3 btn btn-outline-danger fw-bold">Cerrar</button>
                            </details>
                        </div>
                        </article>`;
            });
        
        experience.querySelector('.col-12').insertAdjacentHTML('beforeend', experienceTemplate);
        experience.querySelectorAll(".cerrar").forEach( buttonCerrar => {
             buttonCerrar.addEventListener("click", function() {
                 buttonCerrar.closest("details").removeAttribute("open");
                 buttonCerrar.closest("article").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
             });
         });
    });
}

const getEducation = () => {
    httpRequest("portfolio").then(data => {
        const education = document.querySelector('#education');
        let educationTemplate = ``;

        data.education.forEach(educationItem => {
            educationTemplate += `
            <article class="card d-block shadow-lg border-0 rounded-4 mb-3 border-start border-warning-subtle">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h3 class="h4 fw-bold"><span>${educationItem.degree}</span> <span>${educationItem.major}</span></h3>
                        <img class="img-fluid rounded-2 img-thumbnail border-0" src="${educationItem.logo}" alt="Logo ${educationItem.institution}" width="50">
                    </div>
                    <h4 class="h5 fw-bold mb-2">${educationItem.institution} <br> <span class="h6">${educationItem.from}</span>${educationItem.to ? `-<span class="h6">${educationItem.to}</span>` : ''}</h4>
                    ${educationItem.description ? `
                    <details>
                        <summary class="mb-3">Más información</summary>
                        <p>${educationItem.description}</p>
                         <button type="button" class="cerrar my-2 rounded-3 btn btn-outline-danger fw-bold">Cerrar</button>
                    </details>` : ''}
                </div>
            </article>
            `;
        });
        education.querySelector('.col-12').insertAdjacentHTML('beforeend', educationTemplate);        
        education.querySelectorAll(".cerrar").forEach( buttonCerrar => {
            buttonCerrar.addEventListener("click", function() {
                buttonCerrar.closest("details").removeAttribute("open");
                buttonCerrar.closest("article").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            });            
        });
    });
}