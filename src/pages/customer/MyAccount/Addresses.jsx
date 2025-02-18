import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import {
    DeleteAddressesApi,
    GetAddressesApi
} from "../../../services/customerService/Address";
import AddressForm from "./AddressForm";
import Sidebar from "./Sidebar";

function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeButton, setActiveButton] = useState("addresses");
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        // Handle responsive layout for Sidebar visibility on mobile
        const handleResize = () => {
            const mobileView = window.innerWidth <= 640;
            setIsMobile(mobileView);
            if (!mobileView) setShowSidebar(true); // Show Sidebar on larger screens
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const response = await GetAddressesApi();
            setAddresses(response);
        } catch (error) {
            console.error("Error fetching addresses: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleAddAddress = () => {
        setIsEdit(false);
        setSelectedAddress(null);
        setShowForm(true);
    };

    const handleEditAddress = (address) => {
        setIsEdit(true);
        setSelectedAddress(address);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this address?"
        );

        if (!isConfirmed) return;

        try {
            await DeleteAddressesApi(id);
            toast.success("Address deleted successfully!");
            fetchAddresses();
        } catch (err) {
            toast.error(err.message || "Failed to delete address");
        }
    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                Loading data...
            </div>
        );
    }

    return (
        <div className="flex h-screen flex-col">
            <Helmet>
                <title>Danh sách địa chỉ của bạn</title>
            </Helmet>
            <Navbar />
            <div className={`flex flex-grow ${isMobile ? "flex-col" : ""}`}>
                {showSidebar && !isMobile && (
                    <Sidebar
                        activeButton={activeButton}
                        setActiveButton={setActiveButton}
                        onBack={() => setShowSidebar(false)}
                        isMobile={isMobile}
                    />
                )}
                <div className="relative flex-grow p-8">
                    {isMobile && (
                        <Sidebar
                            activeButton={activeButton}
                            setActiveButton={(id) => {
                                setActiveButton(id);
                                if (isMobile) setShowSidebar(false);
                            }}
                            onBack={() => setShowSidebar(false)}
                            isMobile={isMobile}
                        />
                    )}
                    <div className="mb-4 mt-10 flex items-center justify-between sm:mt-0">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Address List
                        </h2>
                        <button
                            onClick={handleAddAddress}
                            className="flex items-center rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                            <i className="fas fa-plus text-lg"></i>
                        </button>
                    </div>

                    {isMobile ? (
                        <div className="grid gap-4">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="rounded-lg border p-4 shadow hover:bg-gray-100"
                                    onClick={() => handleEditAddress(address)}
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {address.street}, {address.ward}
                                    </h3>
                                    <p className="text-gray-600">
                                        {address.district}, {address.city}
                                    </p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Default:{" "}
                                            {address.isDefault ? "Yes" : "No"}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(address.id);
                                            }}
                                            className="text-red-500"
                                        >
                                            <i className="fas fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="relative max-h-[400px] overflow-y-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead className="sticky top-0 bg-gray-300">
                                    <tr>
                                        <th className="border px-4 py-2 text-left">
                                            ID
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Street
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Ward
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            District
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            City
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Default
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addresses.map((address) => (
                                        <tr
                                            key={address.id}
                                            className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-teal-100"
                                            onClick={() =>
                                                handleEditAddress(address)
                                            }
                                        >
                                            <td className="border px-4 py-2">
                                                {address.id}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {address.street}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {address.ward}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {address.district}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {address.city}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={address.isDefault}
                                                    readOnly
                                                />
                                            </td>
                                            <td
                                                className="border px-4 py-2 text-center"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(address.id);
                                                }}
                                            >
                                                <i className="fas fa-trash-can text-red-500"></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {showForm && (
                <AddressForm
                    isEdit={isEdit}
                    addressData={selectedAddress}
                    onClose={() => setShowForm(false)}
                    onSave={() => fetchAddresses()}
                />
            )}
            <Footer />
        </div>
    );
}

export default Addresses;
