console.log("ADMIN SCRIPT STARTED");

const SUPABASE_URL = "https://luyampkgrtjojwtgsoqq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_0BkAs0yDQP3qBT71yCjeKA_LsHpIw6T";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

async function checkAdminAccess() {

    const { data, error } = await supabaseClient.auth.getUser();

    if (error || !data.user) {
        window.location.href = "admin-login.html";
        return false;
    }

    const userEmail = data.user.email;

    // ضع إيميل حساب المدير هنا
    const ADMIN_EMAIL = "turkyabd4@icloud.com";

    if (userEmail !== ADMIN_EMAIL) {
        alert("ليس لديك صلاحية دخول لوحة الإدارة.");

        await supabaseClient.auth.signOut();

        window.location.href = "admin-login.html";

        return false;
    }

    console.log("ADMIN AUTHENTICATED:", userEmail);

    return true;
}


// الأقسام
const categories = [
    "غرف النوم",
    "الديكورات",
    "غرف الخشب",
    "ابواب الخشب",
    "دواليب الخشب",
    "شاشات الخشب",
    "الاعمال المعمارية",
    "اسرة النوم"
];


// عناصر الصفحة
const productForm = document.querySelector("#productForm");
const adminProducts = document.querySelector("#adminProducts");
const newCategory = document.querySelector("#newCategory");

const logoutButton = document.querySelector("#logoutButton");
logoutButton.addEventListener("click", async () => {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        console.error("Logout error:", error);
        alert("تعذر تسجيل الخروج");
        return;
    }

    window.location.href = "admin-login.html";
});


// تعبئة الأقسام
newCategory.innerHTML = categories
    .map(category => `
        <option value="${category}">
            ${category}
        </option>
    `)
    .join("");


// تحميل المنتجات من Supabase
async function loadProducts() {

    const { data, error } = await supabaseClient
        .from("Products")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Supabase select error:", error);
        adminProducts.innerHTML = `
            <p>حدث خطأ أثناء تحميل المنتجات.</p>
        `;
        return;
    }

    console.log("Products loaded:", data);

    renderAdminProducts(data || []);
}


// عرض المنتجات
function renderAdminProducts(products) {

    adminProducts.innerHTML = products.map(product => `
        <article class="admin-product-item">

            <div>
                <strong>${product.name}</strong>

                <small>
                    ${product.category} — ${product.price} ر.س
                </small>
            </div>

           <div class="admin-product-actions">

    <button
        type="button"
        class="edit-product"
        data-id="${product.id}"
    >
        ✏️ تعديل
    </button>

    <button
        type="button"
        class="delete-product"
        data-id="${product.id}"
    >
        🗑️ حذف
    </button>

</div>

        </article>
    `).join("");
}

let editingProductId = null;

// إضافة منتج
productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("FORM SUBMITTED")

    const product = {
        name: document.querySelector("#newName").value.trim(),
        category: document.querySelector("#newCategory").value,
        price: Number(document.querySelector("#newPrice").value),
        image: document.querySelector("#newImage").value.trim(),
        description: document.querySelector("#newDescription").value.trim()
    };

    // إذا كنا نعدل منتجًا موجودًا
    if (editingProductId !== null) {

        console.log("EDITING PRODUCT:", editingProductId);
console.log("PRODUCT DATA:", product);

        const { data: updatedProduct, error } = await supabaseClient
    .from("Products")
    .update(product)
    .eq("id", editingProductId)
    .select();

console.log("UPDATED PRODUCT FROM SUPABASE:", updatedProduct);

if (error) {
    console.error("Supabase update error:", error);
    alert("تعذر حفظ التعديل");
    return;
}

if (!updatedProduct || updatedProduct.length === 0) {
    console.error("UPDATE AFFECTED ZERO ROWS");
    alert("لم يتم تعديل المنتج. تحقق من صلاحيات UPDATE في Supabase.");
    return;
}
        if (error) {
            console.error("Supabase update error:", error);
            alert("تعذر حفظ التعديل");
            return;
        }

        console.log("Product updated:", editingProductId);

        editingProductId = null;

        productForm.reset();

        productForm.querySelector("button[type='submit']").textContent =
            "إضافة المنتج";

        loadProducts();

        return;
    }

    // إضافة منتج جديد
    const newProduct = {
        id: Date.now(),
        ...product,
        rating: 4.5,
        tag: "مضاف حديثا"
    };

    const { data, error } = await supabaseClient
        .from("Products")
        .insert([newProduct])
        .select()
        .single();

    if (error) {
        console.error("Supabase insert error:", error);
        alert("حدث خطأ أثناء إضافة المنتج");
        return;
    }

    console.log("Product added:", data);

    productForm.reset();

    loadProducts();
});

// حذف منتج
adminProducts.addEventListener("click", async (event) => {

    const editButton =
    event.target.closest(".edit-product");

if (editButton) {

    const productId = Number(editButton.dataset.id);

    const { data, error } = await supabaseClient
        .from("Products")
        .select("*")
        .eq("id", productId)
        .single();

    if (error) {
        console.error("Supabase select error:", error);
        alert("تعذر تحميل بيانات المنتج");
        return;
    }

    editingProductId = productId;

    document.querySelector("#newName").value = data.name;
    document.querySelector("#newCategory").value = data.category;
    document.querySelector("#newPrice").value = data.price;
    document.querySelector("#newImage").value = data.image || "";
    document.querySelector("#newDescription").value = data.description || "";

    productForm.querySelector("button[type='submit']").textContent =
        "حفظ التعديل";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    return;
}

    const deleteButton =
        event.target.closest(".delete-product");

    if (!deleteButton) return;


    const productId =
        Number(deleteButton.dataset.id);


    const { error } = await supabaseClient
        .from("Products")
        .delete()
        .eq("id", productId);


    if (error) {

        console.error("Supabase delete error:", error);

        alert("تعذر حذف المنتج");

        return;
    }


    console.log("Product deleted:", productId);

    loadProducts();

});


// تشغيل الصفحة
async function initializeAdmin() {

    const isAuthenticated = await checkAdminAccess();

    if (!isAuthenticated) {
        return;
    }

    loadProducts();
}

initializeAdmin();