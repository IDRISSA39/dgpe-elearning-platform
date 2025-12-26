/* =====================================================
   DGPE e-Learning – App global (GitHub Pages friendly)
   - Pas d'imports ESModule (évite "Cannot use import...")
   - Supabase session guard (client-side)
===================================================== */
(function() {
  // --- Supabase init (requires https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2 loaded BEFORE this file)
  const SUPABASE_URL = "https://yshmhrsartwjctbpevup.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzaG1ocnNhcnR3amN0YnBldnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDI0ODIsImV4cCI6MjA4MjA3ODQ4Mn0.JICMtNf_1VrRylm47qru0urIWQvO49JXMUbu10FHb1g";
  if (!window.supabase) {
    console.error("Supabase JS non chargé. Ajoute le <script src=...supabase-js@2></script> avant app.js");
    return;
  }
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.sb = sb; // debug

  // --- Burger / mobile menu (si présent)
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      nav.classList.toggle("open");
    });
  }

  // --- Logout handler
  window.logout = async function logout() {
    try {
      await sb.auth.signOut();
    } catch(e) {
      console.warn(e);
    }
    // Redirect to login
    window.location.href = "login.html";
  };

  // --- Auth guard for protected pages
  async function requireAuth() {
    const isLoginPage = document.body.classList.contains("login-page") || /login\.html$/i.test(location.pathname);
    if (isLoginPage) return;

    const { data, error } = await sb.auth.getSession();
    if (error) console.warn(error);

    if (!data?.session) {
      // Not logged in -> redirect
      window.location.replace("login.html");
      return;
    }
  }

  // Run guard ASAP
  requireAuth();

  // --- Optional: hide/show "Déconnexion" button action
  document.querySelectorAll('[data-logout]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.logout();
    });
  });

  // --- Helper: get query param
  window.getQueryParam = function(name) {
    return new URLSearchParams(window.location.search).get(name);
  };

})();
