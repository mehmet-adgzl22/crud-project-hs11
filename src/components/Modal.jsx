import { toast } from "react-toastify";
import api from "../utils/api";

const Modal = ({ close, todo, setTodos }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTitle = e.target[0].value;
    const newStatus = e.target[1].value;

    if (!newTitle.trim()) return toast.warn("Lütfen Başlığı Belirleyin.");

    api
      .patch(`/todos/${todo.id}`, {
        title: newTitle,
        status: newStatus,
      })
      .then((res) => {
        setTodos((prev) =>
          prev.map((item) => (item.id == res.data.id ? res.data : item))
        );

        toast.success("Başarıyla Güncellendi.");
      })
      .catch(() => toast.error("İşlem Başarısız!!"));

    close();
  };

  return (
    <div className="modal d-block bg-black bg-opacity-75">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Todo'yu Düzenle</h5>
            <button onClick={close} className="btn-close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="form-label">Yeni Başlığı Giriniz</label>
                <input
                  defaultValue={todo.title}
                  className="form-control shadow"
                  type="text"
                />
              </div>

              <div className="my-4">
                <label className="form-label">Yeni Durumu Seçiniz</label>
                <select
                  defaultValue={todo.status}
                  className="form-select  shadow"
                >
                  <option value="daily">Günlük</option>
                  <option value="job">İş</option>
                  <option value="important">Önemli</option>
                </select>
              </div>

              <div className="modal-footer mt-5">
                <button
                  onClick={close}
                  type="button"
                  className="btn btn-secondary"
                >
                  İptal
                </button>
                <button type="submit" className="btn btn-primary">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;