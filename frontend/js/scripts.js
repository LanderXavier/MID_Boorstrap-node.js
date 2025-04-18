$('#loginForm').submit(function (e) {
  e.preventDefault();
  const email = $('#email').val();
  const password = $('#password').val();

  $.ajax({
    url: 'http://localhost:3000/api/auth/login',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ email, password }),
    success: function (response) {
      console.log('Login successful:', response);
      localStorage.setItem('token', response.token); // Save the token in local storage
      window.location.href = 'index.html'; // Redirect to the dashboard
    },
    error: function (error) {
      console.error('Login failed:', error);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  });
});
  
$('#loadorderss').click(function () {
  const token = localStorage.getItem('token'); // Obtén el token almacenado
  if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
  }

  $.ajax({
      url: 'http://localhost:3000/api/orderss',
      type: 'GET',
      headers: {
          Authorization: `Bearer ${token}` // Incluye el token en el encabezado
      },
      success: function (data) {
          console.log('Orders fetched:', data); // Agrega este log
          $('#ordersList').empty();
          data.orderss.forEach(function (orders) {
              $('#ordersList').append(`<li class="list-group-item">${orders.title}</li>`);
          });
      },
      error: function (error) {
          console.error('Error al cargar las órdenes:', error); // Agrega este log
          alert('No se pudieron cargar las órdenes. Verifica tu autenticación.');
      }
  });
});

$('#addOrderForm').submit(function (e) {
  e.preventDefault();

  const token = localStorage.getItem('token'); // Retrieve the token from local storage
  if (!token) {
    alert('No estás autenticado. Por favor, inicia sesión.');
    window.location.href = 'login.html'; // Redirect to login if no token
    return;
  }

  const customer = $('#customer').val();
  if (!customer) {
    alert('Customer field is required.');
    return;
  }

  const orderData = {
    customer,
    seller: $('#seller').val(),
    productName: $('#productName').val(),
    date: $('#date').val(),
    quantity: parseInt($('#quantity').val()),
    price: parseFloat($('#price').val()),
    status: $('#status').val(),
  };

  console.log('Order data being sent:', orderData);

  $.ajax({
    url: 'http://localhost:3000/api/orderss',
    type: 'POST',
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
    contentType: 'application/json',
    data: JSON.stringify(orderData),
    success: function (response) {
      alert('Order added successfully!');
      location.reload();
    },
    error: function (error) {
      console.error('Error adding order:', error);
      alert('Failed to add order. Please try again.');
    },
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const currentPage = window.location.pathname.split('/').pop();

  if (!token && currentPage === 'index.html') {
    alert('No estás autenticado. Por favor, inicia sesión.');
    window.location.href = 'login.html';
    return;
  }

  if (currentPage === 'index.html') {
    fetch('http://localhost:3000/api/orderss', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar las órdenes');
        }
        return response.json();
      })
      .then(data => {
        const tableBody = document.getElementById('orderTableBody');
        tableBody.innerHTML = '';
        data.orderss.forEach(order => {
          const row = `
            <tr>
              <td>${order.orderNumber}</td>
              <td>${order.customer}</td>
              <td>${order.seller}</td>
              <td>${order.productName}</td>
              <td>${new Date(order.date).toLocaleDateString()}</td>
              <td>${order.quantity}</td>
              <td>${order.price.toFixed(2)}</td>
              <td>${order.status}</td>
              <td>
                <button class="btn btn-danger btn-sm delete-order" data-id="${order.orderNumber}">Delete</button>
              </td>
            </tr>
          `;
          tableBody.innerHTML += row;
        });

        // Agregar evento de clic para los botones de eliminar
        document.querySelectorAll('.delete-order').forEach(button => {
          button.addEventListener('click', function () {
            const orderId = this.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this order?')) {
              fetch(`http://localhost:3000/api/orderss/${orderId}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Error deleting order');
                  }
                  alert('Order deleted successfully!');
                  location.reload(); // Recargar la página
                })
                .catch(error => {
                  console.error('Error deleting order:', error);
                  alert('Failed to delete order. Please try again.');
                });
            }
          });
        });
      })
      .catch(error => {
        console.error('Error al cargar las órdenes:', error);
        alert('No se pudieron cargar las órdenes. Verifica tu autenticación.');
      });
  }
});