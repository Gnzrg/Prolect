import axios from "axios";
import React, { useState } from "react";

export default function AddProduct({ handleChange, setProData }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [thumbImg, setThumbImg] = useState("");
  const [isTrending, setIsTrending] = useState();
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [img, setImg] = useState([]);
  const Create = () => {
    fetch("http://localhost:8090/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: productName,
        price: price,
        thumbImg: thumbImg,
        discount: discount,
        isTrending: isTrending,
        categoryName: category,
        description: description,
        date: date,
        img: img,

        /* other product data */
      }),
    })
      .then((res) => res.json())
      .then((data) => setProData(data.result));
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="w-50 border rounded py-3 px-3">
        <div className="d-flex justify-content-between">
          <h2>Add Product</h2>
          <button
            onClick={handleChange}
            className="border border-white bg-white fs-3"
          >
            {" "}
            <i class="bi bi-x-square"></i>
          </button>
        </div>
        <input
          className="form-control mt-3"
          placeholder="Product Name..."
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <select
          className="form-control mt-3"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="0">Category</option>
          <option value="Smartphone">Smartphone</option>
          <option value="Home">Home</option>
          <option value="Clothes">Clothes</option>
        </select>

        <input
          className="form-control mt-3"
          type="number"
          placeholder="Price..."
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <input
          className="form-control mt-3"
          type="text"
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="form-control mt-3"
          type="date"
          placeholder="Date"
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className="form-control mt-3"
          type="number"
          placeholder="Discount percent"
          onChange={(e) => setDiscount(e.target.value)}
        />
        <input
          type="file"
          className="form-control mt-3"
          onChange={(e) => {
            console.log(e.target.value);

            const url = "https://api.cloudinary.com/v1_1/lwvom2iu/upload";
            const formData = new FormData();

            let file = e.target.files[0];
            formData.append("file", file);
            formData.append("api_key", "384825931744178");
            formData.append("folder", "E-Commerce");
            formData.append("upload_preset", "lwvom2iu");

            axios.post(url, formData).then((res) => {
              setThumbImg(res.data.secure_url);
            });
          }}
        />
        <input
          className="form-control mt-3"
          type="file"
          multiple
          onChange={(e) => {
            console.log(e.target.value);
            const url = "https://api.cloudinary.com/v1_1/lwvom2iu/upload";
            const formData = new FormData();
            let file = e.target.files;
            console.log(file);

            const images = [];
            for (let i = 0; i < file.length; i++) {
              images.push(file[i]);
            }
            console.log(images);
            images.map((file) => {
              formData.append("file", file);
              formData.append("api_key", "384825931744178");
              formData.append("folder", "E-Commerce");
              formData.append("upload_preset", "lwvom2iu");

              axios.post(url, formData).then((res) => {
                console.log(res.data.secure_url);
                setImg(res.data.secure_url);
              });
            });
          }}
        />
        <select
          className="form-control mt-3"
          onChange={(e) => setIsTrending(e.target.value)}
        >
          <option>isTrending</option>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <button className="btn btn-primary mt-3" onClick={Create}>
          Add
        </button>
      </div>
    </div>
  );
}
