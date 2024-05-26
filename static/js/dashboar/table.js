let currentPage = 1;
const pageSize = 10;


async function fetchCounty(page = 1, uf) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/counties/?uf=${uf}&page=${page}&page_size=${pageSize}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
    }
    return response.json();
}


function renderTable(data) {
    const tbody = document.getElementById("counties-table-body");
    tbody.innerHTML = "";  
    data.results.forEach(counties => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${counties.name}</td>`;
        tbody.appendChild(tr);
    });
}


function renderPagination(paginationData) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; 

    if (paginationData.previous) {
        const prevLi = document.createElement("li");
        prevLi.classList.add("page-item");
        prevLi.innerHTML = `<a class="page-link" href="#" data-page="${paginationData.current_page - 1}">Anterior</a>`;
        pagination.appendChild(prevLi);
    }

   
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, paginationData.current_page - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(paginationData.total_pages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage < maxVisibleButtons - 1) {
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageLi = document.createElement("li");
        pageLi.classList.add("page-item");
        if (i === paginationData.current_page) {
            pageLi.classList.add("active");
        }
        pageLi.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
        pagination.appendChild(pageLi);
    }

    if (startPage > 1) {
        const firstLi = document.createElement("li");
        firstLi.classList.add("page-item");
        firstLi.innerHTML = `<a class="page-link" href="#" data-page="1">1</a>`;
        pagination.insertBefore(firstLi, pagination.firstChild);

        if (startPage > 2) {
            const ellipsisLi = document.createElement("li");
            ellipsisLi.classList.add("page-item");
            ellipsisLi.innerHTML = `<span class="page-link">...</span>`;
            pagination.insertBefore(ellipsisLi, pagination.children[1]);
        }
    }

    if (endPage < paginationData.total_pages) {
        if (endPage < paginationData.total_pages - 1) {
            const ellipsisLi = document.createElement("li");
            ellipsisLi.classList.add("page-item");
            ellipsisLi.innerHTML = `<span class="page-link">...</span>`;
            pagination.appendChild(ellipsisLi);
        }

        const lastLi = document.createElement("li");
        lastLi.classList.add("page-item");
        lastLi.innerHTML = `<a class="page-link" href="#" data-page="${paginationData.total_pages}">${paginationData.total_pages}</a>`;
        pagination.appendChild(lastLi);
    }

    
    if (paginationData.next) {
        const nextLi = document.createElement("li");
        nextLi.classList.add("page-item");
        nextLi.innerHTML = `<a class="page-link" href="#" data-page="${paginationData.current_page + 1}">Próxima</a>`;
        pagination.appendChild(nextLi);
    }

    
    document.querySelectorAll("#pagination a").forEach(pageLink => {
        pageLink.addEventListener("click", (event) => {
            event.preventDefault();
            const page = parseInt(event.target.getAttribute("data-page"));
            loadData(page, uf);
        });
    });
}


async function loadData(page, uf) {
    try {
        const data = await fetchCounty(page, uf);
        renderTable(data);
        renderPagination({
            current_page: page,
            total_pages: Math.ceil(data.count / pageSize),
            previous: data.previous,
            next: data.next
        });
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar dados.");
    }
}


document.getElementById('btn-close-modal').addEventListener('click', function() {
    $('#m-tabel-counties').modal('toggle')
})