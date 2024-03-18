import { app } from "../../firebase";
import { useEffect, useState } from "react";
import { Item } from "../types/Products.type";
import axios from "axios";
import { Button, FileInput, Modal, Table } from "flowbite-react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// IMAGE Upload

const Products = () => {
  const [products, setProducts] = useState<Item[]>([]);
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState<Item[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Item | null>(null);
  // aasdomawkejfnaiwjefnwaf

  // IMAGE Upload
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleUploadImage = async (e: any) => {
    // if (!e.target.files || e.target.files.length === 0) {
    //   // Handle case where no files are selected
    //   console.error("No files selected");
    //   return;
    // }
    const image = e.target.files[0];
    setImage(e.target.files[0]);
    try {
      // if (!image) {
      //   setImageUploadError("Please select an image");
      //   return;
      // }
      // setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   setImageUploadProgess(progress.toFixed(0));
        },
        () => {
          //   setImageUploadError("Image upload failed");
          //   setImageUploadProgess(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // setImageUploadProgess(null);
            // setImageUploadError(null);
            setProduct({ ...product, image: downloadURL });
            // setVal({ ...val, image: downloadURL });
          });
        }
      );
    } catch (error) {
      //   setImageUploadError("Image upload failed");
      //   setImageUploadProgess(null);
      console.log(error);
    }
  };
  // IMAGE Upload
  console.log(product.image);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get<Item[]>(
        "https://65bb677f52189914b5bc02b7.mockapi.io/products"
      );
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://65bb677f52189914b5bc02b7.mockapi.io/products/${id}`
        );
        setFilteredProducts(filteredProducts.filter((std) => std.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(event.target.value);
    filterProducts(event.target.value, selectedGroup);
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(event.target.value);
    filterProducts(searchProduct, event.target.value);
  };

  const filterProducts = (search: string, category: string) => {
    const filtered = products.filter(
      (st) =>
        st.name.toLowerCase().includes(search.toLowerCase()) ||
        st.category.toLowerCase().includes(search.toLowerCase())
      // st.email.toLowerCase().includes(search.toLowerCase()) ||
      // st.description.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "all") {
      setFilteredProducts(filtered.filter((st) => st.category === category));
    } else {
      setFilteredProducts(filtered);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://65bb677f52189914b5bc02b7.mockapi.io/products",
        formData
      );
      setOpenModal(false); // Close the modal after successful submission
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "string",
      }); // Reset form data
      fetchData(); // Refresh the product list
    } catch (error) {
      console.log(error);
    }
  };
  {
    /* Edit MODAL */
  }

  const handleEdit = (product: Item) => {
    if (product.id) {
      // Check if id is defined
      setSelectedProduct(product);
      setEditModalOpen(true);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      await axios.put(
        `https://65bb677f52189914b5bc02b7.mockapi.io/products/${selectedProduct.id}`,
        selectedProduct
      );
      setEditModalOpen(false); // Close the modal after successful submission
      setSelectedProduct(null); // Reset selected product
      fetchData(); // Refresh the product list
    } catch (error) {
      console.log(error);
    }
  };
  {
    /* Edit MODAL */
  }

  return (
    <div className="ml-48 mt-[60px]">
      {/* Edit MODAL */}
      <Modal
        className="z-30 w-[500px] p-4 rounded "
        dismissible
        show={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      >
        <div className="bg-slate-100">
          <Modal.Header className="flex items-center pl-5 pt-5">
            Edit Product
          </Modal.Header>
          <form onSubmit={handleEditSubmit}>
            <Modal.Body className="px-3 py-1">
              <div className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={selectedProduct?.name || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="Product title"
                  required
                />
                <input
                  type="text"
                  name="price"
                  value={selectedProduct?.price || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="Price"
                  required
                />
                <input
                  type="text"
                  name="description"
                  value={selectedProduct?.description || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="Description"
                  required
                />
                <select
                  name="category"
                  value={selectedProduct?.category || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value,
                    })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option value="Furniture">Furniture</option>
                  <option value="Homeware">Homeware</option>
                  <option value="Sofas">Sofas</option>
                  <option value="Light fittings">Light fittings</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-between px-2 py-4">
              <Button
                color="gray"
                outline
                className="border-2 w-20 rounded-md"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="w-20 bg-[#27b127]" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>

      {/* Add MODAL */}
      <Modal
        className=" z-30  w-[500px] h-[500px] p-4 rounded"
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div
          className={`fixed inset-0 bg-black opacity-50 ${openModal} ? "block" : "hidden"}`}
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="bg-slate-100">
          <Modal.Header className="flex items-center pl-5 pt-5 ">
            Add new Product
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body className="px-3 py-1 ">
              <div className="space-y-6">
                <div className="flex gap-4 pt-2">
                  <div className="relative z-0 w-full mb-5 category ">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Product title"
                      required
                    />
                  </div>
                  <div className="relative flex items-center gap-2 z-0 w-full mb-5 category">
                    <FileInput
                      // name="image"
                      // value={formData.image}
                      onChange={handleUploadImage}
                      // className="block rounded py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Image"
                      required
                    />
                    <button onClick={handleUploadImage}>Upload</button>
                  </div>
                  <div>
                    {product.image && (
                      <img
                        src={product.image}
                        alt="product image"
                        className="w-10 h-10"
                      />
                    )}
                  </div>
                  <div>
                    {product.image && (
                      <img
                        src={product.image}
                        alt="product image"
                        className="w-10 h-10"
                      />
                    )}
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 category">
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="Description"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <div className="relative z-0 w-full mb-5 category">
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Price"
                      required
                    />
                  </div>
                  <div className="relative z-0 w-full mb-5 category">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option value="Furniture">Furniture</option>
                      <option value="Homeware">Homeware</option>
                      <option value="Sofas">Sofas</option>
                      <option value="Light fittings">Light fittings</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-between px-2 py-4 ">
              <Button
                color="gray"
                outline
                className="border-2 w-20 rounded-md"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
              <Button className="w-20 bg-[#27b127]" type="submit">
                Add
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>

      <div>
        <div className="flex m-8 justify-between dark:bg-[#252e45]">
          <p className="text-3xl dark:text-slate-200">Products</p>
          <input
            className="w-96 p-2 outline-none rounded-lg"
            type="search"
            placeholder="Search product..."
            value={searchProduct}
            onChange={handleSearchChange}
          />
          <select
            className="rounded-lg outline-none p-2"
            name="select"
            id="select"
            value={selectedGroup}
            onChange={handleGroupChange}
          >
            <option value="all">All</option>
            <option value="Furniture">Furniture</option>
            <option value="Homeware">Homeware</option>
            <option value="Sofas">Sofas</option>
            <option value="Light fittings">Light fittings</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        {/* TABLE Main */}
        <Table
          className="ml-12 mt-2 dark:text-slate-100 bg-slate-50 dark:bg-[#252e45]"
          hoverable
          style={{ width: "1240px" }}
        >
          <Table.Head>
            <Table.HeadCell>N/o</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell className="text-center">Activity</Table.HeadCell>
          </Table.Head>
          {filteredProducts.map((product, index) => (
            <Table.Body className=" mt-2" key={product.id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 pt-2">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <p className="flex justify-center"> {index + 1}</p>{" "}
                </Table.Cell>
                <Table.Cell className="">
                  <img
                    src={product.image}
                    alt="Product"
                    className="w-12 h-12"
                  />
                </Table.Cell>
                <Table.Cell className="">
                  <p className="flex justify-center">{product.name}</p>
                </Table.Cell>
                <Table.Cell className="">
                  <p className="flex justify-center">{product.price}</p>
                </Table.Cell>
                <Table.Cell className="">
                  <p className="flex justify-center">{product.description}</p>
                </Table.Cell>
                <Table.Cell>
                  <p className="flex justify-center">{product.category}</p>
                </Table.Cell>
                <Table.Cell className="flex gap-3 justify-center items-center">
                  <div className="flex gap-2 pt-2">
                    <button
                      className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5  text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>

                    <Button
                      className="text-red-700 hover:text-white border px-3 border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm   text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {/* TABLE Main */}
      </div>
      <button
        onClick={() => setOpenModal(true)}
        className="rounded-full w-16 h-16 bg-blue-600 text-6xl text-white fixed flex justify-center items-center  pb-5 ml-80 right-12 bottom-9 "
      >
        <p className="mt-2">+</p>
      </button>
    </div>
  );
};

export default Products;
