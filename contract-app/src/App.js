import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });

  const [contracts, setContracts] = useState([]);

  // load danh sách contracts
  const loadContracts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/contracts");
      setContracts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadContracts();
  }, []);

  // tạo contract mới
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/contracts", form);

      alert("Tạo hợp đồng thành công");

      loadContracts(); // reload list sau khi tạo
    } catch (err) {
      console.error(err);
    }
  };

  // export contract
  const handleExport = async (id) => {
    try {
      const fileRes = await axios.get(
        `http://localhost:8080/api/contracts/export/${id}`,
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(new Blob([fileRes.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `contract-${id}.docx`);

      document.body.appendChild(link);
      link.click();

      link.remove();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tạo hợp đồng</h2>

      <input
        placeholder="Tên"
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />

      <br />

      <input
        placeholder="Địa chỉ"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <br />

      <input
        placeholder="SĐT"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <br />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <br />

      <button onClick={handleSubmit}>Tạo hợp đồng</button>

      <hr />

      <h2>Danh sách hợp đồng</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contracts.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.fullName}</td>
              <td>{c.address}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>

              <td>
                <button onClick={() => handleExport(c.id)}>
                  Xuất hợp đồng
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
