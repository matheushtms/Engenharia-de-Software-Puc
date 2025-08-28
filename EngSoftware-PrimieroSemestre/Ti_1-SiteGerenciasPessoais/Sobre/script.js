// Espera o carregamento completo do conteúdo da página
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona as seções da página
    const aboutSection = document.querySelector('.about');
    const featuresSection = document.querySelector('.features');
    const teamSection = document.querySelector('.team');
    
    // Função para alterar o fundo ao passar o mouse sobre as seções
    const highlightSection = (section) => {
        section.style.backgroundColor = '#e0f7fa';  // Azul claro
    };

    const resetSection = (section) => {
        section.style.backgroundColor = 'white';  // Cor original
    };

    // Adiciona eventos de mouseover e mouseout para as seções
    aboutSection.addEventListener('mouseover', () => highlightSection(aboutSection));
    aboutSection.addEventListener('mouseout', () => resetSection(aboutSection));

    featuresSection.addEventListener('mouseover', () => highlightSection(featuresSection));
    featuresSection.addEventListener('mouseout', () => resetSection(featuresSection));

    teamSection.addEventListener('mouseover', () => highlightSection(teamSection));
    teamSection.addEventListener('mouseout', () => resetSection(teamSection));

    // Adiciona uma animação de rolagem suave ao clicar nos links de navegação
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 50,  // Ajusta a posição do scroll
                behavior: 'smooth'
            });
        });
    });

    // Função para verificar se a seção está visível na tela
    const checkVisibility = () => {
        const sections = [aboutSection, featuresSection, teamSection];
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect();
            if (sectionPosition.top >= 0 && sectionPosition.bottom <= window.innerHeight) {
                // Adiciona a classe de animação fade-in quando a seção entrar em vista
                section.classList.add('fade-in');
            }
        });
    };

    // A função de verificação será chamada sempre que o usuário rolar a página
    window.addEventListener('scroll', checkVisibility);

    // Chama a verificação também logo que a página carregar
    checkVisibility();
});
