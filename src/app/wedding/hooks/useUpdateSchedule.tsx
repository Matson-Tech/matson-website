import { useState } from "react";
import type { ScheduleItem } from "@/types/wedding";
import messageOnUpdate, { useCase } from "@/utils/messageOnUpdate";
import useWedding from "@/hooks/useWedding";

const useUpdateSchedule = () => {
    const { weddingData, updateWeddingData } = useWedding();
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [newItem, setNewItem] = useState<Omit<ScheduleItem, "id">>({
        time: "",
        event: "",
        description: "",
    });

    const updateScheduleItem = async (
        id: string,
        field: keyof ScheduleItem,
        value: string,
    ) => {
        const schedule = weddingData.schedule || [];
        const updatedSchedule = schedule.map((item) =>
            item.id === id ? { ...item, [field]: value } : item,
        );
        const isUpdated = await updateWeddingData({
            schedule: updatedSchedule,
        });
        messageOnUpdate(isUpdated, field);
    };

    // New function for immediate saves (on Enter key)
    const saveScheduleItem = async (
        id: string,
        field: keyof ScheduleItem,
        value: string,
    ) => {
        await updateScheduleItem(id, field, value);
    };

    const addScheduleItem = () => {
        const newScheduleItem: ScheduleItem = {
            ...newItem,
            id: `${Date.now()}-${crypto.randomUUID()}`,
        };
        updateWeddingData({
            schedule: [...(weddingData.schedule || []), newScheduleItem],
        });
        setNewItem({ time: "", event: "", description: "" });
        setIsAddingItem(false);
    };

    const removeScheduleItem = async (id: string) => {
        const schedule = weddingData.schedule || [];
        const updatedSchedule = schedule.filter(
            (item) => item.id !== id,
        );
        const isDeleted: boolean = await updateWeddingData({
            schedule: updatedSchedule,
        });
        messageOnUpdate(isDeleted, "schedule", useCase.Delete);
    };

    return {
        addScheduleItem,
        updateScheduleItem,
        saveScheduleItem,
        removeScheduleItem,
        isAddingItem,
        setIsAddingItem,
        newItem,
        setNewItem,
    };
};

export default useUpdateSchedule;
