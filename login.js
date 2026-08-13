console.log("LOGIN SCRIPT STARTED");

const SUPABASE_URL = "https://luyampkgrtjojwtgsoqq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_0BkAs0yDQP3qBT71yCjeKA_LsHpIw6T";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");

loginForm.addEventListener("submit", async (event) => {


    console.log("LOGIN FORM SUBMITTED")

    event.preventDefault();

    loginMessage.textContent = "جاري تسجيل الدخول...";

    const email = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {

        console.error("Login error:", error);

        loginMessage.textContent =
            "البريد الإلكتروني أو كلمة المرور غير صحيحة.";

        return;
    }

    console.log("Login successful:", data);

    window.location.href = "admin-dashboard.html";
});