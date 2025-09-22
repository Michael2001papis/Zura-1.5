
  document.addEventListener("DOMContentLoaded", () => {
    function showMoreProjects() {
        const moreProjectsButton = document.getElementById('more-projects');
        const projectGallery = document.querySelector('.project-gallery');
      
        if (moreProjectsButton.dataset.loaded !== "true") {
          moreProjectsButton.textContent = "טוען פרויקטים נוספים...";
          moreProjectsButton.disabled = true;
          
          setTimeout(() => {
            const additional = [
              { before: "../Poto/before/Bedroom-4.jpg", after: "../Poto/after/Bedroom-4.jpg", title: "חדר שינה 4" },
              { before: "../Poto/before/Bedroom-5.jpg", after: "../Poto/after/Bedroom-5.jpg", title: "חדר שינה 5" },
              { before: "../Poto/before/Deep-wall.jpg",  after: "../Poto/after/Deep-wall.jpg",  title: "קיר עמוק" },
              { before: "../Poto/before/Bedroom-6.jpg", after: "../Poto/after/Bedroom-6.jpg", title: "חדר שינה 6" }
            ];

            additional.forEach((p, i) => {
              const project = document.createElement('div');
              project.className = "project";
              project.style.opacity = "0";
              project.style.transform = "translateY(30px)";
              project.innerHTML = `
                <img src="${p.before}" class="before" alt="לפני - ${p.title}">
                <img src="${p.after}" class="after" alt="אחרי - ${p.title}">
              `;
              setTimeout(() => {
                projectGallery.appendChild(project);
                requestAnimationFrame(() => {
                  project.style.transition = "all 0.6s ease";
                  project.style.opacity = "1";
                  project.style.transform = "translateY(0)";
                });
              }, i * 150);
            });

            moreProjectsButton.textContent = "הצג פחות פרויקטים";
            moreProjectsButton.dataset.loaded = "true";
            moreProjectsButton.disabled = false;
          }, 600);
        } else {
          const projects = projectGallery.querySelectorAll('.project');
          const extra = Array.from(projects).slice(-4);
          extra.forEach((el, i) => {
            setTimeout(() => {
              el.style.transition = "all 0.4s ease";
              el.style.opacity = "0";
              el.style.transform = "translateY(-20px)";
              setTimeout(() => el.remove(), 400);
            }, i * 120);
          });
          moreProjectsButton.textContent = "הצג עוד פרויקטים";
          moreProjectsButton.dataset.loaded = "false";
        }
      }
      
      document.getElementById("more-projects").addEventListener("click", showMoreProjects);
      
      document.getElementById("rights").addEventListener("click", () => {
        window.location.href = "../Developerrights/index.html";
      });
  });
  