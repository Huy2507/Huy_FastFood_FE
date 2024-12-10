import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    AddAddressesApi,
    UpdateAddressesApi,
} from "../../../services/customerService/Address";

function AddressForm({ isEdit, addressData, onClose, onSave }) {
    const [formData, setFormData] = useState({
        street: "",
        ward: "",
        district: "",
        city: "",
        isDefault: false,
    });

    useEffect(() => {
        if (isEdit && addressData) {
            setFormData(addressData);
        }
    }, [isEdit, addressData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        if (isEdit) {
            e.preventDefault();
            const isConfirmed = window.confirm(
                "Bạn có chắc chắn muốn cập nhật thông tin địa chỉ?",
            );

            if (!isConfirmed) return;

            try {
                await UpdateAddressesApi(addressData.id, formData);
                toast.success("Cập nhật địa chỉ thành công!");
                onClose();
                onSave();
            } catch (err) {
                toast.error(err.message || "Cập nhật thất bại");
            }
        }
        if (!isEdit) {
            e.preventDefault();
            const isConfirmed = window.confirm(
                "Bạn có chắc chắn muốn thêm địa chỉ này?",
            );

            if (!isConfirmed) return;

            try {
                await AddAddressesApi(formData);
                toast.success("Cập nhật địa chỉ thành công!");
                onClose();
                onSave();
            } catch (err) {
                toast.error(err.message || "Cập nhật thất bại");
            }
        }
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-2 w-full max-w-lg rounded bg-white p-8 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">
                    {isEdit ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2 block text-gray-700">
                            Đường
                        </label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            className="w-full rounded border px-4 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-gray-700">
                            Phường
                        </label>
                        <input
                            type="text"
                            name="ward"
                            value={formData.ward}
                            onChange={handleInputChange}
                            className="w-full rounded border px-4 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-gray-700">Quận</label>
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            className="w-full rounded border px-4 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-gray-700">
                            Thành phố
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full rounded border px-4 py-2"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isDefault"
                                checked={formData.isDefault}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            Đặt làm mặc định
                        </label>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
AddressForm.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    addressData: PropTypes.shape({
        id: PropTypes.number,
        street: PropTypes.string,
        ward: PropTypes.string,
        district: PropTypes.string,
        city: PropTypes.string,
        isDefault: PropTypes.bool,
    }),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
export default AddressForm;
