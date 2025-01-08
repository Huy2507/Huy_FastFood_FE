// utils/progress.js
export const getOrderProgress = (status) => {
    switch (status) {
        case "Pending":
            return 33; // 33% (Pending)
        case "Done":
            return 66; // 66% (Is Delivering)
        case "Is Delivering":
            return 100; // 100% (Done)
        default:
            return 0; // Default for unknown statuses
    }
};
