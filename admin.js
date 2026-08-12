console.log("ADMIN SCRIPT STARTED");

const SUPABASE_URL = "https://luyampkgrtjojwtgsoqq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_0BkAs0yDQP3qBT71yCjeKA_LsHpIw6T";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


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

            <button
                type="button"
                class="delete-product"
                data-id="${product.id}"
            >
                🗑️ حذف
            </button>

        </article>
    `).join("");
}


// إضافة منتج
productForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const product = {

        id: Date.now(),

        name: document.querySelector("#newName").value.trim(),

        category: document.querySelector("#newCategory").value,

        price: Number(
            document.querySelector("#newPrice").value
        ),

        rating: 4.5,

        tag: "مضاف حديثا",

        image:
            document.querySelector("#newImage").value.trim() ||
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80",

        description:
            document.querySelector("#newDescription").value.trim() ||
            "منتج جديد يمكن تنفيذه بالمقاس والتشطيب المطلوب."

    };


    const { data, error } = await supabaseClient
        .from("Products")
        .insert([product])
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
loadProducts();