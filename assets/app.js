
// Gestion du menu burger + offcanvas
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const offcanvas = document.querySelector(".offcanvas");
  const closeBtn = document.querySelector(".offcanvas .close");

  if (burger && offcanvas) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      offcanvas.classList.toggle("open");
    });
  }

  if (closeBtn && offcanvas && burger) {
    closeBtn.addEventListener("click", () => {
      offcanvas.classList.remove("open");
      burger.classList.remove("active");
    });
  }

  // Fermer le menu si on clique sur un lien
  offcanvas?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      offcanvas.classList.remove("open");
      burger?.classList.remove("active");
    });
  });
});

// Fonctions Supabase placeholder (à connecter à votre instance)
async function login() {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  if (!email || !password) {
    alert("Veuillez saisir email et mot de passe.");
    return;
  }
  alert("Connexion simulée (brancher Supabase ici).");
}

async function register() {
  alert("Création de compte simulée (brancher Supabase ici).");
}
