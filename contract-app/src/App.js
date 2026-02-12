import axios from "axios";
import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:8080/api/contracts", form);
    const id = res.data.id;

    const fileRes = await axios.get(
      `http://localhost:8080/api/contracts/export/${id}`,
      { responseType: "blob" },
    );

    const url = window.URL.createObjectURL(new Blob([fileRes.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "contract.docx");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <input
        placeholder="Tên"
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />
      <input
        placeholder="Địa chỉ"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        placeholder="SĐT"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button onClick={handleSubmit}>Tạo & Xuất Hợp Đồng</button>
    </div>
  );
}

export default App;
