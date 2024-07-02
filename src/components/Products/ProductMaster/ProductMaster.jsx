import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";


const ProductMaster = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const productsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://main-server-2kc5.onrender.com/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.productCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleView = (product) => {
    Swal.fire({
      title: 'Product Details',
      html: `
        <p><strong>Name:</strong> ${product.productName}</p>
        <p><strong>Code:</strong> ${product.productCode}</p>
      `,
      icon: 'info'
    });
  };

  const handleEdit = (product) => {
    Swal.fire({
      title: 'Edit Product',
      html: `
        <input type="text" id="productName" class="swal2-input" placeholder="Product Name" value="${product.productName}">
        <input type="text" id="productCode" class="swal2-input" placeholder="Product Code" value="${product.productCode}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: () => {
        const productName = Swal.getPopup().querySelector('#productName').value;
        const productCode = Swal.getPopup().querySelector('#productCode').value;
        if (!productName || !productCode) {
          Swal.showValidationMessage(`Please enter product name and code`);
        }
        return { productName, productCode };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://main-server-2kc5.onrender.com/api/products/${product._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(result.value),
          });

          if (response.ok) {
            const updatedProducts = products.map(p =>
              p._id === product._id ? { ...p, ...result.value } : p
            );
            setProducts(updatedProducts);
            Swal.fire('Saved!', 'Product details have been updated.', 'success');
          } else {
            Swal.fire('Error!', 'Failed to update product details.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'An error occurred while updating product details.', 'error');
        }
      }
    });
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this product?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://main-server-2kc5.onrender.com/api/products/${productId}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            const updatedProducts = products.filter(p => p._id !== productId);
            setProducts(updatedProducts);
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
          } else {
            Swal.fire('Error!', 'Failed to delete product.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'An error occurred while deleting the product.', 'error');
        }
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Product Master</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by product name or code"
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <button
          onClick={() => navigate(-1)}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Back
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Serial No</th>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Product Code</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b text-center">{indexOfFirstProduct + index + 1}</td>
              <td className="py-2 px-4 border-b">{product.productName}</td>
              <td className="py-2 px-4 border-b">{product.productCode}</td>
              <td className="py-2 px-4 border-b text-center space-x-2">
                <button
                  onClick={() => handleView(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  <FaEye title='View'/>
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  <FaEdit title='Edit'/> 
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  <FaTrash title='Delete'/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastProduct >= filteredProducts.length}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductMaster;
