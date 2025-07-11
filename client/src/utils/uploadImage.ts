import supabase from "../config/supabase.config";

export const uploadImage = async (file: File, folder: string, user: { _id: string }) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${folder}/${user._id}/${fileName}`

    const { error } = await supabase.storage.from("devsphere").upload(filePath, file);

    if (error) throw error;

    const { data: publicUrlData } = await supabase.storage.from("devsphere").getPublicUrl(filePath)

    return publicUrlData.publicUrl
}