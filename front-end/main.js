let tHead = `<tr>
                <td>ID</td>
                <td>Name</td>
                <td>Price</td>
                <td>Category</td>
                <td>Update</td>
                <td>Delete</td>
            </tr>`
let action = 0;

function render() {
    let content = tHead
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        // Kiểu method
        type: "GET",
        // Url gửi đến server
        url: "http://localhost:8080/products",
        // dữ liệu gửi đi, điều kiện gửi phải là 1 dạng dữ liêu JSON
        data: {},
        // Nơi dữ liệu sẽ được về, data là dữ liệu nhận được từ sever
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                content += `
                <tr>
                <td>${data[i].id}</td>
                <td>${data[i].name}</td>
                <td>${data[i].price}</td>
                <td>${data[i].category.name}</td>
<!--                tạo 1 nút để find dữ liệu vào trong form -->
                <td><button class="btn btn-warning" onclick="
                    find(${data[i].id});
                    document.getElementById('div1').hidden = false;
                    document.getElementById('div2').hidden = true
                    ">Upadate</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${data[i].id})">Delete</button></td>
            </tr>`
                document.getElementById("list").innerHTML = content

            }
        }

    })
}

// lấy danh sách category để find vào select
function renderCategory() {
    let content = ''
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "GET",
        url: "http://localhost:8080/products/categorys",
        data: {},
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                content += `
                <option value="${data[i].id}">${data[i].name}</option>`
                document.getElementById("category").innerHTML = content
            }
        }
    })
}

//tao nut add
function add() {

    let product = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        category: {
            id: document.getElementById('category').value
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8080/products",
        data: JSON.stringify(product),
        success: function (data) {
            alert('Add thanh cong')
            document.getElementById('div1').hidden = true
            document.getElementById('div2').hidden = false
            render()
        }
    })
}

// lấy dữ liệu của đối tượng muốn sửa và find vào trong form để sửa
let ids = 0

function find(id) {
    ids = id
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "GEt",
        url: "http://localhost:8080/products/" + id,
        data: {},
        success: function (data) {
            document.getElementById('name').value = data.name
            document.getElementById('price').value = data.price
            document.getElementById('category').value = data.category.id
        }
    })
}

// Sửa đối tượng
function update() {
    let product = {
        id: ids,
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        category: {
            id: document.getElementById('category').value
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "PUT",
        url: "http://localhost:8080/products/",
        data: JSON.stringify(product),
        success: function (data) {
            alert('Update thanh cong')
            document.getElementById('div1').hidden = true
            document.getElementById('div2').hidden = false
            render()
        }
    })
}

function deleteProduct(id) {
    if(confirm("xac nhan xoa???")){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: "DELETE",
            url: "http://localhost:8080/products/" + id,
            data: {},
            success: function (data) {
                alert("xoa thanh cong")
                render()
            }
        })
    }
}

renderCategory()
render()