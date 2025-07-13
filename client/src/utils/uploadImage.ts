import supabase from "../config/supabase.config";

export const uploadImage = async (file: File | null, folder: string, user: { _id: string }) => {
    if (!file) return "";

    // const fileExt = file.name.split(".").pop();
    const safeFileName = file.name
        .replace(/\s+/g, "-")
        .replace(/[^\w.-]/g, "")
        .toLowerCase();

    const fileName = `${Date.now()}-${safeFileName}`;
    const filePath = `${folder}/${user._id}/${fileName}`;

    const { error } = await supabase.storage.from("devsphere").upload(filePath, file);
    if (error) throw error;

    const { data: publicUrlData } = await supabase.storage.from("devsphere").getPublicUrl(filePath);
    return publicUrlData.publicUrl;
};
