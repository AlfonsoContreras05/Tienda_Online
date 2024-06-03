document.addEventListener('DOMContentLoaded', () => {
    const buscarInput = document.getElementById('search');
    const filtrarCategoria = document.getElementById('filterCategory');
    const ordenarPrecio = document.getElementById('sortOrder');
    const productosDiv = document.getElementById('products');
    const btnPaginaAnterior = document.getElementById('prevPage');
    const btnPaginaSiguiente = document.getElementById('nextPage');
    const paginacionDiv = document.querySelector('.pagination');

    let datosProductos = [];
    let todasCategorias = new Set();
    let paginaActual = 1;
    const limite = 100;
    let totalPaginas = 1;

    // Escuchadores de eventos para los filtros y búsqueda
    buscarInput.addEventListener('input', () => {
        paginaActual = 1;
        filtrarYMostrarProductos();
    });

    filtrarCategoria.addEventListener('change', () => {
        paginaActual = 1;
        filtrarYMostrarProductos();
    });

    ordenarPrecio.addEventListener('change', () => {
        paginaActual = 1;
        filtrarYMostrarProductos();
    });

    // Escuchadores de eventos para la paginación
    btnPaginaAnterior.addEventListener('click', (event) => {
        event.preventDefault();
        if (paginaActual > 1) {
            paginaActual--;
            obtenerProductos();
        }
    });

    btnPaginaSiguiente.addEventListener('click', (event) => {
        event.preventDefault();
        if (paginaActual < totalPaginas) {
            paginaActual++;
            obtenerProductos();
        }
    });

    // Función para obtener productos desde el servidor
    function obtenerProductos() {
        fetch(`https://ptecnicatonline.netlify.app/products?page=${paginaActual}&limit=${limite}`)
            .then(response => response.json())
            .then(data => {
                datosProductos = data.products;
                totalPaginas = data.totalPages;
                actualizarTodasCategorias(datosProductos);
                filtrarYMostrarProductos();
                actualizarPaginacion();
            })
            .catch(error => {
                console.error('Error obteniendo productos:', error);
            });
    }

    // Función para actualizar la lista de categorías
    function actualizarTodasCategorias(productos) {
        todasCategorias.clear();
        productos.forEach(producto => {
            todasCategorias.add(producto.category);
        });
        poblarFiltroCategoria();
    }

    // Función para poblar el filtro de categorías
    function poblarFiltroCategoria() {
        const categoriaSeleccionada = filtrarCategoria.value;
        filtrarCategoria.innerHTML = '<option value="all">Todas las Categorías</option>';
        todasCategorias.forEach(categoria => {
            const opcion = document.createElement('option');
            opcion.value = categoria;
            opcion.textContent = categoria;
            if (categoria === categoriaSeleccionada) {
                opcion.selected = true;
            }
            filtrarCategoria.appendChild(opcion);
        });
    }

    // Función para filtrar y mostrar productos
    function filtrarYMostrarProductos() {
        const consulta = buscarInput.value.toLowerCase();
        const categoriaSeleccionada = filtrarCategoria.value;
        const ordenSeleccionado = ordenarPrecio.value;

        let productosFiltrados = datosProductos.filter(producto => {
            return (
                (categoriaSeleccionada === 'all' || producto.category === categoriaSeleccionada) &&
                producto.name.toLowerCase().includes(consulta)
            );
        });

        if (ordenSeleccionado === 'asc') {
            productosFiltrados.sort((a, b) => a.price - b.price);
        } else {
            productosFiltrados.sort((a, b) => b.price - a.price);
        }

        mostrarProductos(productosFiltrados);
        alternarBotonesPaginacion();
    }

    // Función para mostrar productos en el DOM
    function mostrarProductos(productos) {
        productosDiv.innerHTML = '';
        const categorias = {};

        productos.forEach(producto => {
            if (!categorias[producto.category]) {
                categorias[producto.category] = [];
            }
            categorias[producto.category].push(producto);
        });

        for (const categoria in categorias) {
            const categoriaDiv = document.createElement('div');
            categoriaDiv.className = 'product-category';
            const tituloCategoria = document.createElement('h2');
            tituloCategoria.textContent = categoria;
            categoriaDiv.appendChild(tituloCategoria);

            const contenedorTarjetasProducto = document.createElement('div');
            contenedorTarjetasProducto.className = 'product-card-container';

            categorias[categoria].forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.className = 'product-card';
                productoDiv.addEventListener('click', () => mostrarModalProducto(producto));

                const imagenProducto = document.createElement('img');
                imagenProducto.src = producto.url_image;
                imagenProducto.alt = producto.name;

                const infoProducto = document.createElement('p');
                infoProducto.textContent = `${producto.name} - $${producto.price}`;

                productoDiv.appendChild(imagenProducto);
                productoDiv.appendChild(infoProducto);
                contenedorTarjetasProducto.appendChild(productoDiv);
            });

            categoriaDiv.appendChild(contenedorTarjetasProducto);
            productosDiv.appendChild(categoriaDiv);
        }
    }

    // Función para actualizar la paginación
    function actualizarPaginacion() {
        paginacionDiv.innerHTML = '';

        const paginaAnterior = document.createElement('li');
        paginaAnterior.className = 'page-item' + (paginaActual === 1 ? ' disabled' : '');
        const enlacePaginaAnterior = document.createElement('a');
        enlacePaginaAnterior.className = 'page-link';
        enlacePaginaAnterior.href = '#';
        enlacePaginaAnterior.id = 'prevPage';
        enlacePaginaAnterior.textContent = 'Anterior';
        paginaAnterior.appendChild(enlacePaginaAnterior);
        paginacionDiv.appendChild(paginaAnterior);

        for (let i = 1; i <= totalPaginas; i++) {
            const itemPagina = document.createElement('li');
            itemPagina.className = 'page-item' + (i === paginaActual ? ' active' : '');
            const enlacePagina = document.createElement('a');
            enlacePagina.className = 'page-link';
            enlacePagina.href = '#';
            enlacePagina.textContent = i;
            enlacePagina.addEventListener('click', (event) => {
                event.preventDefault();
                paginaActual = i;
                obtenerProductos();
            });
            itemPagina.appendChild(enlacePagina);
            paginacionDiv.appendChild(itemPagina);
        }

        const paginaSiguiente = document.createElement('li');
        paginaSiguiente.className = 'page-item' + (paginaActual === totalPaginas ? ' disabled' : '');
        const enlacePaginaSiguiente = document.createElement('a');
        enlacePaginaSiguiente.className = 'page-link';
        enlacePaginaSiguiente.href = '#';
        enlacePaginaSiguiente.id = 'nextPage';
        enlacePaginaSiguiente.textContent = 'Siguiente';
        paginaSiguiente.appendChild(enlacePaginaSiguiente);
        paginacionDiv.appendChild(paginaSiguiente);
    }

    // Función para mostrar u ocultar botones de paginación
    function alternarBotonesPaginacion() {
        btnPaginaAnterior.parentElement.classList.toggle('disabled', paginaActual === 1);
        btnPaginaSiguiente.parentElement.classList.toggle('disabled', paginaActual === totalPaginas);
    }

    // Función para mostrar el modal con los detalles del producto
    function mostrarModalProducto(producto) {
        document.getElementById('modalProductImage').src = producto.url_image;
        document.getElementById('modalProductName').textContent = `Nombre: ${producto.name}`;
        document.getElementById('modalProductPrice').textContent = `Precio: $${producto.price}`;
        document.getElementById('modalProductDescription').textContent = `Descripción: ${producto.description}`;
        document.getElementById('modalProductStock').textContent = `Stock: ${producto.stock}`;
        document.getElementById('modalProductSku').textContent = `SKU: ${producto.sku}`;
        jQuery('#productModal').modal('show');
    }

    // Iniciar la carga de productos
    obtenerProductos();
});
