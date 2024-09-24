import { toast } from "react-toastify";
import api from "../utils/api";

const Form = ({ setTodos }) => {
 
  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target[0].value;
    const status = e.target[1].value;

    if (!text.trim()) {
      return toast.warn("Lütfen Bir İçerik Belirleyin");
    }

    const newTodo = {
      title: text,
      status,
      date: new Date().toLocaleString("en-us"),
    };

    api
      .post("/todos", newTodo)
      .then((res) => {
        setTodos((todos) => [res.data, ...todos]);

        toast.success("Todo Oluşturuldu.");
      })
      .catch((err) => toast.error("Bir Sorun Oluştu !!"));

    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input
        placeholder="ör:react projesi yap"
        className="form-control shadow"
      />

      <select className="form-select w-50 shadow">
        <option value="daily">Günlük</option>
        <option value="job">İş</option>
        <option value="important">Önemli</option>
      </select>

      <button className="btn btn-primary shadow">Gönder</button>
    </form>
  );
};

export default Form;